export const runtime = "nodejs";

export async function GET() {
  const ical = (await import("ical")).default;

  const url = process.env.URL_SECRET_ICS;
  const AIRBNB_ICAL_URL = url;

  if (!AIRBNB_ICAL_URL) {
    console.error("❌ URL_SECRET_ICS não configurada no .env.local");
    return new Response(
      JSON.stringify({
        error: "URL_SECRET_ICS não configurada no ambiente",
      }),
      { status: 500 }
    );
  }

  try {
    console.log("🔍 Buscando calendário Airbnb de:", AIRBNB_ICAL_URL);

    // No Next.js 16, usar fetch com configuração explícita
    let response;
    try {
      // Criar AbortController para timeout manual
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos

      response = await fetch(AIRBNB_ICAL_URL, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (CalendarBot)",
          "Accept": "text/calendar",
        },
        signal: controller.signal,
        next: { revalidate: 0 },
      });

      clearTimeout(timeoutId);
    } catch (fetchError) {
      console.error("❌ Erro no fetch:", fetchError);
      console.error("Tipo do erro:", fetchError.constructor?.name || typeof fetchError);
      console.error("Mensagem:", fetchError.message);
      console.error("Code:", fetchError.code);

      // Se o fetch nativo falhar, tentar com node-fetch como fallback
      if (
        fetchError.message?.includes("fetch failed") ||
        fetchError.message?.includes("aborted") ||
        fetchError.code === "ECONNREFUSED" ||
        fetchError.code === "ENOTFOUND"
      ) {
        try {
          const nodeFetch = (await import("node-fetch")).default;
          console.log("🔄 Tentando com node-fetch como fallback...");
          response = await nodeFetch(AIRBNB_ICAL_URL, {
            headers: {
              "User-Agent": "Mozilla/5.0 (CalendarBot)",
              "Accept": "text/calendar",
            },
            timeout: 30000,
          });
        } catch (nodeFetchError) {
          console.error("❌ Erro também com node-fetch:", nodeFetchError);
          throw new Error(
            `Falha ao buscar calendário: ${nodeFetchError.message || String(nodeFetchError)}`
          );
        }
      } else {
        throw fetchError;
      }
    }

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Erro na resposta Airbnb:", response.status);
      console.error("📄 Primeiros 500 caracteres da resposta:", text.slice(0, 500));
      return new Response(
        JSON.stringify({
          error: `Erro ${response.status} ao buscar o calendário Airbnb`,
          details: text.slice(0, 500),
        }),
        { status: 500 }
      );
    }

    const icsText = await response.text();
    console.log("📄 Tamanho do arquivo ICS recebido:", icsText.length, "caracteres");

    // Verificar se a resposta é realmente um arquivo ICS
    if (!icsText.includes("BEGIN:VCALENDAR")) {
      console.error("⚠️ Resposta não parece ser um arquivo ICS válido");
      console.error("📄 Primeiros 500 caracteres:", icsText.slice(0, 500));
      return new Response(
        JSON.stringify({
          error: "A resposta não é um arquivo ICS válido",
          details: icsText.slice(0, 500),
        }),
        { status: 500 }
      );
    }

    const events = ical.parseICS(icsText);
    console.log("📅 Total de eventos encontrados no ICS:", Object.keys(events).length);

    const reservas = Object.values(events)
      .filter((e) => e.type === "VEVENT")
      .map((e) => {
        // Converter datas para ISO strings para garantir serialização correta
        let start, end;

        try {
          if (e.start instanceof Date) {
            start = e.start.toISOString();
          } else if (e.start) {
            start = new Date(e.start).toISOString();
          } else {
            console.warn("⚠️ Evento sem data de início:", e);
            return null;
          }

          if (e.end instanceof Date) {
            end = e.end.toISOString();
          } else if (e.end) {
            end = new Date(e.end).toISOString();
          } else {
            console.warn("⚠️ Evento sem data de fim:", e);
            return null;
          }
        } catch (dateError) {
          console.error("❌ Erro ao converter data:", dateError, e);
          return null;
        }

        return {
          start,
          end,
          summary: e.summary || "",
        };
      })
      .filter((r) => r !== null && r.start && r.end);

    console.log(`✅ Processadas ${reservas.length} reservas válidas`);
    if (reservas.length > 0) {
      console.log("📅 Primeira reserva:", reservas[0]);
      console.log("📅 Última reserva:", reservas[reservas.length - 1]);
    } else {
      console.warn("⚠️ Nenhuma reserva encontrada no calendário");
    }

    return new Response(JSON.stringify(reservas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("💥 Erro completo ao processar calendário:", error);
    console.error("Stack trace:", error.stack);
    return new Response(
      JSON.stringify({
        error: String(error),
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

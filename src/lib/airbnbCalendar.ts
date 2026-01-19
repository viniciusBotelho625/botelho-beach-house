export interface Booking {
  start: Date;
  end: Date;
  summary?: string;
}

export async function getAirbnbCalendar(): Promise<Booking[]> {
  const res = await fetch("/api/airbnb-calendar");

  if (!res.ok) {
    throw new Error(`Erro ${res.status} ao buscar calendário`);
  }

  const data = await res.json();

  // Verificar se há erro na resposta
  if (data.error) {
    throw new Error(data.error);
  }

  // Converter strings de data para objetos Date
  const processedBookings: Booking[] = data
    .filter((booking: any) => booking.start && booking.end)
    .map((booking: any) => {
      const start = new Date(booking.start);
      const end = new Date(booking.end);

      // Validar se as datas são válidas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return null;
      }

      return {
        start,
        end,
        summary: booking.summary || "",
      };
    })
    .filter((booking: Booking | null) => booking !== null) as Booking[];

  return processedBookings;
}

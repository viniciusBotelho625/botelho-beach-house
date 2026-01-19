"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Send } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";

export default function Reserve() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    hospedes: "",
    mensagem: "",
  });

  // Buscar reservas do Airbnb usando TanStack Query com cache de 30 minutos
  const {
    data: bookings = [],
    isLoading: loadingBookings,
    error: bookingsError,
  } = useQuery<Booking[]>({
    queryKey: ["airbnb-calendar"],
    queryFn: getAirbnbCalendar,
    staleTime: 30 * 60 * 1000, // 30 minutos - dados considerados "frescos" por 30 minutos
    gcTime: 60 * 60 * 1000, // 1 hora - mantém dados em cache por 1 hora
    refetchOnWindowFocus: false, // Não refaz requisição ao focar na janela
    refetchOnMount: false, // Não refaz requisição ao montar o componente se os dados estão frescos
    refetchOnReconnect: false, // Não refaz requisição ao reconectar
    retry: 2, // Tenta novamente 2 vezes em caso de erro
  });

  // Log de erros (opcional, para debug)
  if (bookingsError) {
    console.error("Erro ao buscar reservas:", bookingsError);
  }

  // Função para verificar se uma data está ocupada
  const isDateBooked = (date: Date): boolean => {
    if (bookings.length === 0) return false;

    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    return bookings.some((booking) => {
      const bookingStart = new Date(booking.start);
      bookingStart.setHours(0, 0, 0, 0);

      const bookingEnd = new Date(booking.end);
      bookingEnd.setHours(0, 0, 0, 0);

      // Verifica se a data está dentro do intervalo de reserva
      // Inclui o dia de check-in e exclui o dia de check-out (check-out libera o dia)
      return dateToCheck >= bookingStart && dateToCheck < bookingEnd;
    });
  };

  // Função para desabilitar datas ocupadas e datas passadas
  const disabledDates = (date: Date): boolean => {
    // Desabilita datas anteriores à data atual
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    // Retorna true se a data for anterior a hoje ou se estiver ocupada
    return dateToCheck < today || isDateBooked(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log("Formulário enviado:", { date, ...formData });
    // Reset form
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      hospedes: "",
      mensagem: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Card: Calendar */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Selecione a Data
            </h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                locale={ptBR}
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const dateToCheck = new Date(selectedDate);
                    dateToCheck.setHours(0, 0, 0, 0);

                    // Valida se a data selecionada não é anterior a hoje
                    if (dateToCheck < today) {
                      return; // Não permite selecionar data passada
                    }
                    if (isDateBooked(selectedDate)) {
                      return; // Não permite selecionar data ocupada
                    }

                    setDate(selectedDate);
                  }
                }}
                disabled={disabledDates}
                modifiers={{
                  booked: (date) => isDateBooked(date),
                }}
                modifiersClassNames={{
                  booked:
                    "opacity-40 line-through cursor-not-allowed text-red-300/50",
                }}
                classNames={{
                  day_disabled:
                    "opacity-40 line-through cursor-not-allowed text-red-300",
                }}
                className="rounded-lg"
                captionLayout="dropdown-months"
              />
            </div>
          </div>

          {/* Right Card: Contact Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Solicite um Orçamento
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-900 font-medium text-sm">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="h-11 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0] text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium text-sm">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0] text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-gray-900 font-medium text-sm">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="h-11 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0] text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospedes" className="text-gray-900 font-medium text-sm">
                  Número de Hóspedes
                </Label>
                <Input
                  id="hospedes"
                  name="hospedes"
                  type="number"
                  placeholder="Ex: 4"
                  value={formData.hospedes}
                  onChange={handleChange}
                  required
                  min="1"
                  className="h-11 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0] text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-gray-900 font-medium text-sm">
                  Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Conte-nos mais sobre sua viagem, datas desejadas, etc."
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className="bg-[#f5f5f5] border border-gray-200 rounded-lg focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0] resize-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#3fbbd0] to-[#2ea8b8] hover:from-[#2ea8b8] hover:to-[#3fbbd0] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Solicitação
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { CalendarIcon, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";
import { cn } from "@/lib/utils";

export function Reserve() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guests, setGuests] = useState(5);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

  // Buscar reservas do Airbnb usando TanStack Query com cache de 30 minutos
  const {
    data: bookings = [],
    isLoading: loadingBookings,
    error: bookingsError,
  } = useQuery<Booking[]>({
    queryKey: ["airbnb-calendar"],
    queryFn: getAirbnbCalendar,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });

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

      return dateToCheck >= bookingStart && dateToCheck < bookingEnd;
    });
  };

  // Função para desabilitar datas ocupadas e datas passadas
  const disabledDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    return dateToCheck < today || isDateBooked(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado:", { checkInDate, checkOutDate, guests, ...formData });
    setFormData({ nome: "", email: "" });
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Large Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-h-[600px]">
            {/* Left Panel: Image with Overlay */}
            <div className="relative bg-gradient-to-br from-[#124338] to-[#0a2e26]">
              <div className="absolute inset-0 bg-[url('/hero-beach-house.jpg')] bg-cover bg-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40" />
              <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                  Sua jornada começa aqui.
                </h2>
                <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
                  Reserve diretamente conosco para garantir a melhor tarifa e um concierge dedicado à sua estadia.
                </p>
              </div>
            </div>

            {/* Right Panel: Reservation Form */}
            <div className="bg-[#105c74] p-6 sm:p-8 lg:p-10 flex flex-col">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <p className="text-[#FF782D] text-xs sm:text-sm uppercase tracking-wider font-semibold mb-2">
                  AGENDAMENTO
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                  Consulte Disponibilidade
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 sm:space-y-5">
                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Check-in */}
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="text-[#3fbbd0] text-xs sm:text-sm font-medium">
                      CHEGADA
                    </Label>
                    <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="checkin"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-11 sm:h-12 bg-[#0f3a2f] border-[#1a5a4a] text-white/80 hover:bg-[#0f3a2f] hover:text-white",
                            !checkInDate && "text-white/50"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#3fbbd0]" />
                          {checkInDate ? (
                            format(checkInDate, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span className="text-white/50">dd/mm/aaaa</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={(date) => {
                            setCheckInDate(date);
                            setCheckInOpen(false);
                          }}
                          disabled={disabledDates}
                          locale={ptBR}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out */}
                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="text-[#3fbbd0] text-xs sm:text-sm font-medium">
                      SAÍDA
                    </Label>
                    <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="checkout"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-11 sm:h-12 bg-[#0f3a2f] border-[#1a5a4a] text-white/80 hover:bg-[#0f3a2f] hover:text-white",
                            !checkOutDate && "text-white/50"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#3fbbd0]" />
                          {checkOutDate ? (
                            format(checkOutDate, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span className="text-white/50">dd/mm/aaaa</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={(date) => {
                            setCheckOutDate(date);
                            setCheckOutOpen(false);
                          }}
                          disabled={disabledDates}
                          locale={ptBR}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests Field */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-[#3fbbd0] text-xs sm:text-sm font-medium">
                    HÓSPEDES
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3fbbd0]" />
                    <Input
                      id="guests"
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                      min="1"
                      className="pl-10 h-11 sm:h-12 bg-[#0f3a2f] border-[#1a5a4a] text-white placeholder:text-white/50 focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0]"
                      placeholder="5 Pessoas"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Input
                    name="nome"
                    type="text"
                    placeholder="Seu Nome Completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="h-11 sm:h-12 bg-[#0f3a2f] border-[#1a5a4a] text-white placeholder:text-white/50 focus:border-[#3fbbd0] focus:ring-1 focus:ring-[#3fbbd0]"
                  />
                </div>


                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-[#FF782D] hover:bg-[#ff6b1a] text-white font-semibold rounded-lg mt-auto flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

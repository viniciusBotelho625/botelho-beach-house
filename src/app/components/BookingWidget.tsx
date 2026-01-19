"use client";

import {
  Users,
  Home,
  ChevronRight,
  ChevronUpIcon,
  ChevronDownIcon,
  Plus,
  Minus,
  Clock10
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { ButtonRounded } from "./ButtonRounded";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";

const BookingWidget = () => {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState({
    adultos: 0,
    criancas: 0,
    bebes: 0,
  });
  const [animals, setAnimals] = useState(0);
  const [guestsPopoverOpen, setGuestsPopoverOpen] = useState(false);
  const [horario, setHorario] = useState<string>("");
  const totalGuests = guests.adultos + guests.criancas;

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
    console.error("❌ Erro ao buscar reservas:", bookingsError);
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

  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="bg-[hsl(var(--glass-bg))]/80 backdrop-blur-md rounded-lg px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10 border border-white/10">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-15 items-end">
          <div className="flex gap-4 ">
            <div className="flex flex-col gap-2 sm:gap-3 border-b border-white/20 w-full sm:w-auto">
              <Label
                htmlFor="date-picker"
                className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light"
              >
                Data
              </Label>
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="checkout-date-picker"
                    className="w-full sm:w-60 justify-between font-normal bg-transparent border-none shadow-none text-white/70 !p-0 cursor-pointer text-sm sm:text-base"
                  >
                    {checkInDate && checkOutDate
                      ? `${checkInDate.toLocaleDateString("pt-BR")} - ${checkOutDate.toLocaleDateString("pt-BR")}`
                      : checkInDate
                        ? `${checkInDate.toLocaleDateString("pt-BR")} - Selecione a data de saída`
                        : "Selecione as datas"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto bg-[#03303E]/70 backdrop-blur-xl border-white/30 !rounded-lg shadow-2xl mb-19 text-white justify-center items-center"
                  align="end"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <Calendar
                    key={`${checkInDate?.getTime()}-${checkOutDate?.getTime()}`}
                    mode="range"
                    locale={ptBR}
                    selected={
                      checkInDate || checkOutDate
                        ? {
                            from: checkInDate,
                            to: checkOutDate,
                          }
                        : undefined
                    }
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
                    className="w-70 cursor-pointer"
                    captionLayout="label"
                    onSelect={(range: DateRange | undefined) => {
                      if (range) {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        // Valida se as datas selecionadas não são anteriores a hoje
                        if (range.from) {
                          const fromDate = new Date(range.from);
                          fromDate.setHours(0, 0, 0, 0);
                          if (fromDate < today) {
                            return; // Não permite selecionar data passada
                          }
                          if (isDateBooked(range.from)) {
                            return; // Não permite selecionar data ocupada
                          }
                        }

                        if (range.to) {
                          const toDate = new Date(range.to);
                          toDate.setHours(0, 0, 0, 0);
                          if (toDate < today) {
                            return; // Não permite selecionar data passada
                          }
                          if (isDateBooked(range.to)) {
                            return; // Não permite selecionar data ocupada
                          }
                        }

                        // Atualiza as datas conforme o range selecionado
                        setCheckInDate(range.from);
                        setCheckOutDate(range.to ?? undefined);
                        // Fecha o popover apenas quando ambas as datas estiverem selecionadas
                        if (range.from && range.to) {
                          // Pequeno delay para garantir que o estado foi atualizado
                          setTimeout(() => {
                            setCheckOutOpen(false);
                          }, 100);
                        }
                      } else {
                        // Se range for undefined, limpa ambas as datas
                        setCheckInDate(undefined);
                        setCheckOutDate(undefined);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2 border-b border-white/20 w-full sm:w-auto">
            <Label className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light">
              Horário de Entrada
            </Label>
            <Select value={horario} onValueChange={setHorario}>
              <SelectTrigger className="w-full sm:w-60 justify-between font-normal bg-transparent border-none shadow-none text-white/70 cursor-pointer !p-0 text-sm sm:text-base h-auto [&_svg]:text-white/70 gap-2">
                <div className="flex items-center gap-2">
                  <Clock10 className="h-4 w-4" />
                  <SelectValue placeholder="Selecionar horário" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#03303E]/70 backdrop-blur-xl border-white/30 !rounded-lg shadow-2xl">
                <SelectItem value="manha" className="text-white hover:bg-white/10 cursor-pointer">
                  Manhã
                </SelectItem>
                <SelectItem value="tarde" className="text-white hover:bg-white/10 cursor-pointer">
                  Tarde
                </SelectItem>
                <SelectItem value="noite" className="text-white hover:bg-white/10 cursor-pointer">
                  Noite
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 border-b border-white/20 w-full sm:w-auto">
            <Label className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light">
              Hóspedes
            </Label>

            <Popover
              open={guestsPopoverOpen}
              onOpenChange={setGuestsPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-60 justify-between font-normal bg-transparent border-none shadow-none text-white/70 cursor-pointer !p-0 text-sm sm:text-base"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {guests.adultos + guests.criancas === 0
                        ? "Selecionar hóspedes"
                        : `${guests.adultos + guests.criancas} hóspede${guests.adultos + guests.criancas > 1 ? "s" : ""}`}
                    </span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#03303E]/70 backdrop-blur-xl border-white/30 !rounded-lg shadow-2xl mb-19">
                <div className="space-y-5">
                  <div className="space-y-5">
                    {/* Adultos */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Adultos
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <ButtonRounded
                          icon={<Minus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adultos: Math.max(0, prev.adultos - 1),
                            }))
                          }
                          disabled={guests.adultos === 0}
                        />

                        <span className="w-10 text-center text-white font-semibold text-lg">
                          {guests.adultos}
                        </span>
                        <ButtonRounded
                          icon={<Plus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adultos: prev.adultos + 1,
                            }))
                          }
                          disabled={totalGuests > 9}
                        />
                      </div>
                    </div>

                    {/* Crianças */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Crianças
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <ButtonRounded
                          icon={<Minus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              criancas: Math.max(0, prev.criancas - 1),
                            }))
                          }
                          disabled={guests.criancas === 0}
                        />

                        <span className="w-10 text-center text-white font-semibold text-lg">
                          {guests.criancas}
                        </span>
                        <ButtonRounded
                          icon={<Plus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              criancas: prev.criancas + 1,
                            }))
                          }
                          disabled={totalGuests > 9}
                        />
                      </div>
                    </div>

                    {/* Bebês */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Bebês
                        </Label>
                        <span className="text-white/80 text-xs">
                          0 a 2 anos
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ButtonRounded
                          icon={<Minus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              bebes: Math.max(0, prev.bebes - 1),
                            }))
                          }
                          disabled={guests.bebes === 0}
                        />
                        <span className="w-10 text-center text-white font-semibold text-lg">
                          {guests.bebes}
                        </span>

                        <ButtonRounded
                          icon={<Plus className="h-4 w-4" />}
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              bebes: prev.bebes + 1,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Animais de estimação */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Animais de estimação
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <ButtonRounded
                          icon={<Minus className="h-4 w-4" />}
                          onClick={() =>
                            setAnimals((prev) => Math.max(0, prev - 1))
                          }
                          disabled={animals === 0}
                        />
                        <span className="w-10 text-center text-white font-semibold text-lg">
                          {animals}
                        </span>
                        <ButtonRounded
                          icon={<Plus className="h-4 w-4" />}
                          onClick={() => setAnimals((prev) => prev + 1)}
                          disabled={animals > 2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 h-[1px] w-full" />
                  <Button className="w-full  text-black border-0 bg-white/90 h-11 hover:text-black hover:bg-white/50 font-light tracking-wider uppercase text-sm cursor-pointer">
                    Confirmar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full sm:w-auto md:w-60 text-black border-0 bg-white/90 hover:bg-white/50 h-10 sm:h-11 hover:text-black font-light tracking-wider uppercase text-xs sm:text-sm cursor-pointer mt-4 sm:mt-0">
            Reserva
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;

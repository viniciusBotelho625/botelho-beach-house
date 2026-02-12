"use client";

import {
  Users,
  ChevronRight,
  ChevronDownIcon,
  Plus,
  Minus,
  CalendarIcon,
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonRounded } from "./ButtonRounded";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";

const BookingWidget = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
  const totalGuests = guests.adultos + guests.criancas;

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
    console.error("❌ Erro ao buscar reservas:", bookingsError);
  }

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

  /** Retorna true se algum dia no intervalo [from, to) estiver bloqueado. */
  const isRangeIncludingBookedDays = (from: Date, to: Date): boolean => {
    const fromNorm = new Date(from);
    fromNorm.setHours(0, 0, 0, 0);
    const toNorm = new Date(to);
    toNorm.setHours(0, 0, 0, 0);
    for (const d = new Date(fromNorm); d < toNorm; d.setDate(d.getDate() + 1)) {
      if (isDateBooked(d)) return true;
    }
    return false;
  };

  const disabledDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today || isDateBooked(date);
  };

  const handleCloseConfirmModal = () => {
    setGuestsPopoverOpen(false);
  };

  const goToReservation = () => {
    const params = new URLSearchParams();
    if (checkInDate)
      params.set("checkIn", checkInDate.toISOString());
    if (checkOutDate)
      params.set("checkOut", checkOutDate.toISOString());
    const total = guests.adultos + guests.criancas;
    if (total > 0) params.set("guests", String(Math.min(10, total)));
    const query = params.toString();
    const url = query ? `/?${query}#reservation` : `/#reservation`;
    router.push(url);
    setTimeout(() => {
      document.getElementById("reservation")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-2 sm:px-4 lg:px-10">
      <div className="bg-[hsl(var(--glass-bg))]/80 backdrop-blur-md rounded-lg px-3 sm:px-6 lg:px-20 py-4 sm:py-6 lg:py-10 border border-white/10">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-end">
          {/* Data Picker */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-2 border-b border-white/20 pb-3">
              <Label
                htmlFor="date-picker"
                className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light"
              >
                {t("hero.dataLabel")}
              </Label>
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="checkout-date-picker"
                    className="w-full md:w-60 justify-between font-normal bg-transparent hover:bg-transparent hover:text-white/50 border-none shadow-none text-white/70 p-0! cursor-pointer text-xs sm:text-sm h-auto"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {checkInDate && checkOutDate
                          ? `${checkInDate.toLocaleDateString("pt-BR")} - ${checkOutDate.toLocaleDateString("pt-BR")}`
                          : checkInDate
                            ? `${checkInDate.toLocaleDateString("pt-BR")} - Selecione saída`
                            : t("hero.data")}
                      </span>
                    </div>
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto bg-[#03303E]/70 backdrop-blur-xl border-white/30 rounded-lg shadow-2xl text-white"
                  align="end"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col gap-2">
                    {(checkInDate || checkOutDate) && (
                      <button
                        type="button"
                        onClick={() => {
                          setCheckInDate(undefined);
                          setCheckOutDate(undefined);
                        }}
                        className="text-xs text-white/70 hover:text-white underline self-end"
                      >
                        Limpar datas
                      </button>
                    )}
                    <Calendar
                      mode="range"
                      locale={ptBR}
                      selected={
                        checkInDate || checkOutDate
                          ? { from: checkInDate, to: checkOutDate }
                          : undefined
                      }
                      disabled={disabledDates}
                      excludeDisabled
                      modifiers={{ booked: (date) => isDateBooked(date) }}
                      modifiersClassNames={{
                        booked:
                          "opacity-40 line-through cursor-not-allowed text-red-300/50",
                      }}
                      classNames={{
                        day_disabled:
                          "opacity-40 line-through cursor-not-allowed text-red-300",
                      }}
                      onSelect={(range: DateRange | undefined) => {
                        if (range) {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (range.from) {
                            const fromNorm = new Date(range.from);
                            fromNorm.setHours(0, 0, 0, 0);
                            if (fromNorm < today) return;
                            if (isDateBooked(range.from)) return;
                          }
                          if (range.to) {
                            const toNorm = new Date(range.to);
                            toNorm.setHours(0, 0, 0, 0);
                            if (toNorm < today) return;
                            if (isDateBooked(range.to)) return;
                            if (
                              range.from &&
                              isRangeIncludingBookedDays(range.from, range.to)
                            )
                              return;
                          }
                          setCheckInDate(range.from);
                          setCheckOutDate(range.to ?? undefined);
                          if (range.from && range.to) {
                            setTimeout(() => setCheckOutOpen(false), 100);
                          }
                        } else {
                          setCheckInDate(undefined);
                          setCheckOutDate(undefined);
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests Picker */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-2 border-b border-white/20 pb-3">
              <Label className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light">
                {t("hero.guestsLabel")}
              </Label>
              <Popover
                open={guestsPopoverOpen}
                onOpenChange={setGuestsPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-60 justify-between font-normal border-none shadow-none text-white/70 cursor-pointer p-0! bg-transparent hover:bg-transparent hover:text-white/50 text-xs sm:text-sm h-auto"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {totalGuests === 0
                          ? t("hero.guests")
                          : `${totalGuests} ${totalGuests > 1 ? t("hero.guest_plural") : t("hero.guest_singular")}`}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 bg-[#03303E]/70 backdrop-blur-xl border-white/30 rounded-lg shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          {t("hero.adults")}
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
                          disabled={totalGuests >= 10}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          {t("hero.children")}
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
                          disabled={totalGuests >= 10}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          {t("hero.babies")}
                        </Label>
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
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          {t("hero.animals")}
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
                    <div className="bg-white/10 h-px w-full" />
                    <Button
                      className="w-full text-black border-0 bg-white/90 h-10 sm:h-11 hover:text-black hover:bg-white/50 font-light tracking-wider uppercase text-xs sm:text-sm cursor-pointer"
                      onClick={() => handleCloseConfirmModal()}
                    >
                      {t("hero.confirm")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Reserva Button */}
          <Button
            type="button"
            onClick={goToReservation}
            className="w-full md:w-auto md:min-w-60 text-black border-0 bg-white/90 hover:bg-white/50 h-11 sm:h-12 hover:text-black font-light tracking-wider uppercase text-sm cursor-pointer"
            aria-label={t("hero.buttonNext")}
          >
            {t("hero.buttonNext")}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;

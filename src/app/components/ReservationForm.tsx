"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import {
  CalendarIcon,
  User,
  Send,
  Sun,
  Users,
  Moon,
  MapPin,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

const ReservationForm = () => {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const numberWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const locale = i18n.language === "en" ? enUS : ptBR;

  // Preencher campos a partir dos query params (vindos do BookingWidget no hero)
  useEffect(() => {
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const guestsParam = searchParams.get("guests");
    let applied = false;
    if (checkInParam) {
      const d = new Date(checkInParam);
      if (!Number.isNaN(d.getTime())) {
        setCheckIn(d);
        applied = true;
      }
    }
    if (checkOutParam) {
      const d = new Date(checkOutParam);
      if (!Number.isNaN(d.getTime())) {
        setCheckOut(d);
        applied = true;
      }
    }
    if (guestsParam) {
      const n = parseInt(guestsParam, 10);
      if (Number.isInteger(n) && n >= 1 && n <= 10) {
        setGuests(n);
        applied = true;
      }
    }
    if (applied && typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (window.location.hash || ""),
      );
    }
  }, [searchParams]);

  const enviarWhatsApp = () => {
    const formatarData = (data: Date | undefined) => {
      if (!data) return "";
      return format(new Date(data), "dd/MM/yyyy", { locale });
    };

    const mensagem =
      `${t("reservation.whatsappMessage")}\n\n` +
      `*${t("reservation.messageName")}:* ${name}\n` +
      `*${t("reservation.messageCheckIn")}:* ${formatarData(checkIn)}\n` +
      `*${t("reservation.messageCheckOut")}:* ${formatarData(checkOut)}\n` +
      `*${t("reservation.messageTime")}:* ${checkInTime}\n` +
      `*${t("reservation.messageGuests")}:* ${guests}`;

    const url = `https://wa.me/${numberWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["airbnb-calendar"],
    queryFn: getAirbnbCalendar,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });

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

  const disabledDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today || isDateBooked(date);
  };

  const disabledCheckOutDates = (date: Date): boolean => {
    const minDate = checkIn || new Date();
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    return d < min || isDateBooked(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    const hasMissingFields =
      !checkIn ||
      !checkOut ||
      !checkInTime ||
      !name.trim() ||
      !guests ||
      guests < 1;

    if (hasMissingFields) {
      const defaultMessage =
        i18n.language === "en"
          ? "Please fill in all required fields."
          : "Por favor, preencha todos os campos obrigatórios.";

      const translated = t("reservation.requiredError");
      const message =
        translated === "reservation.requiredError"
          ? defaultMessage
          : translated;

      alert(message);
      return;
    }

    enviarWhatsApp();
    setCheckIn(undefined);
    setCheckOut(undefined);
    setCheckInTime("");
    setName("");
    setGuests(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto px-0 sm:px-4"
    >
      <div className="reservation-card p-4 sm:p-6 md:p-10 glow-accent">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {/* Left Side - Visual */}
          <div className="flex flex-col items-center justify-center text-center space-y-5 sm:space-y-8">
            {/* Decorative Icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl scale-150 bg-[hsl(180_50%_45%_/0.15)]" />
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center animate-float bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                {t("reservation.formTitle")}
                <span className="block text-gradient-accent mt-1">
                  {t("reservation.formTitleHighlight")}
                </span>
              </h2>
              <p className="text-white/75 text-xs sm:text-sm md:text-base max-w-sm leading-relaxed">
                {t("reservation.formSubtitle")}
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in" className="reservation-label">
                  {t("reservation.checkIn")} *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 sm:h-9 rounded-lg border bg-muted border-border text-white hover:text-white/80 hover:bg-muted/80 hover:border-border/80 text-sm sm:text-base",
                        !checkIn && "text-muted-foreground",
                      )}
                      aria-required="true"
                      aria-invalid={hasTriedSubmit && !checkIn}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                      <span id="check-in" className="truncate">
                        {checkIn
                          ? format(checkIn, "dd/MM/yyyy", { locale })
                          : t("reservation.selectPlaceholder")}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-card border-border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={disabledDates}
                      locale={locale}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="check-out" className="reservation-label">
                  {t("reservation.checkOut")} *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 sm:h-9 rounded-lg border bg-muted border-border text-white hover:text-white/80 hover:bg-muted/80 hover:border-border/80 text-sm sm:text-base",
                        !checkOut && "text-muted-foreground",
                      )}
                      aria-required="true"
                      aria-invalid={hasTriedSubmit && !checkOut}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                      <span id="check-out" className="truncate">
                        {checkOut
                          ? format(checkOut, "dd/MM/yyyy", { locale })
                          : t("reservation.selectPlaceholder")}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-card border-border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={disabledCheckOutDates}
                      locale={locale}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="reservation-label">
                {t("reservation.guests")} *
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  max={10}
                  placeholder={t("reservation.guestsPlaceholder")}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="pl-10 reservation-input border"
                  required
                />
              </div>
            </div>
            <div />
            <div className="space-y-2">
              <Label htmlFor="check-in-time" className="reservation-label">
                {t("reservation.checkInTime")} *
              </Label>
              <Select
                value={checkInTime}
                onValueChange={setCheckInTime}
                name="check-in-time"
              >
                <SelectTrigger
                  id="check-in-time"
                  className="relative w-full reservation-input border pl-10 [&>span]:text-inherit"
                  aria-required="true"
                  aria-invalid={hasTriedSubmit && !checkInTime}
                >
                  <SelectValue
                    placeholder={t("reservation.timePlaceholder")}
                    aria-label={t("reservation.timePlaceholder")}
                  />
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  <SelectItem
                    value="manha"
                    className="cursor-pointer text-foreground focus:bg-muted focus:text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-primary" />
                      {t("reservation.morning")}
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="noite"
                    className="cursor-pointer text-foreground focus:bg-muted focus:text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-primary" />
                      {t("reservation.evening")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest-name" className="reservation-label">
                {t("reservation.yourName")} *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="guest-name"
                  type="text"
                  placeholder={t("reservation.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 reservation-input border"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-sm sm:text-base font-medium rounded-xl reservation-btn group"
              >
                <span>{t("reservation.submit")}</span>
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <p className="text-center text-xs text-white/60 pt-2">
              {t("reservation.whatsappNote")}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, User, Send, Sun, Users, Moon, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAirbnbCalendar, type Booking } from "@/lib/airbnbCalendar";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";

const ReservationForm = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);

  const numberWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const enviarWhatsApp = () => {
    const formatarData = (data: Date | undefined) => {
      if (!data) return "";
  
      return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };
  
    const mensagem = 
  `Olá! Gostaria de solicitar um orçamento
  
  *Nome:* ${name}
  *Data de entrada:* ${formatarData(checkIn)}
  *Data de saída:* ${formatarData(checkOut)}
  *Horário de entrada:* ${checkInTime}
  *Hóspedes:* ${guests}`;
  
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
    enviarWhatsApp();
    setCheckIn(undefined);
    setCheckOut(undefined);
    setCheckInTime("");
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto px-0 sm:px-4">
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
                Reserve sua
                <span className="block text-gradient-accent mt-1">Experiência</span>
              </h2>
              <p className="text-white/75 text-xs sm:text-sm md:text-base max-w-sm leading-relaxed">
                Preencha o formulário e receba seu orçamento personalizado em instantes via WhatsApp.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Check-in Date */}
              <div className="space-y-2">
                <Label className="reservation-label">Entrada</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 sm:h-9 rounded-lg border bg-muted border-border text-white hover:bg-muted/80 hover:border-border/80 text-sm sm:text-base",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{checkIn ? format(checkIn, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={disabledDates}
                      locale={ptBR}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <Label className="reservation-label">Saída</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 sm:h-9 rounded-lg border bg-muted border-border text-white hover:bg-muted/80 hover:border-border/80 text-sm sm:text-base",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{checkOut ? format(checkOut, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={disabledCheckOutDates}
                      locale={ptBR}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="reservation-label">Hóspedes</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="Quantidade"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="pl-10 reservation-input border"
                />
              </div>
            </div>
            <div></div>
              {/* Check-in Time */}
              <div className="space-y-2">
                <Label className="reservation-label">Horário de Entrada</Label>
                <Select value={checkInTime} onValueChange={setCheckInTime}>
                  <SelectTrigger className="w-full reservation-input border [&>span]:text-inherit">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="manha" className="cursor-pointer text-foreground focus:bg-muted focus:text-foreground">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-primary" />
                        Manhã (09:00 - 12:00)
                      </div>
                    </SelectItem>
                    <SelectItem value="noite" className="cursor-pointer text-foreground focus:bg-muted focus:text-foreground">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-primary" />
                        Noite (18:00 - 22:00)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label className="reservation-label">Seu Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 reservation-input border"
                    maxLength={100}
                  />
                </div>
              </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-sm sm:text-base font-medium rounded-xl reservation-btn group"
                onClick={enviarWhatsApp}
              >
                <span>Solicitar Orçamento</span>
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <p className="text-center text-xs text-white/60 pt-2">
              Você será redirecionado para o WhatsApp
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;

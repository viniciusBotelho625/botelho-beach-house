"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Guest {
  id: number;
  name: string;
}

export default function Reserve() {
  // const [date, setDate] = React.useState<Date | undefined>(
  //   new Date(2025, 5, 12)
  // );
  // const bookedDates = Array.from(
  //   { length: 12 },
  //   (_, i) => new Date(2025, 5, 15 + i)
  // );

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));
  const [guests, setGuests] = useState<Guest[]>([]);

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGuests(data.guests));
  }, []);

  return (
    <div className="w-full py-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 ">
        Faça sua reserva
      </h2>
      <Card className="w-[768px] h-[406px] mx-auto bg-white grid grid-cols-2 gap-8 border-0 shadow-lg p-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Selecionar as Datas</h3>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            // disabled={bookedDates}
            // modifiers={{
            //   booked: bookedDates,
            // }}
            modifiersClassNames={{
              booked: "[&>button]:line-through opacity-100",
            }}
            className="rounded-lg  shadow-sm"
          />
        </div>
        <div>
          <p className="text-xl font-semibold mb-4">Detalhes da Reserva</p>
          <div className="grid grid-cols-2 gap-4 space-y-4">
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Check-in
              </Label>
              <div className="relative flex gap-2">
                <Input
                  id="date1"
                  value={value}
                  placeholder="dd/mm/aaaa"
                  className="bg-background pr-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Selecionar data</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Check-out
              </Label>
              <div className="relative flex gap-2">
                <Input
                  id="date"
                  value={value}
                  placeholder="dd/mm/aaaa"
                  className="bg-background pr-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Selecionar data</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar quantidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Hóspedes </SelectLabel>
                {guests.map((guest) => (
                  <SelectItem key={guest.id} value="apple">
                    {guest.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
}

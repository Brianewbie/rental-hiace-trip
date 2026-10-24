"use client";

import { useState, useRef, useEffect } from "react";
import Icon8 from "./icons8";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  min?: string; // YYYY-MM-DD
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CustomDatePicker({
  value,
  onChange,
  min,
  placeholder = "Pilih tanggal...",
  label,
  required = false,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial view year & month from value or min or today
  const initialDate = value
    ? new Date(value + "T00:00:00")
    : min
    ? new Date(min + "T00:00:00")
    : new Date();

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-11

  // Synchronize view when value changes
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const todayStr = new Date().toISOString().split("T")[0];

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Generate days for viewMonth & viewYear
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const calendarDays: {
    day: number;
    month: "prev" | "current" | "next";
    dateStr: string;
    isPast: boolean;
    isSelected: boolean;
    isToday: boolean;
  }[] = [];

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = viewMonth === 0 ? 12 : viewMonth;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({
      day: d,
      month: "prev",
      dateStr,
      isPast: min ? dateStr < min : dateStr < todayStr,
      isSelected: dateStr === value,
      isToday: dateStr === todayStr,
    });
  }

  // Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const m = viewMonth + 1;
    const dateStr = `${viewYear}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({
      day: d,
      month: "current",
      dateStr,
      isPast: min ? dateStr < min : dateStr < todayStr,
      isSelected: dateStr === value,
      isToday: dateStr === todayStr,
    });
  }

  // Next month padding to fill up grid to 35 or 42 cells
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const m = viewMonth === 11 ? 1 : viewMonth + 2;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({
      day: d,
      month: "next",
      dateStr,
      isPast: min ? dateStr < min : dateStr < todayStr,
      isSelected: dateStr === value,
      isToday: dateStr === todayStr,
    });
  }

  // Format value into Indonesian text: e.g. "25 Oktober 2026"
  const formatDisplay = (val: string) => {
    if (!val) return "";
    const parts = val.split("-");
    if (parts.length !== 3) return val;
    const y = parts[0];
    const mIndex = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return `${d} ${MONTHS_ID[mIndex]} ${y}`;
  };

  const handleSelectDate = (dateStr: string, isPast: boolean) => {
    if (isPast) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
          <Icon8 name="calendar" size={14} color="#f97316" />
          <span>{label}</span>
          {required && <span className="text-orange-500">*</span>}
        </label>
      )}

      {/* Custom Trigger Input */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-2xl border bg-[#f8fafc] px-4 py-3 text-xs sm:text-sm font-medium transition-all text-left ${
          isOpen
            ? "border-zinc-950 bg-white ring-2 ring-zinc-950/5"
            : "border-zinc-200/80 hover:border-zinc-300 hover:bg-white"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Icon8 name="calendar" size={15} color={value ? "#18181b" : "#a1a1aa"} />
          <span className={value ? "text-zinc-950 font-semibold" : "text-zinc-400 font-normal"}>
            {value ? formatDisplay(value) : placeholder}
          </span>
        </div>
        <div className="text-zinc-400 flex items-center">
          <Icon8 name="chevron-down" size={14} color="currentColor" />
        </div>
      </button>

      {/* Custom Luxury Calendar Dropdown Modal/Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 w-full sm:w-[320px] rounded-[24px] border border-zinc-200/90 bg-white p-4 shadow-[0_16px_40px_rgb(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-150">
          {/* Calendar Header with Month & Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 hover:bg-zinc-50 transition-colors"
              aria-label="Bulan Sebelumnya"
            >
              <Icon8 name="chevron-left" size={14} color="currentColor" />
            </button>

            <span className="text-xs sm:text-sm font-semibold text-zinc-950">
              {MONTHS_ID[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 text-zinc-600 hover:bg-zinc-50 transition-colors"
              aria-label="Bulan Berikutnya"
            >
              <Icon8 name="chevron-right" size={14} color="currentColor" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="mt-3 grid grid-cols-7 text-center">
            {DAYS_ID.map((day, idx) => (
              <span
                key={day}
                className={`text-[10px] font-semibold py-1 ${
                  idx === 0 ? "text-orange-500" : "text-zinc-400"
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days grid */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((cell, idx) => {
              const isCurrentMonth = cell.month === "current";

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={cell.isPast}
                  onClick={() => handleSelectDate(cell.dateStr, cell.isPast)}
                  className={`relative flex h-8 w-8 sm:h-9 sm:w-9 mx-auto items-center justify-center rounded-full text-xs transition-all ${
                    cell.isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-xs scale-105"
                      : cell.isPast
                      ? "text-zinc-300 cursor-not-allowed"
                      : isCurrentMonth
                      ? "text-zinc-800 hover:bg-zinc-100 font-medium"
                      : "text-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  <span>{cell.day}</span>
                  {/* Subtle indicator for today */}
                  {cell.isToday && !cell.isSelected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Actions */}
          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                if (!min || todayStr >= min) {
                  onChange(todayStr);
                  setIsOpen(false);
                }
              }}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Pilih Hari Ini
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="text-zinc-400 hover:text-zinc-600"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

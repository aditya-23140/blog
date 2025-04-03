"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, setYear, getYear, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Custom header (caption) with month navigation and year dropdown
function CustomCaption({ displayMonth, onMonthChange, locale }) {
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    onMonthChange(setYear(displayMonth, newYear));
    setShowYearDropdown(false);
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-lg">
      {/* Previous Month Button */}
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "p-2 rounded-lg hover:bg-primary/20 transition"
        )}
        onClick={() => onMonthChange(subMonths(displayMonth, 1))}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Month/Year Label & Year Dropdown */}
      <div className="relative">
        <button
          type="button"
          className="text-base font-semibold hover:text-primary transition"
          onClick={() => setShowYearDropdown((prev) => !prev)}
        >
          {format(displayMonth, "MMMM yyyy", { locale })}
        </button>
        {showYearDropdown && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 mt-2 w-24 rounded-md border border-muted bg-popover text-popover-foreground shadow-lg">
            <select
              className="w-full px-2 py-2 text-sm bg-popover outline-1 focus:ring-primary rounded-sm max-h-52 overflow-y-auto scrollbar-hide"
              value={getYear(displayMonth)}
              onChange={handleYearChange}
            >
              {Array.from({ length: 125 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* Next Month Button */}
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "p-2 rounded-lg hover:bg-primary/20 transition"
        )}
        onClick={() => onMonthChange(addMonths(displayMonth, 1))}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  // Maintain local state for the controlled month
  const [month, setMonth] = useState(new Date());

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      captionLayout="custom"
      className={cn("p-3", className)}
      classNames={{
        caption: "hidden",
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: (captionProps) => (
          <CustomCaption {...captionProps} onMonthChange={setMonth} />
        ),
      }}
      {...props}
    />
  );
}

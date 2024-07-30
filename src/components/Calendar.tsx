import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPluging from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calender.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "../types";
import { Category, Palette } from "@mui/icons-material";
import {
  calculateDailyBalances,
  financeCalculation,
} from "../utils/financeCalculation";
import { formatCurrency } from "../utils/formatting";
import interactionPlagin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { thema } from "../thema/thema";
import { isSameMonth, toDate } from "date-fns";



interface CalenderProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}
function Calendar({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today
}: CalenderProps) {
  const theme2 = useTheme();
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart
    setCurrentMonth(currentMonth);
    const toDate = new Date()
    if (isSameMonth(toDate, currentMonth)) {
      setCurrentDay(today)
    }
  };

  const dailyBalance = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalance);
  const createEvents = (
    dailyBalance: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalance).map((date) => {
      const { income, balance, expense } = dailyBalance[date];
      return {
        start: date,
        income: formatCurrency(income),
        balance: formatCurrency(balance),
        expense: formatCurrency(expense),
      } as CalendarContent;
    });
  };
  const calendarEvent = createEvents(dailyBalance);
  // カレンダークリック時イベント処理
  const handleClick = (dateInfo: DateClickArg) => {
    console.log(dailyBalance);
    // state選択した
    setCurrentDay(dateInfo.dateStr);
  };
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme2.palette.incomeColor.light
  }
  console.log([...calendarEvent, backgroundEvent])
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPluging, interactionPlagin]}
      initialView="dayGridMonth"
      events={[...calendarEvent, backgroundEvent]} //これで統合できる
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleClick}
    />
  );
}

export default Calendar;

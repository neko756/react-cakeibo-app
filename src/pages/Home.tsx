import Box from "@mui/material/Box";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionFrom from "../components/TransactionFrom";
import { Transaction } from "../types";
import { format } from "date-fns";
interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}



const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const dayliyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;

  });
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false)
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }
  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)

  }

  const incoomeExpenseToggle = ("expence")

  return (
    <Box sx={{ display: "flex" }}>
      {/* 上コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          setCurrentMonth={setCurrentMonth}
          monthlyTransactions={monthlyTransactions}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          today={today}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu dayliyTransactions={dayliyTransactions} currentDay={currentDay} onHandleAddTransactionForm={handleAddTransactionForm} />
        <TransactionFrom onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay} />
      </Box>
    </Box>
  );
};

export default Home;

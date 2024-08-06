import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { thema } from './thema/thema';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { Transaction } from './types';
import { formatmonth } from './utils/formatting';

function App() {
  // fireStoreエラーの
  function isFireStoreError(err: unknown): err is { code: string, message: string } {

    return typeof err === "object" && err !== null && "code" in err

  }
  const [transactions, setTranctions] = useState<Transaction[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())


  useEffect(() => {
    // awaitぶんを直接入れられないのでfetchを書く
    const fetchTransactions = async () => {
      try {
        // データセット取得
        const querySnapshot = await getDocs(collection(db, "Transactions"));

        const transactionData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // ,data()で実際のidが取得できる.

          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTranctions(transactionData)
      } catch (error) {
        if (isFireStoreError(error)) {
          console.error(error)
          console.error(error.message)
          console.error(error.code)
        } else {
          console.error(error)

        }

      }

    }
    fetchTransactions()
  }, [])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatmonth(currentMonth))
  })


  return (
    <ThemeProvider theme={thema}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>


  );
}

export default App;

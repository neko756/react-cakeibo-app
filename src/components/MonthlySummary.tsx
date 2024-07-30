import { AccountBalance, ArrowDownward, Padding } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Transaction } from '../types'
import { financeCalculation } from "../utils/financeCalculation";
import { monthsToYears } from "date-fns";


interface MonthlySummaryProps {
    monthlyTransactions:Transaction[]

}

function MonthlySummary({monthlyTransactions}:MonthlySummaryProps) {
    console.log("MonthlySummaryProps",monthlyTransactions)
    const {income,expense,balance} =  financeCalculation(monthlyTransactions)
    return (
     <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
            {/* 収入 */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                <Card sx={{ bgcolor: (thema) => thema.palette.incomeColor.main, color: "white", borderRadius: "10px" ,
                    flexGrow:1
                }} >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack>
                            <ArrowDownward sx={{ fontSize: "2em" }} />
                            <Typography>収入</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >
                            {income}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* 支出 */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                <Card sx={{ bgcolor: (thema) => thema.palette.expenseColor.main, color: "white", borderRadius: "10px" ,flexGrow:1}}>
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack>
                            <ArrowUpwardIcon sx={{ fontSize: "2em" }} />
                            <Typography>支出</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >
                            {expense}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* 残高 */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                <Card sx={{ bgcolor: (thema) => thema.palette.balanceColor.main, color: "white", borderRadius: "10px" ,flexGrow:1}}>
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack>
                            <AccountBalance sx={{ fontSize: "2em" }} />
                            <Typography>残高</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >
                            {balance}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
}

export default MonthlySummary;

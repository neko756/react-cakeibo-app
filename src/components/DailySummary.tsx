import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../types";
import { financeCalculation } from "../utils/financeCalculation";
interface DailySummarysProps {
  dayliyTransactions: Transaction[]
}


const DailySummary = ({ dayliyTransactions }: DailySummarysProps) => {
  const DaySummary = financeCalculation(dayliyTransactions)
  const { income, expense, balance } = DaySummary
  return (
    <Box>
      <Grid container spacing={2}>
        {/* 収入 */}
        <Grid item xs={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">

              </Typography>
              <Typography
                color={(theme) => theme.palette.incomeColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all" }}
              >
                {income}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 支出 */}
        <Grid item xs={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                color={(theme) => theme.palette.expenseColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all" }}
              >
                {expense}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 残高 */}
        <Grid item xs={12} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                color={(theme) => theme.palette.balanceColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all" }}
              >
                {balance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailySummary;

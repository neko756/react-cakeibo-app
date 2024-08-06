import {
  Box,
  Button,
  ButtonGroup,
  colors,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory } from "../types";
import IconComponents from "./common/IconComponents";
import { IncomingMessage } from "http";
import { Category } from "@mui/icons-material";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string


}
// "給与": <WorkIcon fontSize="small" />,
interface CategoryItem {
  icon: JSX.Element;
  label: IncomeCategory | ExpenseCategory
}

type IncomeExpense = "expense" | "income"
//   "副収入": <AddBusinessIcon fontSize="small" />,
//     お小遣い: <SavingsIcon fontSize="small" />,
const expenseCategories: CategoryItem[] = [


  { label: "食費", icon: IconComponents["食費"] },
  { label: "日用品", icon: IconComponents["日用品"] },
  { label: "住居費", icon: IconComponents["住居費"] },
  { label: "交際費", icon: IconComponents["交際費"] },
  { label: "娯楽", icon: IconComponents["娯楽"] },
  { label: "交通費", icon: IconComponents["交通費"] }

]
const incomeCategories: CategoryItem[] = [
  { label: "お小遣い", icon: IconComponents["お小遣い"] },
  { label: "給与", icon: IconComponents["給与"] },
  { label: "副収入", icon: IconComponents["副収入"] },
]



const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay }: TransactionFormProps) => {
  const formWidth = 320;

  // userFromでwatch
  const { control, setValue, watch } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: ""
    }
  })
  // typeを監視変わったら入れる
  const currentType = watch("type");

  const [categories, setCategories] = useState(expenseCategories)

  // currentType対象が変わったら実行
  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories
    setCategories(newCategories)

  }, [currentType]
  )


  const incoomeExpenseToggle = (type: IncomeExpense): void => {
    setValue("type", type)

  }

  useEffect(() => {
    setValue("date", currentDay);

  }, [currentDay]);


  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        // 開閉のアニメーションセッってい
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onCloseForm}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}

            render={({ field }) => {
              console.log("field", field)

              return (<ButtonGroup fullWidth>
                <Button onClick={() => incoomeExpenseToggle("expense")}
                  variant={field.value === "expense" ? "contained" : "outlined"} color="error">
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={() => incoomeExpenseToggle("income")}
                  color="primary"
                >収入</Button>

              </ButtonGroup>


              )
            }}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />


          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} id="カテゴリ" label="カテゴリ" select >
                {categories.map((category) => (
                  <MenuItem value={category.label}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}

              </TextField>

            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              return (
                < TextField {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => {
                    // から文字だったら０
                    const newValue = parseInt(e.target.value) || 0
                    // value
                    field.onChange(newValue)
                  }}
                  label="金額"
                  type="number" />

              )
            }}

          />


          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="内容" type="text" />

            )}

          />

          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={currentType === "income" ? "primary" : "error"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;

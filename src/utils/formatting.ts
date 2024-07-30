import { format } from "date-fns"

export  const formatmonth = (date:Date) :string => {
    return format(date,"yyyy-MM")
}

// 日本円に変換する
export const formatCurrency = (amount:number) : string => {
    return  amount.toLocaleString("ja-Jp");
}
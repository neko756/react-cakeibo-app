import { InterestsTwoTone, Palette } from "@mui/icons-material";
import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { dark, light } from "@mui/material/styles/createPalette";
import { Interface } from "readline";
declare module "@mui/material/styles" {
    interface Palette {
        incomeColor:PaletteColor,
        expenseColor:PaletteColor,
        balanceColor:PaletteColor
     
    }
interface PaletteOptions {
    incomeColor?:PaletteColorOptions,
    expenseColor?:PaletteColorOptions,
    balanceColor?:PaletteColorOptions
 

}
}

export const thema = createTheme({
    typography: {
        fontFamily: "Noto Sans JP, Roboto",
        fontWeightRegular:400,
        fontWeightMedium:500,
        fontWeightBold:700
    },
    palette:{
        incomeColor:{
            main: blue[500],
            light: blue[100],
            dark: blue[700]
        },
        expenseColor:{
            main: red[500],
            light: red[100],
            dark: red[700]
        },
        balanceColor:{
            main: green[500],
            light: green[100],
            dark: green[700]
        }
    }
})
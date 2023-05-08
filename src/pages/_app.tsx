import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "light",
  }
})
export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

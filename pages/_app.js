/*
----------------------------------------
Import necessary components and global CSS styles from @carbonplan node module
----------------------------------------
*/
import { ThemeProvider } from 'theme-ui'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'

/* 
----------------------------------------
Define App component, which wraps the main application component with the chosen within the ThemeProvider.
----------------------------------------
*/
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App

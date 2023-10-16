/*
----------------------------------------
Import necessary components from next.js and @carbonplan node module
----------------------------------------
*/
import Document, { Html, Main, NextScript, Head } from 'next/document'
import { Tracking } from '@carbonplan/components'
import { InitializeColorMode } from 'theme-ui'

/* 
----------------------------------------
Defines the MyDocument class, which extends Document. It customizes the initial HTML document. Sets the language, adds tracking, and initializes color mode.
----------------------------------------*/
class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className='no-focus-outline'>
        <Head>
          <Tracking id={process.env.GA_TRACKING_ID} />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

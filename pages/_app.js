/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import App from 'next/app'

/* import in _app, not in doc https://github.com/zeit/next-plugins/issues/282#issuecomment-436661879 */
import "../styles/index.scss"

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);

  //   return { ...appProps }
  // }

  render() {
    const {
      Component,
      pageProps
    } = this.props

    return <Component {...pageProps}/>
  }
}

export default MyApp

/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Document, {
  Head, Html, Main, NextScript
} from 'next/document'

export default class extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)

  //   return {...initialProps}
  // }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return <Html>
      <Head>
        <meta
          name="viewport"
          // eslint-disable-next-line max-len
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
        />
        <meta charSet="utf-8"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  }
}

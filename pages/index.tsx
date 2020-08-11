import {PureComponent} from 'react'

export default class Page extends PureComponent<{data: tRecord[]}> {
  //@ts-ignore https://github.com/zeit/next.js/blob/d190f2e112bd4a767a21d1b0e9d61379d72ef1dc/packages/next/types/index.d.ts#L49
  static getInitialProps({query}) {
    return query
  }

  render() {
    const {data} = this.props

    return <div>{JSON.stringify(data)}</div>
  }  
}
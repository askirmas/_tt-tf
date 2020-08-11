import {PureComponent} from 'react'
import Card from '../components/Card'

type tProps = {data: Record<string, tRecord>}

const {keys: $keys} = Object

export default class Page extends PureComponent<tProps> {
  //@ts-ignore https://github.com/zeit/next.js/blob/d190f2e112bd4a767a21d1b0e9d61379d72ef1dc/packages/next/types/index.d.ts#L49
  static getInitialProps({query: {data}}: {query: {data: tRecord[]}}) {
    const props = {} as tProps["data"]
    data.forEach(record => props[record.id] = record)
    return {data: props}
  }

  render() {
    const {data} = this.props
    
    return <>{
      $keys(data)
      .map(id => <form {...{
        "key": id
      }}>
        <Card {...data[id]}/>
      </form>)
    }</>
  }  
}
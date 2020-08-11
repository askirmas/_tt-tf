import {PureComponent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import Card from '../components/Card'
import schema from "../schema.json"

type tProps = {data: Record<string, tRecord>}
type tFormButton = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  "type": string
} & Partial<{
  "value": string
  "form": string 
}>

const {keys: $keys} = Object
, submitsData: tFormButton[] = [
  {
    "type": "checkbox",
    "form": "",
    "value": "edit"
  }, 
  {
    "type": "submit",
    "value": "delete",
  },
  {
    "type": "submit",
    "value": "submit"
  }
]
, actions = <>{submitsData.map(({value, type}) => <input {...{
  type,
  "className": `Button Card__${value}`,
  "key": value,
  value
}}/>)}</>
, {"definitions": {"tRecord": {
  "default": $default,
  "properties": recordSchema
}}} = schema 
, {"id": defaultId} = $default

export default class Page extends PureComponent<tProps> {
  //@ts-ignore https://github.com/zeit/next.js/blob/d190f2e112bd4a767a21d1b0e9d61379d72ef1dc/packages/next/types/index.d.ts#L49
  static getInitialProps({query: {data}}: {query: {data: tRecord[]}}) {
    const props = {} as tProps["data"]
    data.forEach(record => props[record.id] = record)
    return {data: props}
  }

  render() {
    const {data} = this.props

    return <>
      {
        //@ts-ignore
        [defaultId].concat($keys(data))
        .map(id => {
          const isNew = id === defaultId

          return <form {...{
            "method": "POST",
            "key": id,
            "name": `${id}`,
            "action": "#",
            "className": `Card ${!isNew ? '' : "Card--new"}`,
            "tabIndex": isNew ? 0 : -1
          }}>
            <Card {...{
              "data": isNew ? $default : data[id],
              "schema": recordSchema
            }}>{
              !isNew
              ? actions
              : <>
                <label htmlFor="__next" className="Button Card__edit Card__edit--new" tabIndex={0}>cancel</label>
              </>
            }</Card>
          </form>
        })
      }
    </>
  }  
}
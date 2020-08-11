import {PureComponent, DetailedHTMLProps, InputHTMLAttributes, FormEvent, MouseEventHandler} from 'react'
import Card from '../components/Card'
import schema from "../schema.json"

type tProps = {data: Record<string, tRecord>}
type tState = Partial<tProps["data"]>

type tFormButton = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  "type": string
} & Partial<{
  "value": string
  "form": string 
}>

const {keys: $keys} = Object
, submitsData: tFormButton[] = [
  {
    "type": "submit",
    "value": "delete",
  },
  {
    "type": "reset",
    "value": "cancel",
  },
  {
    "type": "submit",
    "value": "submit"
  }
]
, {"definitions": {"tRecord": {
  "default": $default,
  "properties": recordSchema
}}} = schema 
, {"id": defaultId} = $default

export default class Page extends PureComponent<tProps, tState> {
  //@ts-ignore https://github.com/zeit/next.js/blob/d190f2e112bd4a767a21d1b0e9d61379d72ef1dc/packages/next/types/index.d.ts#L49
  static getInitialProps({query: {data}}: {query: {data: tRecord[]}}) {
    const props = {} as tProps["data"]
    data.forEach(record => props[record.id] = record)
    return {data: props}
  }

  state: tState = {}

  onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    // const target = ev.target as HTMLFormElement
    ev.preventDefault()
    ev.stopPropagation()

    // console.log(target, ev.currentTarget, [...new FormData(target as HTMLFormElement)])
    return false
  }

  clickHandler: MouseEventHandler<HTMLFormElement> = ({
    target: input,
    currentTarget: form
  }) => {
    //@ts-ignore
    const {name: action = ""} = input
    , id = form.getAttribute("name") ?? ""

    if (id === "" || action === "")
      return 

    switch (action) {
      case "delete": 
        this.setState({[id]: undefined})
        break
      case "submit":
        const data = {
          ...this.props.data[id],
          ...this.state[id]
        }

        ;[...new FormData(form)]
        //@ts-ignore
        .forEach(([k, v]) => data[k] = v)
        
        this.setState({[id]: data as tRecord})
        break
      case "cancel":
        break
        
      default:
        return
    }

    //@ts-ignore
    document.activeElement?.blur?.()
  }

  actions = <>{submitsData.map(({value, type}) => <input {...{
    type,
    "className": `Button Card__${value}`,
    "key": value,
    "name": value,
    value
  }}/>)}</>


  render() {
    const records = {...this.props.data, ...this.state}
    , {
      onSubmit, actions,
      clickHandler
    } = this
    
    return <>
      {
        //@ts-ignore
        [defaultId].concat($keys(records))
        .map(id => {
          const isNew = id === defaultId
          , data = isNew ? $default : records[id]
          , formId = `${id}`

          return data && <form {...{
            "method": "POST",
            "key": id,
            "id": formId,
            "name": formId,
            "action": "#",
            "className": `Card ${!isNew ? '' : "Card--new"}`,
            "tabIndex": 0,
            onSubmit,
            "onClick": clickHandler
          }}>
            <Card {...{
              data,
              "schema": recordSchema
            }}>
              {actions}
              <label htmlFor={formId} className="Button Card__edit">edit</label>
            </Card>
          </form>
        })
      }
    </>
  }  
}
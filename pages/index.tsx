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
    "name": "delete",
    "value": "delete",
  },
  {
    "type": "reset",
    "name": "cancel",
    "value": "clear",
  },
  {
    "type": "submit",
    "name": "save",
    "value": "check"
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
    data.forEach(record => {
      const {id} = record
      props[id] = record

    })
    return {data: props}
  }

  lastId: number = defaultId
  state: tState = {}

  constructor(props: tProps) {
    super(props)
    this.lastId = Math.max(...$keys(props.data).map(id => +id)) ?? defaultId
  }

  onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

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
      case "save":
        if (!form.checkValidity())
          return
        const data = {
          ...this.props.data[id],
          ...this.state[id]
        }

        ;[...new FormData(form)]
        //@ts-ignore
        .forEach(([k, v]) => data[k] = v)
        
        this.setState({
          [
            id !== `${defaultId}`
            ? id
            : ++this.lastId
          ]: data as tRecord
        })
        break
      case "cancel":
        break
        
      default:
        return
    }

    //@ts-ignore
    document.activeElement?.blur?.()
  }

  actions = <>{submitsData.map(({value, type, name}) => <input {...{
    type,
    "className": `Button Card__${name}`,
    "key": value,
    name,
    "tabIndex": value !== "delete" ? 0 : -1 ,
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
          , data = isNew ? $default : records[id] as tRecord
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
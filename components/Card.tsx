import {memo, PropsWithChildren} from 'react'

type tProps = {
  data: tRecord
  schema: Record<keyof tRecord, PrimitiveSchema>
}

const {entries: $entries} = Object
, Card = memo(CardRender)

export default Card 

function CardRender({children, data, schema}: PropsWithChildren<tProps>) {
  const slots = ($entries(schema) as [keyof typeof schema, PrimitiveSchema][])
  .map(([property, {type, readOnly, pattern, format}]) => {
    const key = property
    , defaultValue = data[property]
    , slotClass = `Card__${property}`

    return property === "avatar" 
    ? <img {...{
      "className": slotClass,
      "src": `./avatars/${defaultValue ?? 'default.svg'}`
    }}/>
    : readOnly
    ? <div {...{
      "className": slotClass,
      "data-value": defaultValue
    }}>

    </div>
    : <input {...{
      key,
      "className": `Input ${slotClass}`,
      //TODO Make that script-less stuff
      "tabIndex": -1,
      defaultValue,
      "name": property,
      "type": format ?? (type === "string" ? "text" : type),
      "placeholder": property,
      pattern
    }}/>
  })
  
  return <>{children}{slots}</>
}
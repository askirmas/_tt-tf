import {memo, PropsWithChildren} from 'react'
import schema from "../schema.json"

const {definitions: {tRecord: {properties: recordSchema}}} = schema
, {entries: $entries} = Object
, Card = memo(CardRender)

export default Card 

function CardRender({children, ...data}: PropsWithChildren<tRecord>) {
  const slots = ($entries(recordSchema) as [keyof typeof recordSchema, PrimitiveSchema][])
  .map(([property, {type, readOnly, pattern, format}]) => {
    const key = property
    , defaultValue = data[property]
    , slotClass = `Card__${property}`

    return property === "avatar" 
    ? <img {...{
      "className": slotClass,
      "src": `./avatars/${defaultValue}`      
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
      defaultValue,
      "name": property,
      "type": format ?? (type === "string" ? "text" : type),
      pattern
    }}/>
  })
  
  return <>{children}{slots}</>
}
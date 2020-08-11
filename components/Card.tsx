import {memo} from 'react'

const Card = memo(CardRender)

export default Card 

function CardRender(data: tRecord) {
  return <div>{data}</div>
}
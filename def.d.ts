declare interface tRecord {
  "name": string
  "avatar": string
  "position": string
  "id": number
  "address": string
  "company": string
  "companyAdress": string
  "location": string
  "phone": string
}

declare type PrimitiveSchema = Partial<{
  "type": string
  "readOnly": boolean
  "pattern": string
  "format": string
}>

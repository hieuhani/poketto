export const MessageMethod = Object.freeze({
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CREATE_NFT_COLLECTION: 'createNFTCollection',
} as const);


export interface CreateNFTCollectionPayload {
  name : string
  description : string
  image : string
  maxAmount: number
}

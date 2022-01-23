import { Web3Storage } from 'web3.storage'

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN
}

export default function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}
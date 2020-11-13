import axios from "axios";

export default axios.create({
  baseURL: "https://chapters-5dc5.restdb.io/rest/chapters",
  timeout: 2000,
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5f9fbf8e231ba42851b4a072',
    'content-type': 'application/json'
  },
  params: {
    key: 'd124f06e3d67b525dcb881b81052eebf4c499'
  }
})

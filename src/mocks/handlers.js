import { rest } from 'msw'

const GET_BOOK = 'https://chapters-5dc5.restdb.io/rest/chapters?key=d124f06e3d67b525dcb881b81052eebf4c499'
const PUT_BOOK = 'https://chapters-5dc5.restdb.io/rest/chapters/5f9fae4bee7ecf5f00002310?key=d124f06e3d67b525dcb881b81052eebf4c499'

export const handlers = [
  rest.get(GET_BOOK, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {"_id":"5f9fae4bee7ecf5f00002310","data":[{"text":"Chapter One","completed":false,"sections":[{"text":"Section One","completed":false,"modalOpen":false},{"text":"Section Two","completed":true,"modalOpen":false}],"sectionFilter":"FILTER_ALL_SECTIONS"},{"text":"Chapter Two","completed":false,"sections":[],"sectionFilter":"FILTER_ALL_SECTIONS"}],"formData":{}}
        ]
      )
    )
  }),

  rest.put(PUT_BOOK, (req, res, ctx) => {
    return res(
      ctx.status(204),
      ctx.json(
        [
          {"_id":"5f9fae4bee7ecf5f00002310","data":[{"text":"Chapter One","completed":false,"sections":[{"text":"Section One","completed":false,"modalOpen":false},{"text":"Section Two","completed":true,"modalOpen":false}],"sectionFilter":"FILTER_ALL_SECTIONS"},{"text":"Chapter Two","completed":false,"sections":[],"sectionFilter":"FILTER_ALL_SECTIONS"}],"formData":{}}
        ]
      )
    )
  })
]

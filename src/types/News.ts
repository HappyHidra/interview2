export interface News {
  name: string
  code: string
  previewText: string
  type: newsType
  date: number
  link: string
  image: string
}

type newsType = {
  value: string
  xmlId: string
}

type Navigation = {
  current: number
  total: number
}

export interface Response {
  items: Array<News>
  nav: Navigation
}

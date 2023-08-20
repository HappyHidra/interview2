import type { Response } from '@/types/News'

export const fetchData = async (): Promise<Response> => {
  const result = await fetch('https://flems.github.io/test/api/news/')
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`${resp.status}`)
      } else return resp.json()
    })
    .then((json) => json)
    .catch((error) => error)

  return result
}

export const fetchPage = async (page: number): Promise<Response> => {
  const result = await fetch(`https://flems.github.io/test/api/news/${page}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`${resp.status}`)
      } else return resp.json()
    })
    .then((json) => json)
    .catch((error) => error)

  return result
}

import { NowRequest, NowResponse } from '@vercel/node'

import CategoriesService from 'modules/categories/CategoriesService'
import checkAuth from 'utils/checkAuth'
import connectDb from 'utils/connectDb'

export default async function (req: NowRequest, res: NowResponse) {
  const {
    query: { id },
    body,
    method
  } = req

  if (!(await checkAuth(req))) {
    res.status(401).send('Unauthorized')
    return
  }

  await connectDb()

  switch (method) {
    case 'GET':
      try {
        const category = await CategoriesService.getOne(id)
        res.json(category)
      } catch (error) {
        res.status(500).send({ message: error.message })
      }
      break
    case 'PATCH':
      try {
        const category = await CategoriesService.update(id, body)
        res.send(category)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const result = await CategoriesService.delete(id)
        res.json(result)
      } catch (error) {
        res.status(500).send({ message: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

import { NowRequest, NowResponse } from '@vercel/node'

import ProductsService from 'modules/products/ProductsService'
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
        const product = await ProductsService.getOne(id)
        res.json(product)
      } catch (error) {
        res.status(500).send({ message: error.message })
      }
      break
    case 'PATCH':
      try {
        const product = await ProductsService.update(id, body)
        res.send(product)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const result = await ProductsService.delete(id)
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

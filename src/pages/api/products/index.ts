import { NowRequest, NowResponse } from '@vercel/node'

import connectDb from 'utils/connectDb'
import ProductsService from 'modules/products/ProductsService'
import checkAuth from 'utils/checkAuth'

export default async function (req: NowRequest, res: NowResponse) {
  const { method, body } = req

  if (!(await checkAuth(req))) {
    res.status(401).send('Unauthorized')
    return
  }

  await connectDb()

  switch (method) {
    case 'POST':
      try {
        const product = await ProductsService.create(body)
        res.status(201).send(product)
      } catch ({ message }) {
        res.status(400).send({ message })
      }
      break
    case 'GET':
      try {
        const products = await ProductsService.getAll()
        res.send(products)
      } catch ({ message }) {
        res.status(500).send({ message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

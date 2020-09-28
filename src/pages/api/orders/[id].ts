import { NowRequest, NowResponse } from '@vercel/node'

import OrdersService from 'modules/orders/OrdersService'
import checkAuth, { JwtUser } from 'utils/checkAuth'
import connectDb from 'utils/connectDb'

export default async function (req: NowRequest, res: NowResponse) {
  const {
    query: { id },
    body,
    method
  } = req

  const user = (await checkAuth(req)) as JwtUser

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  await connectDb()

  switch (method) {
    case 'GET':
      try {
        const order = await OrdersService.getOne(id)
        res.json(order)
      } catch (error) {
        res.status(500).send({ message: error.message })
      }
      break
    case 'PATCH':
      try {
        const order = await OrdersService.update(id, user.sub, body)
        res.send(order)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const result = await OrdersService.delete(id)
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

import { NowRequest, NowResponse } from '@vercel/node'

import connectDb from 'utils/connectDb'
import OrdersService from 'modules/orders/OrdersService'
import checkAuth, { JwtUser } from 'utils/checkAuth'

export default async function (req: NowRequest, res: NowResponse) {
  const { method, body } = req

  const user = (await checkAuth(req)) as JwtUser

  if (!user) {
    res.status(401).send('Unauthorized')
    return
  }

  await connectDb()

  switch (method) {
    case 'POST':
      try {
        const order = await OrdersService.create(user.sub, body)
        res.status(201).send(order)
      } catch ({ message }) {
        res.status(400).send({ message })
      }
      break
    case 'GET':
      try {
        const orders = await OrdersService.getAll()
        res.send(orders)
      } catch ({ message }) {
        res.status(500).send({ message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

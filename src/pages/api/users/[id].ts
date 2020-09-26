import { NowRequest, NowResponse } from '@vercel/node'

import UsersService from 'modules/users/UsersService'
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
        const user = await UsersService.getOne(id)
        res.json(user)
      } catch (error) {
        res.status(500).send({ message: error.message })
      }
      break
    case 'PATCH':
      try {
        const user = await UsersService.update(id, body)
        res.send(user)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const result = await UsersService.delete(id)
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

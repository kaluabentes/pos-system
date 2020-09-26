import { NowRequest, NowResponse } from '@vercel/node'

import connectDb from 'utils/connectDb'
import UsersService from 'modules/users/UsersService'
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
        const newUser = await UsersService.create(body)
        res.status(201).send(newUser)
      } catch ({ message }) {
        res.status(400).send({ message })
      }
      break
    case 'GET':
      try {
        const users = await UsersService.getAll()
        res.send(users)
      } catch ({ message }) {
        res.status(500).send({ message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

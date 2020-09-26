import { NowRequest, NowResponse } from '@vercel/node'

import AuthService from 'modules/auth/AuthService'
import connectDb from 'utils/connectDb'

export default async function (req: NowRequest, res: NowResponse) {
  const { method, body } = req

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  await connectDb()

  try {
    const payload = await AuthService.login(body)
    res.send(payload)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

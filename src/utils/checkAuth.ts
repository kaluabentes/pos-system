import jwt from 'jsonwebtoken'

export interface JwtUser {
  sub: string
  name: string
  email: string
}

export default function checkAuth(req): Promise<JwtUser | boolean> {
  const {
    headers: { authorization }
  } = req

  if (!authorization) {
    return Promise.resolve(false)
  }

  return new Promise(resolve => {
    jwt.verify(authorization, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        resolve(false)
        return
      }

      resolve(user)
    })
  })
}

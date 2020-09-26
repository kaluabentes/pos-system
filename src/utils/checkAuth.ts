import jwt from 'jsonwebtoken'

export default function checkAuth(req, res) {
  const {
    headers: { authorization }
  } = req

  if (!authorization) {
    return false
  }

  return new Promise(resolve => {
    jwt.verify(authorization, process.env.JWT_SECRET, error => {
      if (error) {
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}

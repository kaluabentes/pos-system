import Joi from 'joi'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from 'modules/users/User'

class AuthService {
  async login(credentials) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    await schema.validateAsync(credentials)

    const user = await User.findOne({ email: credentials.email }).exec()
    if (!user) {
      throw new Error('Invalid email')
      return
    }

    const checkPassword = await bcrypt.compare(
      credentials.password,
      user.password
    )
    if (!checkPassword) {
      throw new Error('Invalid password')
    }

    const payload = {
      sub: user._id,
      name: user.name,
      email: user.email
    }

    return {
      token: await jwt.sign(payload, process.env.JWT_SECRET),
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}

export default new AuthService()

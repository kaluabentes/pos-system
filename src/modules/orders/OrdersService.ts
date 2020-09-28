import Joi from 'joi'

import Order from './Order'

class OrdersService {
  getAll() {
    return Order.find({}).exec()
  }

  getOne(id) {
    return Order.findById(id).exec()
  }

  async create(user, body) {
    const schema = Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required(),
            category: Joi.string().required(),
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required()
          })
        )
        .required()
    })

    await schema.validateAsync(body)

    return await Order.create({
      createdBy: user,
      products: body.products,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async update(id, user, body) {
    const order = await Order.findById(id)
    order.products = body.products || order.products
    order.updatedBy = user
    order.updatedAt = new Date()

    return await order.save()
  }

  async delete(id) {
    return Order.deleteOne({ _id: id })
  }
}

export default new OrdersService()

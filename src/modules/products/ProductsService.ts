import Joi from 'joi'

import Product from './Product'

class ProductsService {
  getAll() {
    return Product.find({}).exec()
  }

  getOne(id) {
    return Product.findById(id).exec()
  }

  async create(body) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string(),
      category: Joi.string().required()
    })

    await schema.validateAsync(body)

    return await Product.create({
      name: body.name,
      price: body.price,
      image: body.image,
      category: body.category
    })
  }

  async update(id, body) {
    const product = await Product.findById(id)
    product.name = body.name || product.name
    product.price = body.price || product.price
    product.image = body.image || product.image
    product.category = body.category || product.category

    return await product.save()
  }

  async delete(id) {
    return Product.deleteOne({ _id: id })
  }
}

export default new ProductsService()

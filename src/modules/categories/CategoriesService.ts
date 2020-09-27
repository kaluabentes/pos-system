import Joi from 'joi'

import Category from './Category'

class CategoriesService {
  getAll() {
    return Category.find({}).exec()
  }

  getOne(id) {
    return Category.findById(id).exec()
  }

  async create(body) {
    const schema = Joi.object({
      name: Joi.string().required()
    })

    await schema.validateAsync(body)

    const exists = await Category.findOne({ name: body.name }).exec()

    if (exists) {
      return exists
    }

    return await Category.create({
      name: body.name
    })
  }

  async update(id, body) {
    const category = await Category.findById(id)
    category.name = body.name || category.name

    return await category.save()
  }

  async delete(id) {
    return Category.deleteOne({ _id: id })
  }
}

export default new CategoriesService()

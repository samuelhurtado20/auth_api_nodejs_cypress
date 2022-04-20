const Joi = require('@hapi/joi')

const userValidationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})

const loginValidation = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})

class DataValidation {
  static registerValidation(request) {
    return userValidationSchema.validate(request)
  }

  static loginValidation(request) {
    return loginValidation.validate(request)
  }
}

module.exports = { DataValidation }

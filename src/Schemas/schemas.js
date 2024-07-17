import joi from 'joi';

//////////////////////// PRODUCT

export const productSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Name is too short',
      'string.max': 'Name is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  brand: joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Brand is too short',
      'string.max': 'Brand is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  category: joi.string()
    .regex(/^[a-zA-Z_ ]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'Category must contain only letters',
      'string.min': 'Category is too short',
      'string.max': 'Category is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  description: joi.string()
    .min(3)
    .max(150)
    .messages({
      'string.min': 'Description is too short',
      'string.max': 'Description is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  price: joi.number()
    .positive()
    .precision(2)
    .required(),
  stock: joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.min': 'Stock cannot be less than 0',
    }),
  rating: joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      'number.min': 'Rating must be greater than 0',
      'number.max': 'Rating must be less than 5',
    }),
  status: joi.boolean()
    .required(),
  image: joi.any()
});


//////////////////////// USER

export const userSchema = joi.object({
  name: joi
    .string()
    .regex(/^[a-zA-Z_ ]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'Name must contain only letters',
      'string.min': 'Name is too short',
      'string.max': 'Name is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  phone: joi.number().min(1000000000).max(9999999999).required()
    .messages({
      'number.min': 'Phone number must be 10 digits long',
      'number.max': 'Phone number must be no more than 10 digits long',
    }),
  email: joi
    .string()
    .regex(
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
    .messages({
      'string.pattern.base': 'Invalid email',
      'string.empty': 'This field is required'
    })
    .required(),
  city: joi
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'City must contain only letters and numbers',
      'string.min': 'City is too short',
      'string.max': 'City is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  address: joi
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'Address must contain only letters and numbers',
      'string.min': 'Address is too short',
      'string.max': 'Address is too long',
      'string.empty': 'This field is required'
    })
    .required(),
});


//////////////////////// ORDER

// export const orderSchema = joi.object({
//   user: userSchema.required(),
//   deliveryOptions: joi.string().required(),
//   deliveryAddress: joi
//     .string()
//     .regex(/^[a-zA-Z0-9\s]*$/)
//     .min(3)
//     .max(30)
//     .messages({
//       'string.pattern.base': 'Address must contain only letters and numbers',
//       'string.min': 'Address is too short',
//       'string.max': 'Address is too long',
//       'string.empty': 'This field is required'
//     }),
//   isDelivered: joi.boolean().required(),
//   paymentOptions: joi.string().required(),
//   isPaid: joi.boolean().required(),
//   items: joi.array({
//     product: productSchema,
//     qty: joi.number().integer().min(0),
//   }),
//   total: joi.number().min(0),
// });

//////////////////////// ORDER EDIT

export const orderEditSchema = joi.object({
  name: joi
    .string()
    .regex(/^[a-zA-Z_ ]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'Name must contain only letters',
      'string.min': 'Name is too short',
      'string.max': 'Name is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  city: joi
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'City must contain only letters and numbers',
      'string.min': 'City is too short',
      'string.max': 'City is too long',
      'string.empty': 'This field is required'
    })
    .required(),
  email: joi
    .string()
    .regex(
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
    .messages({
      'string.pattern.base': 'Invalid email',
      'string.empty': 'This field is required'
    })
    .required(),
  phone: joi.number().min(1000000000).max(9999999999).required()
    .messages({
      'number.min': 'Phone number must be 10 digits long',
      'number.max': 'Phone number must be no more than 10 digits long',
    }),
  deliveryOptions: joi.string().required(),
  deliveryAddress: joi
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .min(3)
    .max(30)
    .messages({
      'string.pattern.base': 'Address must contain only letters and numbers',
      'string.min': 'Address is too short',
      'string.max': 'Address is too long',
      'string.empty': 'This field is required'
    }),
  isDelivered: joi.boolean().required(),
  paymentOptions: joi.string().required(),
  total: joi.number().min(0),
  isPaid: joi.boolean().required(),
});
import Joi from 'joi';
import mongoose from 'mongoose';

const DateSchema = Joi.date().required();

export const isDate = (data: string) => {
  const { error } = DateSchema.validate(data);
  if (error) {
    return {};
  } else {
    return true;
  }
};

export const isValidObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
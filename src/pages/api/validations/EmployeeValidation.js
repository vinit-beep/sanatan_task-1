import Joi from "joi";

export const EmployeeValidationSchema = Joi.object({
  companyId: Joi.string(),
  name: Joi.string().alphanum().min(3).max(30).trim().required(),
  salary: Joi.number().required(),
  dob: Joi.date().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
});

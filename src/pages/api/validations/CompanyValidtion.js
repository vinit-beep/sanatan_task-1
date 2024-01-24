import Joi from "joi";

export const CompanyValidationSchema = Joi.object({
  company_name: Joi.string().alphanum().min(3).max(30).trim().required(),
  deleted_at: Joi.date(),
  updated_at: Joi.date(),
});

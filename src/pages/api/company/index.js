import { connectDB } from "@/database/dbConnection";
import { Company } from "@/database/model/CompanySchema";
import { CompanyValidationSchema } from "../validations/CompanyValidtion";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";

export default asyncErrorHandler(async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const company = await Company.find();
    res.status(201).json({
      status: true,
      data: company,
    });
  } else if (req.method === "POST") {
    const { company_name } = req.body;

    await CompanyValidationSchema.validateAsync(req.body);

    const company = new Company({
      company_name: company_name,
    });

    const saveCompany = await company.save();

    res.status(201).json({
      status: true,
      data: saveCompany,
    });

    res.status(200).json({ message: data });
  } else if (req.method === "PUT") {
    const { _id } = JSON.parse(req.body);
    const updateData = JSON.parse(req.body);
    const updatedata = await Company.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(201).json({
      status: true,
      data: updatedata,
    });
  } else if (req.method === "DELETE") {
    const { _id } = JSON.parse(req.body);

    const deleteddata = await Company.findByIdAndDelete(_id, {
      new: true,
    });
    res.status(201).json({
      status: true,
      data: deleteddata,
    });
  }
});

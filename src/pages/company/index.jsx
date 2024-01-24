import InputField from "@/components/shared/formElement/InputField";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@/components/shared/formElement/Button";
import { postApi } from "@/utils/axios";
const Company = () => {
  const [companyList, setCompanyList] = useState([]);
 
  const [formSate, setFormState] = useState({
    company_name: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const companyValidationSchema = yup.object({
    company_name: yup.string().trim().required(),
  });

  const editCompany = async (values) => {
    const formData = {
      company_name: values.company_name,
      _id: values._id,
    };
    const data = await fetch("/api/company", {
      method: "put",
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    setIsUpdate((prev) => !prev);
    setFormState({
      company_name: "",
    });
  };
  const DeleteCompany = async (values) => {
    console.log(values,"delete");
    const formData = {
      _id: values._id,
      
    };
    const data = await fetch("/api/company", {
      method: "delete",
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    setIsUpdate((prev) => !prev);
    alert("sucessfilly Deleted")
    
  };

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: formSate,
      enableReinitialize: true,
      validationSchema: companyValidationSchema,
      onSubmit: (values) => {
        if (formSate._id) {
          editCompany(values);
        } else if(formSate._id){
          DeleteCompany(values)

        }
        else {
          createCompany(values);
        }
      },
    });
  useEffect(() => {
    try {
      (async () => {
        const data = await fetch("/api/company");
        const res = await data.json();
        setCompanyList(res.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [isUpdate]);

  async function createCompany(values) {
    const response = await postApi("/api/company", values);
    if (response.status === 201) {
      setIsUpdate((prev) => !prev);
      alert("Company Added successfully");
    }
  }

  return (
    <div className="w-1/2 mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <InputField
          name={"company_name"}
          label={"Company Name"}
          value={values.company_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.company_name && errors.company_name
              ? errors.company_name
              : ""
          }
          required
        />

        <Button type="submit">Submit</Button>
      </form>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Company Name
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {companyList?.map((c) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.company_name}
                  </th>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => setFormState(c)}
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => DeleteCompany(c)}
                      class="ms-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Company;

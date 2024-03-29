import Button from '@/components/shared/formElement/Button';
import InputField from '@/components/shared/formElement/InputField';
import { postApi } from '@/utils/axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

const Employee = () => {
  const [companyList, setCompanyList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [formSate, setFormState] = useState({
    companyId: ' ',
    name: '',
    email: '',
    dob: null,
    phone: '',
    salary: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const data = await fetch('/api/company');
        const res = await data.json();
        setCompanyList(res.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [isUpdate]);

  useEffect(() => {
    try {
      (async () => {
        const emp = await fetch('/api/employee');
        const emp_res = await emp.json();
        console.log(emp_res, 'emp_res');
        setEmpList(emp_res.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [isUpdate]);

  const employeeValidationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    dob: yup.date().nullable().required('Date of birth is required'),
    phone: yup
      .string()
      .matches(/^(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number')
      .required('Phone is required')
  });

  const editEmployee = async (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      salary: values.salary,
      dob: values.dob,
      company_id: values.company_id,
      _id: values._id
    };
    const data = await fetch('/api/employee', {
      method: 'put',
      body: JSON.stringify(formData)
    });
    const res = await data.json();
    setIsUpdate((prev) => !prev);
    setFormState({
      companyId: '',
      name: '',
      email: '',
      phone: '',
      dob: '',
      salary: ''
    });
  };
  const DeleteEmployee = async (values) => {
    const formData = {
      _id: values._id
    };
    const data = await fetch('/api/employee', {
      method: 'delete',
      body: JSON.stringify(formData)
    });
    const res = await data.json();
    setIsUpdate((prev) => !prev);
    alert('Employee Deleted Successfully');
    setFormState({
      companyId: '',
      name: '',
      email: '',
      phone: '',
      dob: '',
      salary: ''
    });
  };
  const { errors, values, handleBlur, handleChange, handleSubmit, touched, resetForm } = useFormik({
    initialValues: formSate,
    validationSchema: employeeValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);

      if (formSate._id) {
        editEmployee(values);
        alert('Employee Edited Successfully');
      } else if (formSate._id) {
        DeleteEmployee(values);
      } else {
        createEmployee(values);
      }
    }
  });

  async function createEmployee(values) {
    const response = await postApi('/api/employee', values);
    if (response.status === 201) {
      setIsUpdate((prev) => !prev);
      resetForm();
      alert('Company Added successfully');
    }
  }
  const handleEdit = (c) => {
    setFormState({
      name: c.name,
      email: c.email,
      phone: c.phone,
      salary: c.salary,
      dob: new Date(c.dob).toISOString().split('T')[0],
      companyId: c.company_id._id,
      _id: c._id
    });
  };

  return (
    <div className="mx-auto mt-10">
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
            Company Name{' '}
          </label>
          <select
            name={'companyId'}
            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            value={values.companyId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyId && errors.companyId ? errors.companyId : ''}>
            <option value=" ">-- select company</option>
            {companyList.map((c) => {
              return <option value={c._id}>{c.company_name}</option>;
            })}
          </select>
        </div>
        <InputField
          name={'name'}
          label={'Name'}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name ? errors.name : ''}
          required
        />
        <InputField
          name={'email'}
          label={'Email'}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email ? errors.email : ''}
          required
        />
        <InputField
          name={'phone'}
          label={'Phone'}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone ? errors.phone : ''}
          required
        />
        <InputField
          type="date"
          name={'dob'}
          label={'DOB'}
          value={values.dob}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dob && errors.dob ? errors.dob : ''}
          required
        />
        <InputField
          type="number"
          name={'salary'}
          label={'Salary'}
          value={values.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.salary && errors.salary ? errors.salary : ''}
          required
        />

        <Button type="submit">Submit</Button>
      </form>
      {empList.length > 0 && (
        <table class="w-2/3 mx-auto mt-5 border  text-sm text-left rtl:text-right dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                DOB
              </th>
              <th scope="col" class="px-6 py-3">
                Salary
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {empList &&
              empList.map((c) => {
                const dob = new Date(c.dob);
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {c.name}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {c.email}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {c.phone}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {`${dob.getDay()}-${dob.getMonth() + 1}-${dob.getFullYear()}`}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {c.salary}
                    </th>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => handleEdit(c)}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        edit
                      </button>
                      <button
                        onClick={() => DeleteEmployee(c)}
                        class="ms-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employee;

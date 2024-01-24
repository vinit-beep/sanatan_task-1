import Table from "@/components/shared/table/Table";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const Dashboard = () => {
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(
    "65b005a2d5347d9ee74420f2"
  );
  const [employeeData, setEmployeeData] = useState({
    highest: [],
    secondHeight: [],
  });

  const getMaxSalary = async () => {
    const data = await fetch("/api/employee/" + selectedCompany);
    const res = await data.json();
    setEmployeeData(res.data);

    console.log(res);
  };

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
  }, []);

  useEffect(() => {
    getMaxSalary();
  }, [selectedCompany]);

  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className=" mt-3 ms-3">
          <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
            Select Company Name{" "}
          </label>

            <select
              name={"company_id"}
              className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value=" ">-- select company</option>
              {companyList.map((c) => {
                return <option value={c._id}>{c.company_name}</option>;
              })}
            </select>
          </div>
          <div>
            {" "}
            <h1 className="font-bold mt-5">Highest</h1>
            <Table data={employeeData.highest}></Table>
          </div>
          <div className="font-bold mt-5">
            {" "}
            <h1>Second Highest</h1>
            <Table data={employeeData.secondHeight}></Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

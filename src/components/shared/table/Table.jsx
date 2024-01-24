import React from "react";

const heading = ["Employee Name", "Company Name", "salary"];

const Table = ({data}) => {
  console.log(data);
  return (
    <div className="mt-5">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heading.map((e) => {
              return (
                <th scope="row" class="px-6 py-3">
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data&&data?.map((d)=>{return (
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {d.name}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
               {d.companyName}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
             {d.salary}
            </th>
          </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

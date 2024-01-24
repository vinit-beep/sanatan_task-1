import React from 'react';

const heading = ['Employee Name', 'Company Name', 'salary'];

const Table = ({ data }) => {
  return (
    <div className="mt-5">
      <table class="w-full text-sm border text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white bg-black uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heading.map((e) => {
              return (
                <th scope="row" class="px-6 py-3 border">
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((d) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border">
                    {d.name}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border">
                    {d.companyName}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border">
                    {d.salary}
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

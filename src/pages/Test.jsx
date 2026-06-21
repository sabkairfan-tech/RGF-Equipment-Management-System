import { useState } from "react";

export default function Test() {

    const [model , setModel] = useState(false);


    
  return (
<>
{/* HEADER */}

<div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Test</h2>


</div>

<div className="flex flex-col items-center justify-center h-full">
<table className="w-full table-fixed  bg-white shadow overflow-hidden">
<thead className="bg-gray-100">
    <tr>
        <th className="p-3">
            Serial No
        </th>
        <th>
            Name
        </th>
        <th>
            Phone
        </th>
    </tr>

</thead>
<tbody>
      <tr className="text-center border-b">
        <td className=" p-3">1</td>
        <td className=" p-3">Ali</td>
        <td className=" p-3">123456789</td>
      </tr>
        <tr className="text-center border-b">
        <td className=" p-3">1</td>
        <td className=" p-3">Ali</td>
        <td className=" p-3">123456789</td>
      </tr>
            <tr className="text-center border-b">
        <td className=" p-3">1</td>
        <td className=" p-3">Ali</td>
        <td className=" p-3">123456789</td>
      </tr>
    </tbody>



</table>

</div>

</>


  );
}



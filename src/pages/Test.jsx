import { useState } from "react";

export default function Test() {

    const [showModel , setModel] = useState(false);

    const [editId, setEditId] = useState(null);


const [form , setForm] = useState({
    serialNo: "",
    name: "",
    category: "",
    status: "Available",
    
    
});

// Open Edit Modal
  const openEditModal = (item) => {
    setForm(item);
    setEditId(item.id);
    setModal(true);
  };

  const openAddModal = () => {
    setForm({ serialNo: "", name: "", category: "", status: "Available" });
    setEditId(null);
    setModel(true);
  };
    
  return (
<>
{/* HEADER */}

<div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Test</h2>
<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openAddModal}>
Assign Equipment
</button>

</div>

<div className="flex justify-center ">
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
 {/* MODAL */}
      {showModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="w-[90%] max-w-[800px] bg-white p-6 rounded-lg shadow-xl">
    
    <h2 className="text-xl font-bold mb-6 text-center">
      {editId ? "Edit Equipment" : "Add Equipment"}
    </h2>

    <div className="flex flex-col gap-3">
      
      <input
        className="w-full border p-2 rounded"
        placeholder="Serial No"
        value={form.serialNo}
        onChange={(e) =>
          setForm({ ...form, serialNo: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <select
        className="w-full border p-2 rounded"
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Available</option>
        <option>Assigned</option>
        <option>Repair</option>
      </select>

    </div>

    <div className="flex justify-center gap-3 mt-6">
      <button
        onClick={() => setModel(false)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Cancel
      </button>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save
      </button>
    </div>

  </div>
</div>
      )}
</>


  );
}



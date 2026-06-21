import { useState } from "react";

export default function Equipment() {
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      serialNo: "LAP-001",
      name: "Dell Laptop",
      category: "Laptop",
      status: "Available",
    },
    {
      id: 2,
      serialNo: "CAM-010",
      name: "Canon Camera",
      category: "Camera",
      status: "Assigned",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    serialNo: "",
    name: "",
    category: "",
    status: "Available",
    
    
  });

  // Open Add Modal
  const openAddModal = () => {
    setForm({ serialNo: "", name: "", category: "", status: "Available" });
    setEditId(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowModal(true);
  };

  // Save (Add / Update)
  const handleSave = () => {
    if (editId) {
      setEquipment((prev) =>
        prev.map((item) => (item.id === editId ? form : item))
      );
    } else {
      setEquipment([
        ...equipment,
        { ...form, id: Date.now() },
      ]);
    }
    setShowModal(false);
  };

  // Delete
  const handleDelete = (id) => {
    setEquipment(equipment.filter((item) => item.id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Equipment</h2>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Equipment
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow ">
        <table className="w-full text-left">
          <thead className="bg-gray-400 ">
            <tr>
              <th className="p-3">Serial No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {equipment.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.serialNo}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="flex gap-2 p-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center">
          <div className="bg-white p-6 rounded w-400">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Equipment" : "Add Equipment"}
            </h2>

            <input
              className="w-lg border p-2 mb-2"
              placeholder="Serial No"
              value={form.serialNo}
              onChange={(e) =>
                setForm({ ...form, serialNo: e.target.value })
              }
            />

            <input
              className="w-lg  border p-2 mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-lg  border p-2 mb-2"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value }) 
              }
            />

            <select
              className="w-lg  border p-2 mb-4"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Available</option>
              <option>Assigned</option>
              <option>Repair</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
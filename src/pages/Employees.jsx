import { useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      empNo: "EMP001",
      name: "Muhammad Ali",
      department: "Production",
      phone: "03001234567",
    },
    {
      id: 2,
      empNo: "EMP002",
      name: "Usama Khan",
      department: "Maintenance",
      phone: "03111222333",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    empNo: "",
    name: "",
    department: "",
    phone: "",
  });

  // OPEN ADD
  const openAdd = () => {
    setForm({ empNo: "", name: "", department: "", phone: "" });
    setEditId(null);
    setShowModal(true);
  };

  // OPEN EDIT
  const openEdit = (emp) => {
    setForm(emp);
    setEditId(emp.id);
    setShowModal(true);
  };

  // SAVE
  const handleSave = () => {
    if (editId) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editId ? form : e))
      );
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
  };

  // DELETE
  const handleDelete = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>

        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Emp No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.empNo}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.phone}</td>

                <td className="flex gap-2 p-3">
                  <button
                    onClick={() => openEdit(emp)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-400">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Employee" : "Add Employee"}
            </h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Employee No"
              value={form.empNo}
              onChange={(e) =>
                setForm({ ...form, empNo: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

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
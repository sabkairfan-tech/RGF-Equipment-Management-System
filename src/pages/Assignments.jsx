import React, { useState } from "react";

const AssignmentPage = () => {
  const [openModal, setOpenModal] = useState(false);

  // MAIN LIST (final assigned records)
  const [assignments, setAssignments] = useState([
    {
      id: "ASG001",
      employee: "EMP001 - Ali",
      equipment: "EQP001 - GPS",
      date: "2026-06-15",
      status: "Assigned",
    },
  ]);

  // SEARCH
  const [searchEmp, setSearchEmp] = useState("");
  const [searchEqp, setSearchEqp] = useState("");

  // FORM
  const [employee, setEmployee] = useState("");
  const [equipment, setEquipment] = useState("");
  const [date, setDate] = useState("");

  // DRAFT ITEMS (multi equipment per employee)
  const [draftItems, setDraftItems] = useState([]);

  // ➕ Add to Draft
  const addToDraft = () => {
    if (!employee || !equipment) {
      return alert("Employee & Equipment required");
    }

    const newItem = {
      id: Date.now(),
      employee,
      equipment,
      date: date || new Date().toISOString().split("T")[0],
    };

    setDraftItems([...draftItems, newItem]);

    setEquipment(""); // reset only equipment for fast entry
  };

  // ❌ Remove Draft
  const removeDraft = (id) => {
    setDraftItems(draftItems.filter((d) => d.id !== id));
  };

  // ✅ Final Assign
  const assignAll = () => {
    if (draftItems.length === 0) {
      return alert("No draft items to assign");
    }

    const newAssignments = draftItems.map((d, index) => ({
      id: "ASG" + (assignments.length + index + 1),
      employee: d.employee,
      equipment: d.equipment,
      date: d.date,
      status: "Assigned",
    }));

    setAssignments([...assignments, ...newAssignments]);
    setDraftItems([]);
    setOpenModal(false);
  };

  // 🔎 FILTER
  const filtered = assignments.filter((a) => {
    return (
      a.employee.toLowerCase().includes(searchEmp.toLowerCase()) &&
      a.equipment.toLowerCase().includes(searchEqp.toLowerCase())
    );
  });

  return (
    <div className="p-6 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assignments</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Assignment
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex gap-3 mb-4">

        <input
          className="border p-2 rounded w-1/3"
          placeholder="Search Employee No"
          value={searchEmp}
          onChange={(e) => setSearchEmp(e.target.value)}
        />

        <input
          className="border p-2 rounded w-1/3"
          placeholder="Search Equipment No"
          value={searchEqp}
          onChange={(e) => setSearchEqp(e.target.value)}
        />

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Equipment</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.employee}</td>
                <td className="p-3">{a.equipment}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20">

          <div className="bg-white w-500px p-6 rounded-xl shadow-lg relative">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">
              Create Assignment (Draft Mode)
            </h2>

            {/* INPUTS */}
            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Employee No (e.g EMP001)"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-2 rounded"
              placeholder="Equipment No (e.g EQP001)"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-2 mb-3 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* ADD TO DRAFT */}
            <button
              onClick={addToDraft}
              className="w-full bg-blue-500 text-white py-2 rounded mb-3"
            >
              + Add to Draft
            </button>

            {/* DRAFT LIST */}
            <div className="max-h-40 overflow-y-auto border rounded p-2 mb-3">

              {draftItems.length === 0 ? (
                <p className="text-sm text-gray-500">No draft items</p>
              ) : (
                draftItems.map((d) => (
                  <div
                    key={d.id}
                    className="flex justify-between items-center border-b py-1"
                  >
                    <span className="text-sm">
                      {d.employee} → {d.equipment}
                    </span>

                    <button
                      onClick={() => removeDraft(d.id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}

            </div>

            {/* FINAL BUTTON */}
            <button
              onClick={assignAll}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Assign All
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default AssignmentPage;
import React, { useState } from "react";

const AssignmentPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: "ASG001",
      employee: "EMP001 - Ali",
      equipment: "EQP001 - GPS",
      date: "2026-06-15",
      status: "Assigned",
    },
  ]);

  const [searchEmp, setSearchEmp] = useState("");
  const [searchEqp, setSearchEqp] = useState("");
  const [employee, setEmployee] = useState("");
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [equipment, setEquipment] = useState("");
  const [equipmentQuery, setEquipmentQuery] = useState("");
  const [date, setDate] = useState("");
  const [draftItems, setDraftItems] = useState([]);

  const employees = [
    { value: "EMP001 - Ali", label: "EMP001 - Ali" },
    { value: "EMP002 - Usama", label: "EMP002 - Usama" },
    { value: "EMP003 - Sara", label: "EMP003 - Sara" },
  ];

  const equipmentOptions = [
    { value: "EQP001 - GPS", label: "EQP001 - GPS", status: "Available" },
    { value: "EQP002 - Camera", label: "EQP002 - Camera", status: "Available" },
    { value: "EQP003 - Tablet", label: "EQP003 - Tablet", status: "Assigned" },
    { value: "EQP004 - Printer", label: "EQP004 - Printer", status: "Available" },
  ];

  const availableEquipment = equipmentOptions.filter((item) => item.status === "Available");

  const filteredEmployees = employees.filter((item) =>
    item.label.toLowerCase().includes(employeeQuery.toLowerCase())
  );

  const filteredEquipment = availableEquipment.filter((item) =>
    item.label.toLowerCase().includes(equipmentQuery.toLowerCase())
  );

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
    setEquipment("");
  };

  const removeDraft = (id) => {
    setDraftItems(draftItems.filter((d) => d.id !== id));
  };

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

  const filtered = assignments.filter((a) => {
    return (
      a.employee.toLowerCase().includes(searchEmp.toLowerCase()) &&
      a.equipment.toLowerCase().includes(searchEqp.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Operations Hub</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Assignments</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Track equipment handovers with a clean, modern workflow and quick assignment creation.
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.01]"
            >
              + Add Assignment
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-700">Total Assignments</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{assignments.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-700">Active Records</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{assignments.filter((a) => a.status === "Assigned").length}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">Pending Drafts</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{draftItems.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Assignment List</h2>
              <p className="text-sm text-slate-500">Filter and review each equipment assignment quickly.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:w-56"
                placeholder="Search employee"
                value={searchEmp}
                onChange={(e) => setSearchEmp(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:w-56"
                placeholder="Search equipment"
                value={searchEqp}
                onChange={(e) => setSearchEqp(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">ID</th>
                  <th className="px-5 py-3 font-semibold">Employee</th>
                  <th className="px-5 py-3 font-semibold">Equipment</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100 bg-white hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-slate-700">{a.id}</td>
                    <td className="px-5 py-3">{a.employee}</td>
                    <td className="px-5 py-3">{a.equipment}</td>
                    <td className="px-5 py-3">{a.date}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 px-6 py-6 text-white sm:px-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-200">New Assignment</p>
                  <h2 className="mt-2 text-2xl font-semibold">Create Assignment</h2>
                  <p className="mt-2 text-sm text-slate-300">Add a complete handover request with a polished, guided workflow.</p>
                </div>
                <button onClick={() => setOpenModal(false)} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white">1</div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">Assignment Details</h3>
                      <p className="text-xs text-slate-500">Pick the employee, equipment, and date.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">Employee</label>
                      <div className="relative">
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          placeholder="Type to find employee"
                          value={employeeQuery}
                          onChange={(e) => {
                            setEmployeeQuery(e.target.value);
                            setEmployee("");
                          }}
                        />
                        <div className="mt-2 max-h-40 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                          {filteredEmployees.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-slate-500">No employee found</div>
                          ) : (
                            filteredEmployees.map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => {
                                  setEmployee(item.value);
                                  setEmployeeQuery(item.label);
                                }}
                                className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                {item.label}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">Equipment</label>
                      <div className="relative">
                        <input
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          placeholder="Type to find equipment"
                          value={equipmentQuery}
                          onChange={(e) => {
                            setEquipmentQuery(e.target.value);
                            setEquipment("");
                          }}
                        />
                        <div className="mt-2 max-h-40 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                          {filteredEquipment.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-slate-500">No available equipment found</div>
                          ) : (
                            filteredEquipment.map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => {
                                  setEquipment(item.value);
                                  setEquipmentQuery(item.label);
                                }}
                                className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                {item.label}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-600">Assignment Date</label>
                      <input
                        type="date"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <button onClick={addToDraft} className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                    + Add to Draft
                  </button>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white">2</div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">Draft Queue</h3>
                      <p className="text-xs text-slate-500">Review and confirm your pending assignments.</p>
                    </div>
                  </div>

                  <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                    {draftItems.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-3 py-5 text-center text-sm text-slate-500">
                        No draft items yet.
                      </div>
                    ) : (
                      draftItems.map((d) => (
                        <div key={d.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{d.employee}</p>
                            <p className="text-xs text-slate-500">{d.equipment}</p>
                          </div>
                          <button onClick={() => removeDraft(d.id)} className="text-sm font-semibold text-rose-500 transition hover:text-rose-600">
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-800">Ready to assign</h3>
                    <p className="text-sm text-emerald-700">{draftItems.length} pending item(s) will be added to the assignment list.</p>
                  </div>
                  <button onClick={assignAll} className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                    Assign All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentPage;
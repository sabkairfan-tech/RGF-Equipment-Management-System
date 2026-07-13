import { useState } from "react";

const emptyForm = {
  employeeId: "",
  name: "",
  email: "",
  contactNumber: "",
  iqamaNumber: "",
  iqamaExpiryDate: "",
  passportNumber: "",
  passportExpiryDate: "",
  drivingLicenseNumber: "",
  drivingLicenseExpiryDate: "",
  designation: "",
  department: "",
  joiningDate: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  address: "",
  profileImage: "",
  status: "Active",
  remarks: "",
};

const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Muhammad Ali",
    designation: "Production Supervisor",
    department: "Production",
    contactNumber: "03001234567",
    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Usama Khan",
    designation: "Maintenance Engineer",
    department: "Maintenance",
    contactNumber: "03111222333",
    status: "Active",
  },
];

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setForm({ ...emptyForm, ...emp });
    setEditId(emp.id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (editId) {
      setEmployees((prev) =>
        prev.map((employee) => (employee.id === editId ? { ...employee, ...form } : employee))
      );
    } else {
      setEmployees((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  const handlePrint = (employee) => {
    const printWindow = window.open("", "_blank", "width=900,height=1100");

    if (!printWindow) {
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Record - ${employee.name || "Employee"}</title>
          <style>
            body {
              margin: 0;
              padding: 24px;
              font-family: Arial, sans-serif;
              background: #fff;
              color: #0f172a;
            }
            .card {
              max-width: 794px;
              margin: 0 auto;
              border: 1px solid #cbd5e1;
              border-radius: 16px;
              padding: 24px;
              box-sizing: border-box;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 16px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              margin: 4px 0 0;
            }
            .subtitle {
              color: #64748b;
              margin-top: 4px;
            }
            .photo {
              width: 96px;
              height: 96px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              object-fit: cover;
              background: #f8fafc;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
              margin-top: 16px;
            }
            .box {
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 12px;
            }
            .label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.2em;
              color: #64748b;
            }
            .value {
              margin-top: 6px;
              font-weight: 600;
            }
            .full {
              grid-column: 1 / -1;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div>
                <div class="label">Employee Record</div>
                <div class="title">${employee.name || "Employee Profile"}</div>
                <div class="subtitle">${employee.designation || "—"}</div>
              </div>
              <img class="photo" src="${employee.profileImage || ""}" alt="${employee.name || "Employee"}" />
            </div>
            <div class="grid">
              <div class="box"><div class="label">Employee ID</div><div class="value">${employee.employeeId || "—"}</div></div>
              <div class="box"><div class="label">Department</div><div class="value">${employee.department || "—"}</div></div>
              <div class="box"><div class="label">Email</div><div class="value">${employee.email || "—"}</div></div>
              <div class="box"><div class="label">Contact Number</div><div class="value">${employee.contactNumber || "—"}</div></div>
              <div class="box"><div class="label">Gender</div><div class="value">${employee.gender || "—"}</div></div>
              <div class="box"><div class="label">Status</div><div class="value">${employee.status || "Active"}</div></div>
              <div class="box"><div class="label">Iqama Number</div><div class="value">${employee.iqamaNumber || "—"}</div></div>
              <div class="box"><div class="label">Iqama Expiry</div><div class="value">${employee.iqamaExpiryDate || "—"}</div></div>
              <div class="box"><div class="label">Passport Number</div><div class="value">${employee.passportNumber || "—"}</div></div>
              <div class="box"><div class="label">Driving License Number</div><div class="value">${employee.drivingLicenseNumber || "—"}</div></div>
              <div class="box full"><div class="label">Address</div><div class="value">${employee.address || "—"}</div></div>
              <div class="box full"><div class="label">Remarks</div><div class="value">${employee.remarks || "—"}</div></div>
            </div>
          </div>
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-100">HR Portal</p>
          <h2 className="text-2xl font-semibold">Employees</h2>
          <p className="mt-1 text-sm text-blue-100">Manage employee profiles with a clear, modern form.</p>
        </div>

        <button
          onClick={openAdd}
          className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-md transition hover:scale-[1.02]"
        >
          + Add Employee
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-800">Employee Directory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-semibold">Employee ID</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-700">{employee.employeeId || "—"}</td>
                  <td className="px-5 py-3">{employee.name}</td>
                  <td className="px-5 py-3">{employee.department || "—"}</td>
                  <td className="px-5 py-3">{employee.contactNumber || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {employee.status || "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEdit(employee)}
                        className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handlePrint(employee)}
                        className="rounded-xl bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        Print
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="rounded-t-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-300">Employee Profile</p>
                  <h2 className="mt-1 text-2xl font-semibold">{editId ? "Edit Employee" : "Add Employee"}</h2>
                  <p className="mt-1 text-sm text-slate-300">Fill in the details below to register a new employee.</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:space-y-6 sm:p-6 lg:p-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Employee ID</label>
                    <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="EMP001" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Designation</label>
                    <input name="designation" value={form.designation} onChange={handleChange} placeholder="Senior Engineer" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Department</label>
                    <input name="department" value={form.department} onChange={handleChange} placeholder="Operations" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="employee@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Contact Number</label>
                    <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="0501234567" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Joining Date</label>
                    <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Identification & Documents</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Iqama Number</label>
                    <input name="iqamaNumber" value={form.iqamaNumber} onChange={handleChange} placeholder="Iqama number" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Iqama Expiry</label>
                    <input type="date" name="iqamaExpiryDate" value={form.iqamaExpiryDate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Passport Number</label>
                    <input name="passportNumber" value={form.passportNumber} onChange={handleChange} placeholder="Passport number" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Passport Expiry</label>
                    <input type="date" name="passportExpiryDate" value={form.passportExpiryDate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Driving License No.</label>
                    <input name="drivingLicenseNumber" value={form.drivingLicenseNumber} onChange={handleChange} placeholder="License number" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">License Expiry</label>
                    <input type="date" name="drivingLicenseExpiryDate" value={form.drivingLicenseExpiryDate} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Address & Status</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Nationality</label>
                    <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Saudi" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Employee Photo</label>
                    <input type="file" accept="image/*" name="profileImage" onChange={handleFileChange} className={inputClass} />
                    {form.profileImage && (
                      <img
                        src={form.profileImage}
                        alt="Employee preview"
                        className="mt-3 h-24 w-24 rounded-2xl object-cover border border-slate-200"
                      />
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Resigned">Resigned</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 xl:col-span-3">
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Address</label>
                    <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter full address" rows="3" className={inputClass} />
                  </div>
                  <div className="md:col-span-2 xl:col-span-3">
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">Remarks</label>
                    <textarea name="remarks" value={form.remarks} onChange={handleChange} placeholder="Additional notes" rows="3" className={inputClass} />
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
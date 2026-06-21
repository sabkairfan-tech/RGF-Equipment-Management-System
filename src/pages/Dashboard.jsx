import { useMemo } from "react";

export default function Dashboard() {
  // Dummy data (later from API)
  const equipment = [
    { status: "Available" },
    { status: "Assigned" },
    { status: "Assigned" },
    { status: "Repair" },
  ];

  const employees = [1, 2, 3];

  const stats = useMemo(() => {
    return {
      total: equipment.length,
      available: equipment.filter((e) => e.status === "Available").length,
      assigned: equipment.filter((e) => e.status === "Assigned").length,
      repair: equipment.filter((e) => e.status === "Repair").length,
      employees: employees.length,
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-5 gap-4">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Equipment</p>
          <h3 className="text-2xl font-bold">{stats.total}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p>Available</p>
          <h3 className="text-2xl font-bold">{stats.available}</h3>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p>Assigned</p>
          <h3 className="text-2xl font-bold">{stats.assigned}</h3>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p>Repair</p>
          <h3 className="text-2xl font-bold">{stats.repair}</h3>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <p>Employees</p>
          <h3 className="text-2xl font-bold">{stats.employees}</h3>
        </div>

      </div>
    </div>
  );
}
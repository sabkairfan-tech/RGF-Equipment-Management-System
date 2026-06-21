import { useState, useMemo } from "react";

export default function Returns() {
  // Dummy data (same structure as Assignments page)
  const [assignments] = useState([
    {
      id: 1,
      employee: "EMP001 - Muhammad Ali",
      equipment: "LAP-001 - Dell Laptop",
      assignDate: "01-Jun-2026",
      returnDate: "05-Jun-2026",
      status: "Returned",
      condition: "Good",
    },
    {
      id: 2,
      employee: "EMP002 - Usama Khan",
      equipment: "CAM-010 - Canon Camera",
      assignDate: "02-Jun-2026",
      returnDate: "",
      status: "Assigned",
      condition: "",
    },
    {
      id: 3,
      employee: "EMP001 - Muhammad Ali",
      equipment: "MOU-005 - Mouse",
      assignDate: "03-Jun-2026",
      returnDate: "06-Jun-2026",
      status: "Returned",
      condition: "Damaged",
    },
  ]);

  const [search, setSearch] = useState("");

  // FILTER ONLY RETURNED ITEMS
  const returnedItems = useMemo(() => {
    return assignments.filter(
      (a) =>
        a.status === "Returned" &&
        (
          a.employee.toLowerCase().includes(search.toLowerCase()) ||
          a.equipment.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [assignments, search]);

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Returns</h2>

        <input
          className="border p-2 w-1/3"
          placeholder="Search returns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Employee</th>
              <th>Equipment</th>
              <th>Assign Date</th>
              <th>Return Date</th>
              <th>Condition</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {returnedItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No returned equipment found
                </td>
              </tr>
            ) : (
              returnedItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.employee}</td>
                  <td>{item.equipment}</td>
                  <td>{item.assignDate}</td>
                  <td>{item.returnDate}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.condition === "Damaged"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.condition || "N/A"}
                    </span>
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      Returned
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
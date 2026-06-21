export default function Topbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Equipment Management System</h1>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">Logged in as:</div>
        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          Admin
        </div>
      </div>
    </div>
  );
}
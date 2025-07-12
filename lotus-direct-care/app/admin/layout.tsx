export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="space-x-4">
              <a href="/admin/leads" className="text-gray-600 hover:text-gray-900">
                Leads
              </a>
              <a href="/admin/research/diagnostics" className="text-gray-600 hover:text-gray-900">
                Research Diagnostics
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
/**
 * Placeholder for the main Dashboard page.
 */
export default function HomePage() {
  return (
    <div className="w-full h-full">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary-text">Dashboard</h1>
        <p className="mt-2 text-secondary-text">Welcome back, here's a summary of your business.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border border-gray-800 bg-[#1C1C1E] p-6">
            <h2 className="text-lg font-semibold text-primary-text">Metric {index + 1}</h2>
            <p className="mt-2 text-4xl font-bold text-sky-400">1,234</p>
            <p className="mt-1 text-sm text-secondary-text">+5.4% from last month</p>
          </div>
        ))}
      </div>
        <div className="mt-8 rounded-lg border border-gray-800 bg-[#1C1C1E] p-6 h-96">
            <h2 className="text-lg font-semibold text-primary-text">Data Visualization</h2>
            <div className="flex items-center justify-center h-full text-secondary-text">
                <p>Chart or data table would go here.</p>
            </div>
        </div>
    </div>
  );
}


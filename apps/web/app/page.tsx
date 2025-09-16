/**
 * Placeholder for the main Dashboard page.
 */
export default function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-primary-text text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-secondary-text mt-2">
          Welcome back, here&apos;s a summary of your business.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-800 bg-[#1C1C1E] p-6"
          >
            <h2 className="text-primary-text text-lg font-semibold">
              Metric {index + 1}
            </h2>
            <p className="mt-2 text-4xl font-bold text-sky-400">1,234</p>
            <p className="text-secondary-text mt-1 text-sm">
              +5.4% from last month
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 h-96 rounded-lg border border-gray-800 bg-[#1C1C1E] p-6">
        <h2 className="text-primary-text text-lg font-semibold">
          Data Visualization
        </h2>
        <div className="text-secondary-text flex h-full items-center justify-center">
          <p>Chart or data table would go here.</p>
        </div>
      </div>
    </div>
  );
}

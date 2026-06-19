import GoToMainButton from "@/components/shared/buttons/GoToMainButton";

export default function HomePage() {
  return (
    <div className="relative min-h-screen max-w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Discover Amazing React Components
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-xl">
          A curated collection of beautiful, reusable, and production-ready
          components for your next project.
        </p>

        <GoToMainButton />
      </main>
    </div>
  );
}

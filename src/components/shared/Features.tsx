// components/Features.tsx
export default function Features() {
    return (
      <section className="grid gap-6 md:grid-cols-3 p-10">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Fast</h2>
          <p>All components are optimized for speed and performance.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Customizable</h2>
          <p>Each component is built with flexibility in mind.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Responsive</h2>
          <p>Looks great on all devices, from mobile to desktop.</p>
        </div>
      </section>
    )
  }
  
export default function Hero() {
  return (
    <section className="relative py-16 md:py-20 text-center">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20
        [background-image:linear-gradient(to_right,#1f1f1f_1px,transparent_1px),
        linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]
        [background-size:42px_42px]"
      />

      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        <span className="text-white">Philip Luigi </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
          Garcia
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-neutral-300">
        Welcome to my digital portfolio, where I showcase my resume, internship
        learning, academic work, and personal reflections throughout my journey.
      </p>
    </section>
  );
}

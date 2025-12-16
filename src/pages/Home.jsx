import DocsLayout from "../components/DocsLayout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const track = document.getElementById("carousel-track");
    const next = document.getElementById("carousel-next");
    const prev = document.getElementById("carousel-prev");

    if (!track || !next || !prev) return;

    let index = 0;

    const getSlideWidth = () => {
      const slide = track.children[0];
      const rect = slide.getBoundingClientRect();
      const gap = parseInt(window.getComputedStyle(track).gap || 0);
      return rect.width + gap;
    };

    const getMaxIndex = () => {
      const slideWidth = getSlideWidth();
      const containerWidth = track.parentElement.offsetWidth;
      const visibleSlides = Math.floor(containerWidth / slideWidth);
      return Math.max(0, track.children.length - visibleSlides);
    };

    const update = () => {
      const slideWidth = getSlideWidth();
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      updateArrows();
    };

    const updateArrows = () => {
      const maxIndex = getMaxIndex();
      prev.style.opacity = index === 0 ? "0.3" : "1";
      next.style.opacity = index === maxIndex ? "0.3" : "1";
    };

    next.onclick = () => {
      const maxIndex = getMaxIndex();
      if (index < maxIndex) {
        index++;
        update();
      }
    };

    prev.onclick = () => {
      if (index > 0) {
        index--;
        update();
      }
    };

    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const capstoneSlides = Array.from(
      document.querySelectorAll(".lightbox-trigger")
    );
    const altSlides = Array.from(
      document.querySelectorAll(".lightbox-trigger-alt")
    );

    const modal = document.getElementById("lightbox-modal");
    const img = document.getElementById("lightbox-img");

    const btnClose = document.getElementById("lightbox-close");
    const btnNext = document.getElementById("lightbox-next");
    const btnPrev = document.getElementById("lightbox-prev");

    let currentIndex = 0;
    let isCapstone = false;

    const openLightbox = (fullSrc, index, capstoneMode) => {
      isCapstone = capstoneMode;
      currentIndex = index;
      img.src = fullSrc;
      updateArrows();

      // Show/hide navigation buttons depending on source
      if (isCapstone) {
        btnNext.style.display = "flex";
        btnPrev.style.display = "flex";
      } else {
        btnNext.style.display = "none";
        btnPrev.style.display = "none";
      }

      modal.classList.remove("hidden");
    };

    const closeLightbox = () => {
      modal.classList.add("hidden");
    };

    const showNext = () => {
      if (!isCapstone) return;
      if (currentIndex < capstoneSlides.length - 1) {
        currentIndex++;
        img.src = capstoneSlides[currentIndex].dataset.full;
        updateArrows();
      }
    };

    const showPrev = () => {
      if (!isCapstone) return;
      if (currentIndex > 0) {
        currentIndex--;
        img.src = capstoneSlides[currentIndex].dataset.full;
        updateArrows();
      }
    };

    const updateArrows = () => {
      btnPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
      btnNext.style.opacity =
        currentIndex === capstoneSlides.length - 1 ? "0.3" : "1";
    };

    // Capstone images (with navigation)
    capstoneSlides.forEach((slide, index) => {
      slide.onclick = () => openLightbox(slide.dataset.full, index, true);
    });

    // Alternating rows images (no navigation)
    altSlides.forEach((slide) => {
      slide.onclick = () => openLightbox(slide.dataset.full, 0, false);
    });

    btnClose.onclick = closeLightbox;
    btnNext.onclick = showNext;
    btnPrev.onclick = showPrev;

    modal.onclick = (e) => {
      if (e.target === modal) closeLightbox();
    };
  }, []);

  return (
    <DocsLayout
      sections={[
        { id: "about-me", label: "About Me" },
        { id: "internship", label: "Internship Experience" },
        { id: "capstone", label: "Capstone Project Showcase" },
        { id: "reflections", label: "Reflections on College Life" },
      ]}
    >
      {/* HERO */}
      <section className="relative py-16 md:py-20 text-center">
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
          Welcome to my digital portfolio, where I showcase my resume,
          internship learning, academic work, and personal reflections
          throughout my journey.
        </p>
      </section>

      <div className="h-px w-full bg-neutral-800 my-16 md:my-24"></div>

      {/* ABOUT ME */}
      <section id="about-me" className="scroll-mt-24">
        <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>
        <h2 className="text-3xl font-semibold text-white mb-6">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* IMAGE */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <div className="relative w-[15rem] md:w-[16rem] aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-neutral-800 shadow-xl transition-all duration-300 hover:ring-emerald-500 hover:scale-[1.03]">
              <img
                src="https://drive.google.com/thumbnail?id=1PGou55ka28wmOofdW83IwogRkF8K8aMn&sz=w1600"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="md:col-span-9">
            <div className="space-y-5 text-neutral-300 leading-relaxed text-lg md:text-xl">
              <p>
                I’m Philip Luigi Garcia, a BS Information Systems student who
                loves building clean, modern, and efficient web interfaces.
              </p>

              <p>
                I aspire to learn new frameworks and tools that help me grow as
                a developer.
              </p>

              <p>
                I enjoy creating intuitive user interfaces, crafting smooth user
                experiences, and bringing concepts to life. I’m inspired to keep
                learning, developing, and improving every step of the way.
              </p>
            </div>

            {/* SKILLS */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Front-end",
                "Laravel + Inertia",
                "React",
                "Tailwind",
                "Python/Django",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200 transition hover:border-emerald-500 hover:text-emerald-500 hover:bg-neutral-800"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-800 my-16 md:my-24"></div>

      {/* INTERNSHIP */}
      <section id="internship" className="scroll-mt-24">
        <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>
        <h2 className="text-3xl font-semibold text-white mb-4">
          Internship Experience
        </h2>

        {/* Internship Role + Details */}
        <div className="space-y-2 mb-8">
          <p className="text-neutral-300 text-lg font-medium">
            <span className="text-emerald-400 font-semibold">
              Software Development Intern — Rakso CT
            </span>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-neutral-400 text-[0.95rem]">
            {/* Location */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>Makati City</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M3 18.75h18M3 18.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75"
                />
              </svg>
              <span>August 2025 – December 2025</span>
            </div>
          </div>
        </div>

        {/* Internship Bullet Points */}
        <div className="space-y-5 text-neutral-300 text-lg md:text-xl mb-10">
          <ul className="list-disc pl-6 marker:text-emerald-500 space-y-2">
            <li>
              <span className="text-white font-medium">
                CRM UI Development:
              </span>{" "}
              Worked on improving interface layouts, building components, and
              fixing UI issues.
            </li>
            <li>
              <span className="text-white font-medium">Event Hub Module:</span>{" "}
              Helped design and develop parts of the event management flow.
            </li>
            <li>
              <span className="text-white font-medium">
                Backend Contributions:
              </span>{" "}
              Assisted with Laravel routes and controllers.
            </li>
          </ul>
        </div>

        {/* Alternating Project Rows */}
        <div className="space-y-10">
          {[
            {
              title: "CRM",
              text: "Designed and refined the CRM interface, helping shape layouts, visual structure, and overall user flow. Contributed to improving clarity, consistency, and usability across the system.",
              img: "1bMFw8imNqB_94POX8y6rmqn969zFElhF",
              reverse: false,
            },
            {
              title: "Event Hub Module",
              text: "Contributed to the Event Hub module's wireframes and basic content planning. Helped create the user flow, page structure, and component layout to ensure the module was well-organized and intuitive.",
              img: "1-p1V32O-Hn6r-iGzyx8IvKjfg3KcNgxv",
              reverse: true,
            },
            {
              title: "BlockBot",
              text: "Planned and coordinated the BlockBot training series, handling logistics and participant onboarding for a comprehensive learning experience.",
              img: "1HLgHXuoPEwbtgJCTuLkP4yvYjitLmd5e",
              reverse: false,
            },
            {
              title: "EDTech-PAP Event",
              text: "Ensured participants had a seamless and well-organized registration process for the event. Contributed to updating participant details as needed.",
              img: "1Rst0zUi5M4L8XpyzOwL-LdlZxYYvoCtq",
              reverse: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 md:p-8"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* IMAGE */}
                <div
                  className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-black border border-neutral-800 shadow-xl hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]
hover:scale-[1.03] transition-all duration-300
 ${item.reverse ? "md:order-2" : "md:order-1"}`}
                >
                  <img
                    src={`https://drive.google.com/thumbnail?id=${item.img}&sz=w1600`}
                    data-full={`https://lh3.googleusercontent.com/d/${item.img}=w3000`}
                    className="lightbox-trigger-alt absolute inset-0 w-full h-full object-cover transition hover:scale-105 cursor-pointer"
                  />
                </div>

                {/* TEXT */}
                <div
                  className={`text-neutral-300 ${
                    item.reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="text-[0.75rem] tracking-[0.18em] uppercase text-emerald-400 mb-2">
                    Key Project
                  </div>
                  <h3 className="text-white font-semibold text-2xl md:text-3xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-neutral-800 my-16 md:my-24"></div>

      {/* CAPSTONE */}
      <section id="capstone" className="scroll-mt-24">
        <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>

        <h2 className="text-3xl font-bold text-white tracking-tight">
          Capstone Project Showcase
        </h2>

        <p className="text-neutral-400 mt-1 text-lg">
          A visual feature highlight of my capstone project.
        </p>

        {/* CAROUSEL */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-900/50 border border-neutral-800 p-6 shadow-xl backdrop-blur-sm mt-8">
          <div
            id="carousel-track"
            className="flex gap-6 transition-transform duration-700 ease-out"
          >
            {[
              "1XjHFfkpbE-Hr_q0Kx9VYRnNlWo94z2zy",
              "1rWNY3LHDLjRjfFGYTtTou9ytWUT4LpxP",
              "1VLjl38uJHkjCrNfg1v6reVkfkFyynWtN",
              "1Z1jKD4ZROnEESwXYq9awOCu_DLc4450d",
              "1HUK6xnccComgxs4EMDyFakxsuITahOrd",
            ].map((id, index) => {
              const full = `https://lh3.googleusercontent.com/d/${id}=w3000`;
              const thumb = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

              return (
                <div
                  key={index}
                  className="min-w-[80%] md:min-w-[55%] lg:min-w-[45%]
              aspect-[16/9] rounded-xl overflow-hidden bg-black
              border border-neutral-800 shadow-lg
              hover:border-emerald-400
              hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]
              hover:scale-[1.03]
              transition-all duration-300"
                >
                  <img
                    src={thumb}
                    data-full={full}
                    className="lightbox-trigger w-full h-full object-cover hover:scale-105 transition cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          {/* Carousel arrows */}
          <button
            id="carousel-prev"
            className="absolute left-4 top-1/2 -translate-y-1/2
        w-9 h-9 flex items-center justify-center
        text-neutral-300 bg-neutral-800/70 rounded-full shadow-md
        hover:bg-neutral-900 hover:border hover:border-emerald-500 hover:text-emerald-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            id="carousel-next"
            className="absolute right-4 top-1/2 -translate-y-1/2
        w-9 h-9 flex items-center justify-center
        text-neutral-300 bg-neutral-800/70 rounded-full shadow-md
        hover:bg-neutral-900 hover:border hover:border-emerald-500 hover:text-emerald-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* DESCRIPTION + ROLE */}
        <div
          className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8
      p-6 rounded-2xl border border-neutral-800
      bg-neutral-900/50 shadow-lg backdrop-blur-sm"
        >
          {/* LEFT — PROJECT DESCRIPTION */}
          <div>
            <h3 className="text-white text-2xl font-semibold mb-2">
              Capstone Project
            </h3>

            <p className="text-neutral-300 leading-relaxed max-w-4xl">
              <span className="font-semibold text-emerald-400">
                Smart Farming Solutions for Sustainable Urban Agriculture in
                Metro Manila
              </span>{" "}
              — A comprehensive capstone research and development project
              integrating IoT-driven sensor monitoring, automated crop
              recommendations, weather-based alerts, and a centralized
              management dashboard designed for urban farming environments.
            </p>

            <a
              href="https://docs.google.com/document/d/1JROX2M8LmWTzFDmfmpzff7HG2i9gyazN/edit?usp=sharing"
              target="_blank"
              className="inline-flex mt-5 items-center gap-2 px-5 py-3 rounded-xl
          border border-neutral-700 bg-neutral-900
          hover:border-emerald-500 hover:text-emerald-400 transition
          shadow-lg text-white"
            >
              Open Document →
            </a>
          </div>

          {/* RIGHT — ROLE & CONTRIBUTION */}
          <div className="relative rounded-xl p-5 bg-neutral-900/60 border border-neutral-800">
            <div
              className="absolute -top-[1px] left-0 w-full h-[2px]
          bg-gradient-to-r from-transparent via-emerald-500 to-transparent
          opacity-60 blur-[2px]"
            />

            <div className="text-[0.7rem] tracking-[0.2em] uppercase text-emerald-400 mb-2">
              My Role
            </div>

            <h4 className="text-white font-semibold text-lg mb-3">
              Full-Stack Developer
            </h4>

            <ul className="space-y-2 text-sm text-neutral-300 leading-relaxed">
              <li>
                • Contributed to backend development, including database-related
                tasks
              </li>
              <li>• Developed and refined system user interfaces</li>
              <li>
                • Assisted with frontend–backend integration of core features
              </li>
              <li>• Contributed to all chapters of the research paper</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-800 my-16 md:my-24"></div>

      <section id="reflections" className="scroll-mt-24">
        <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4"></div>
        <h2 className="text-3xl font-semibold text-white mb-2">
          Reflections on College Life
        </h2>
        <p className="text-neutral-400 mb-6">
          Lessons learned, challenges faced, and personal growth throughout my
          academic journey.
        </p>

        <div className="space-y-6">
          {/* Reflection 1 */}
          <div className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-md">
            <div
              className="absolute -top-[1px] left-0 w-full h-[2px]
    bg-gradient-to-r from-transparent via-emerald-500 to-transparent
    opacity-50 blur-[2px]"
            />

            <div className="flex items-center gap-3 mb-2">
              {/* Mountain/Challenges Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21l6-8 4 5 5-7 4 10H3z"
                />
              </svg>

              <h3 className="text-xl font-semibold text-white">
                Growth Through Challenges
              </h3>
            </div>

            <p className="text-neutral-300 leading-relaxed">
              I was always encouraged to improve myself, and the difficulties
              and lessons I learned along the road allowed me to mature,
              identify my abilities, and gain the confidence I needed to keep
              going.
            </p>
          </div>

          {/* Reflection 2 */}
          <div className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-md">
            <div
              className="absolute -top-[1px] left-0 w-full h-[2px]
    bg-gradient-to-r from-transparent via-emerald-500 to-transparent
    opacity-50 blur-[2px]"
            />

            <div className="flex items-center gap-3 mb-2">
              {/* Compass/Career Direction Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm2.5 10.5l-5 2.5 2.5-5 5-2.5-2.5 5z"
                />
              </svg>

              <h3 className="text-xl font-semibold text-white">
                Shaping My Career Direction
              </h3>
            </div>

            <p className="text-neutral-300 leading-relaxed">
              During my time in Information Systems, I came upon a passion for
              creating simple, user-friendly interfaces while making cautious
              planning to solve challenges. These encounters helped me decide
              what kind of developer I want to work as someone who appreciates
              effective work, usefulness, and clarity.
            </p>
          </div>

          {/* Reflection 3 */}
          <div className="relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-md">
            <div
              className="absolute -top-[1px] left-0 w-full h-[2px]
    bg-gradient-to-r from-transparent via-emerald-500 to-transparent
    opacity-50 blur-[2px]"
            />

            <div className="flex items-center gap-3 mb-2">
              {/* Forward Arrow / Progress Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m0-16l-4 4m4-4l4 4M4 12h16"
                />
              </svg>

              <h3 className="text-xl font-semibold text-white">
                Moving Forward with Confidence
              </h3>
            </div>

            <p className="text-neutral-300 leading-relaxed">
              I'm eager to keep developing and contributing to worthwhile
              real-world initiatives when I enter the workforce, bringing with
              me the experiences and lessons that have formed me.
            </p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <div
        id="lightbox-modal"
        className="hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] 
    flex items-center justify-center p-4"
      >
        {/* Close */}
        <button
          id="lightbox-close"
          className="absolute top-6 right-6 flex items-center justify-center 
  w-10 h-10 bg-neutral-800/70 rounded-full shadow-md
  text-neutral-300 hover:bg-neutral-900 hover:border hover:border-emerald-500 
  hover:text-emerald-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Prev */}
        <button
          id="lightbox-prev"
          className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center 
  w-10 h-10 bg-neutral-800/70 rounded-full shadow-md
  text-neutral-300 hover:bg-neutral-900 hover:border hover:border-emerald-500 
  hover:text-emerald-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <img
          id="lightbox-img"
          className="
  max-w-[95vw] max-h-[80vh]
  md:max-w-[70vw] md:max-h-[70vh]
  rounded-lg shadow-2xl object-contain
"
        />

        {/* Next */}
        <button
          id="lightbox-next"
          className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center 
  w-10 h-10 bg-neutral-800/70 rounded-full shadow-md
  text-neutral-300 hover:bg-neutral-900 hover:border hover:border-emerald-500 
  hover:text-emerald-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </DocsLayout>
  );
}
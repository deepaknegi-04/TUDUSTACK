
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Decorative gradient accents (responsive) */}
      <div className="hidden sm:block pointer-events-none absolute -top-24 -right-24 sm:h-56 sm:w-56 md:h-72 md:w-72 rounded-full bg-gradient-to-tr from-purple-400/40 via-pink-400/30 to-amber-300/30 blur-3xl" aria-hidden="true" />
      <div className="hidden sm:block pointer-events-none absolute -bottom-24 -left-24 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-blue-400/30 via-cyan-300/30 to-emerald-300/30 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-auto py-10">
        {/* Left Section */}
        <div className="w-full">
          <div className="text-sm font-semibold text-pink-600 tracking-wide mb-3">/TUDUSTACK</div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-5">
            Plan, track, and <br />
            organize your tasks <br />
            seamlessly with a <br />
            clean, inspired <br />
            interface.
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Link to="/signup" aria-label="Sign up" className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-900 transition">
              Get started
            </Link>
            <Link to="/login" aria-label="Log in" className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 text-gray-900 px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
              Log in
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <p className="text-sm text-gray-700">Your productivity, supercharged.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full">
          {/* Code Box */}
          <div className="bg-white rounded-xl shadow-lg p-4 border w-full max-w-full md:max-w-md mb-6 mx-auto">
            <pre className="text-sm text-gray-800 font-mono overflow-x-auto">
              <span className="text-gray-500">1 </span>TODO<br />
              <span className="text-gray-500">2 </span><span className="text-pink-600">&lt;TITLE&gt;</span><br />
              <span className="text-gray-500">3 </span>&lt;&gt;Plan Daily Schedule&lt;/&gt;<br />
              <span className="text-gray-500">4 </span><span className="text-pink-600">&lt;DESCRIPTION&gt;</span><br />
              <span className="text-gray-500">5 </span>&lt;&gt;Turn plans into progress&lt;/&gt;<br />
            </pre>
          </div>

          {/* TODO Table */}
          <div className="bg-black text-white rounded-xl shadow-xl p-6 w-full max-w-full md:max-w-md mx-auto">
            <div className="flex justify-between text-sm border-b border-gray-700 pb-2 mb-4 gap-3">
              <span className="text-gray-400">TITLE</span>
              <span className="text-gray-400">DESCRIPTION</span>
            </div>
            <div className="text-sm space-y-4">
              <div className="flex justify-between gap-3">
                <span>Read 10 Pages</span>
                <span className="text-gray-300 text-right">Finish a chapter from your current book</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Weekly Review</span>
                <span className="text-gray-300 text-right">Reflect on wins and plan for next week.</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Plan Daily Schedule</span>
                <span className="text-gray-300 text-right">Outline top 3 tasks for the day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

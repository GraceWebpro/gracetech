import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6 relative overflow-hidden pt-24 md:pt-2">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 text-center max-w-xl">

        {/* BIG 404 */}
        <h1 className="text-[100px] md:text-[140px] font-extrabold leading-none">
          404
        </h1>

        {/* HEADLINE */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          This page doesn’t exist
        </h2>

        {/* SUBTEXT */}
        <p className="text-white/60 mt-3 leading-relaxed">
          Oops! The page you’re looking for might have been moved, deleted, or never existed.
          Let’s get you back on track.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-white to-primary text-black font-medium hover:opacity-90 transition"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>

          <Link
            to="/templates"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
          >
            <Search className="w-4 h-4" />
            Browse Templates
          </Link>

        </div>

        {/* EXTRA HELP LINK */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
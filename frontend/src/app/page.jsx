import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center px-6 md:px-20 py-10">
      {/* Text Section */}
      <div className="md:w-1/2 text-white space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider">
          Welcome to AutoSmells Lab
        </h1>
        <h2 className="text-xl md:text-2xl font-bold tracking-wider">
          No more hours refactoring.<br /> One click to make programming easier.
        </h2>
        <p className="text-base">
          Let our lab analyze all snippets of code and help refactor your code
          base.<br />
          Identify code smells and resolutions through various languages.
        </p>
        <Link href="/lab">
          <button className="py-3 px-10 rounded-md hover:bg-[#2E2A3C] bg-[#1D192B] text-white shadow-2xl">
            Go to Lab
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="/lab-preview.jpg"
          alt="Lab Page Preview"
          className="w-full max-w-2xl object-cover rounded-2xl shadow-2xl border border-gray-900 opacity-90"
        />
      </div>
    </div>
  );
}

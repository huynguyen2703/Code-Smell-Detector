export default function Home() {
  return (
    <div className="flex h-screen items-center">
      <div className="p8 text-white">
        <h1 className="text-5xl font-bold text-white mb-50 ml-20 tracking-wider">
          Welcome to AutoSmells Lab
        </h1>
        <h2 className="mb-4 text-2xl font-bold tracking-wider ml-20">
          No more hours refactoring. One<br></br> click to make programming
          easier.
        </h2>
        <br></br>
        <p className="py-2 mb-8 ml-20">
          Let our lab analyzes all snippet of code and help refactor your code
          base.<br></br>
          Identify code smells and resolutions through various languages.
        </p>
        <br></br>
        <a href="">
          <div className="flex justify-center mr-50">
            <button className="py-3 px-12 rounded-md hover:bg-[#2E2A3C] bg-[#1D192B] text-white shadow-2xl">
              Go to Lab
            </button>
          </div>
        </a>
      </div>
      <div className="items-center mt-35">
        <img
          src="/lab-preview.jpg"
          alt="Lab Page Preview"
          className="w-200 object-cover rounded-2xl shadow-2xl border-gray-900 opacity-90"
        />{" "}
      </div>
    </div>
  );
}

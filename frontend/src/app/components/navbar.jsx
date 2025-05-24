import Link from "next/link";

export default function NavBar() {
  return (<>
    <nav className="bg-black text-white p1">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold ml-5">
          <img src="/logo-transparent-png.png" alt="AutoSmells Logo" className="h-12 w-auto mr-2"/>
            AutoSmells Lab
        </Link>
        <div>
          <Link href="/home" className="px-20">
            Home
          </Link>
          <Link href="/about" className="px-20">
            About
          </Link>
          <Link href="/guide" className="px-20 mr-20">
            Guide
          </Link>
        </div>
      </div>
    </nav>
    </>
  );
}

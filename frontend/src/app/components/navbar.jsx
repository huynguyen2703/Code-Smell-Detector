import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-black text-white p-4 w-full">
      <div className="mx-auto flex justify-between items-center px-8">
        {/* Logo Section */}
        <Link href="/" className="text-xl font-bold">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo-transparent-png.png"
              alt="AutoSmells Logo"
              width={48}
              height={48}
              className="mr-2"
            />
            <span className="text-2xl">AutoSmells Lab</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-30 text-lg mr-24">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/guide" className="hover:underline">
            Guide
          </Link>
        </div>
      </div>
    </nav>
  );
}

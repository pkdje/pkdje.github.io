import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">
          pkdje0113
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            글
          </Link>
        </nav>
      </div>
    </header>
  );
}
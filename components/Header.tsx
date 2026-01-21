import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import { getCategoriesWithCount } from '@/lib/posts';

export default function Header() {
  const categories = getCategoriesWithCount();

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ProfileMenu categories={categories} />
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">
            pkdje0113
          </Link>
        </div>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            글
          </Link>
        </nav>
      </div>
    </header>
  );
}
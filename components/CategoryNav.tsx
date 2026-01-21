import Link from 'next/link';
import { getAllCategories } from '@/lib/posts';

export default function CategoryNav({ currentCategory }: { currentCategory?: string }) {
  const categories = ['전체', ...getAllCategories()];

  return (
    <nav className="flex gap-4 mb-8 overflow-x-auto">
      {categories.map((category) => (
        <Link
          key={category}
          href={category === '전체' ? '/' : `/category/${encodeURIComponent(category)}`}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
            currentCategory === category || (category === '전체' && !currentCategory)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
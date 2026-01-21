import { getAllPosts, getAllTags } from '@/lib/posts';
import Link from 'next/link';

export default function Sidebar() {
  const posts = getAllPosts().slice(0, 5); // 최근 5개
  const allTags = getAllTags().slice(0, 10); // 상위 10개

  return (
    <aside className="space-y-8">
      {/* 최근 글 */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          📝 최근 글
        </h3>
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-gray-300 hover:text-white transition text-sm line-clamp-1"
              >
                {post.title}
              </Link>
              <p className="text-gray-500 text-xs mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 인기 태그 */}
      <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-800">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          🏷️ 태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-600 transition cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
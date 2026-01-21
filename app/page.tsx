import { getAllPosts, getCategoryDisplayName } from '@/lib/posts';
import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">박동제 블로그</h1>
      
      <CategoryNav />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <article className="border border-gray-700 p-6 rounded-lg hover:border-gray-500 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                  {getCategoryDisplayName(post.category || 'general')}
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{post.date}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-300">{post.content.substring(0, 100)}...</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
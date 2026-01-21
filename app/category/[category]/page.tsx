import { getAllCategories, getPostsByCategory, getCategoryDisplayName } from '@/lib/posts';
import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">박동제 블로그</h1>

      <CategoryNav currentCategory={category} />

      <h2 className="text-2xl font-semibold mb-6">{getCategoryDisplayName(category)}</h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <article className="border border-gray-700 p-6 rounded-lg hover:border-gray-500 transition cursor-pointer">
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
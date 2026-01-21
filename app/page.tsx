import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">박동제 블로그</h1>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <article className="border border-gray-700 p-6 rounded-lg hover:border-gray-500 transition cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{post.date}</p>
              <p className="text-gray-300">{post.content.substring(0, 100)}...</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
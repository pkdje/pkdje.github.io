import { getAllPosts, getCategoryDisplayName, stripMarkdown } from '@/lib/posts';
import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';
import Sidebar from '@/components/Sidebar';
import { Calendar, Folder } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">pkdje0113</h1>
        <p className="text-gray-400 mb-8">
          CSE 24
        </p>
      </div>
      
      <div className="flex gap-8">
        {/* 메인 컨텐츠 */}
        <div className="flex-1 max-w-4xl">
          <CategoryNav />
          
          <div className="space-y-4">
            {posts.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post.slug}>
                <article className="border border-gray-700 p-6 rounded-lg hover:border-gray-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Folder size={14} className="text-blue-400" />
                    <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                      {getCategoryDisplayName(post.category || 'general')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={14} className="text-gray-500" />
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
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
                  <p className="text-gray-300">{stripMarkdown(post.content).substring(0, 150)}...</p>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* 사이드바 */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
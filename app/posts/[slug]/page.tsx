import { getAllPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import Comments from '@/components/Comments';
import rehypeRaw from 'rehype-raw';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <div>글을 찾을 수 없습니다. (slug: {slug})</div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
        ← 홈으로
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-8">{post.date}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="prose-custom max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <Comments />
    </main>
  );
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
  category?: string;
}

const categoryNames: Record<string, string> = {
  'baek': '백준',
  'dm' : '데이터마이닝',
  'life': '일상',
  'review': '리뷰',
  'alg' : '알고리즘'
};

export function getCategoryDisplayName(category: string): string {
  return categoryNames[category] || category;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        content,
        tags: data.tags || [],
        category: data.category || 'general',
      };
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map((post) => post.category || 'general');
  return Array.from(new Set(categories));
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

export function getCategoryCount(category: string): number {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category).length;
}

export function getCategoriesWithCount(): { category: string; count: number; displayName: string }[] {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
    count: getCategoryCount(category),
    displayName: getCategoryDisplayName(category),
  }));
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s/g, '') // 제목 (#, ##)
    .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // 코드
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // 볼드, 이탤릭
    .replace(/^\s*[-*+]\s/gm, '') // 리스트
    .replace(/^\s*\d+\.\s/gm, '') // 번호 리스트
    .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
    .trim();
}
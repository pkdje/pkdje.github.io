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
  'life': '일상',
  'review': '리뷰',
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
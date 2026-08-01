import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const storiesDirectory = path.join(process.cwd(), 'content/stories');

export interface StoryMeta {
  id: string;
  title: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: string;
  excerpt?: string;
  image?: string;
  [key: string]: any;
}

export interface StoryData extends StoryMeta {
  contentHtml: string;
}

export function getSortedStoriesData(): StoryMeta[] {
  if (!fs.existsSync(storiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(storiesDirectory);
  const allStoriesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(storiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || id,
        category: matterResult.data.category || 'Devotional',
        date: matterResult.data.date || '',
        readTime: matterResult.data.readTime || '8 min read',
        author: matterResult.data.author || 'Jeanna’ Mead',
        excerpt: matterResult.data.excerpt || '',
        image: matterResult.data.image || '/images/lighthouse_storm.jpg',
        ...matterResult.data,
      };
    });

  return allStoriesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getStoryData(id: string): Promise<StoryData> {
  const fullPath = path.join(storiesDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Story not found: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title || id,
    category: matterResult.data.category || 'Devotional',
    date: matterResult.data.date || '',
    readTime: matterResult.data.readTime || '8 min read',
    author: matterResult.data.author || 'Jeanna’ Mead',
    excerpt: matterResult.data.excerpt || '',
    image: matterResult.data.image || '/images/lighthouse_storm.jpg',
    ...matterResult.data,
  };
}

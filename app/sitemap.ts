import { MetadataRoute } from 'next';
import { getSortedStoriesData } from '@/lib/stories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goddome.org';
  const stories = getSortedStoriesData();

  const storyUrls = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.id}`,
    lastModified: story.date ? new Date(story.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/prayer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...storyUrls,
  ];
}

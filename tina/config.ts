import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/stories",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "stories",
        label: "Devotionals & Stories",
        path: "content/stories",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "Date (YYYY-MM-DD)",
            required: false,
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference (e.g. 1 Peter 3:4)",
            required: false,
          },
          {
            type: "string",
            name: "scriptureText",
            label: "Scripture Verse Text",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "featuredQuote",
            label: "Featured Quote (for social sharing & pull-quotes)",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "hashtags",
            label: "Hashtags (e.g. #writingmyheartout #wordsforthesoul)",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "audioUrl",
            label: "Audio Devotional URL (MP3 file link)",
            required: false,
          },
          {
            type: "string",
            name: "topics",
            label: "Topics",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt / Short Summary",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: false,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image / Cover Image",
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "Topics / Tags",
            list: true,
            options: [
              "Faith & Trust",
              "Comfort & Healing",
              "Encouragement",
              "Everyday Grace",
              "Scripture Reflection",
              "Poetry",
            ],
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
            required: false,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            required: false,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Meta Title",
            required: false,
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "ogImage",
            label: "OG Image",
            required: false,
          },
          {
            type: "string",
            name: "hebrew_scripture",
            label: "Hebrew Scripture",
            required: false,
          },
          {
            type: "string",
            name: "christian_scripture",
            label: "Christian Scripture",
            required: false,
          },
          {
            type: "string",
            name: "themes",
            label: "Themes",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary / Excerpt",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: false,
          },
        ],
      },
    ],
  },
});

import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

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
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "hebrew_scripture",
            label: "Hebrew Scripture",
          },
          {
            type: "string",
            name: "christian_scripture",
            label: "Christian Scripture",
          },
          {
            type: "string",
            name: "themes",
            label: "Themes",
            list: true, // handles arrays like ["Healing", "Faith"]
          },
          {
            type: "string",
            name: "summary",
            label: "Summary / Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft Status",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

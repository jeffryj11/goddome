// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/stories",
      publicFolder: "public"
    }
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
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: false
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: false
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: false
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            required: false
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: false
          },
          {
            type: "string",
            name: "hebrew_scripture",
            label: "Hebrew Scripture",
            required: false
          },
          {
            type: "string",
            name: "christian_scripture",
            label: "Christian Scripture",
            required: false
          },
          {
            type: "string",
            name: "themes",
            label: "Themes",
            list: true,
            required: false
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea"
            },
            required: false
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea"
            },
            required: false
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft Status",
            required: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: false
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

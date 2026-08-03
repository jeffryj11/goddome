import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/jeff/.gemini/antigravity/scratch/goddome/tina/__generated__/.cache/1785735132542', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  
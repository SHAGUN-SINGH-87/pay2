import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import Blogs from "./collections/Blogs"; // default export
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { WorkflowLogs } from "./collections/WorkflowLogs";
import { Workflows } from "./collections/Workflows";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Workflows, WorkflowLogs, Blogs],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || "supersecret",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/paydb",
  }),

  sharp,

  plugins: [],
});
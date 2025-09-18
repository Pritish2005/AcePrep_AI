// /** @type { import("drizzle-kit").Config } */
// export default {
//     schema: "./utils/schema.js",
//     dialect: 'postgresql',
//     dbCredentials: {
//       url: 'postgresql://neondb_owner:vxjsp3clhqf5@ep-summer-smoke-a5y6atbe.us-east-2.aws.neon.tech/neondb?sslmode=require',
//     }
//   };
  
import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env.local' });
export default defineConfig({
  schema: "./utils/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DBURI,
  },
});
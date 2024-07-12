// db.js
import { neon } from '@neondatabase/serverless'; // Example import for Neon
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // Your schema definitions

const sql = neon(process.env.NEXT_PUBLIC_DBURI); // Adjust this based on your environment setup
export const db = drizzle(sql, { schema });

export default db;

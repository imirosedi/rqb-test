import type { Config } from "drizzle-kit";

export default {
	schema: "./src/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	driver: "pglite",
	dbCredentials: {
		url: "file://pgdata",
	},
} satisfies Config;

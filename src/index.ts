import { PGlite } from "@electric-sql/pglite";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

import * as schema from "./schema";

const db = drizzle(new PGlite(), { schema });
await migrate(db, { migrationsFolder: "./migrations" });

const [{ id: orderId }] = await db
    .insert(schema.orders)
    .values({
        name: "Test 1",
    })
    .returning();
const [{ id: orderLineId }] = await db
    .insert(schema.orderLines)
    .values({
        orderId,
        quantity: "12345678987654.321",
    })
    .returning();

const r1 = await db
    .select()
    .from(schema.orderLines)
    .where(eq(schema.orderLines.id, orderLineId));
console.log("Result 1", r1[0].quantity);            // 12345678987654.321

const r2 = await db.query.orderLines.findFirst({
    where: eq(schema.orderLines.id, orderLineId),
});
console.log("Result 2", r2!.quantity);              // 12345678987654.321

const r3 = await db.query.orders.findFirst({
    where: eq(schema.orders.id, orderId),
    with: {
        lines: true,
    }
});
console.log("Result 3", r3!.lines[0].quantity);     // 12345678987654.32

console.log(+"12345678987654.321");                 // 12345678987654.32

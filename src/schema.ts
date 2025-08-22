import { relations } from "drizzle-orm";
import { decimal, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const orders = pgTable("order", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name").notNull(),
});

export const ordersRel = relations(orders, ({ many }) => ({
	lines: many(orderLines),
}));

export const orderLines = pgTable("order_line", {
	id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
		.notNull()
		.references(() => orders.id),
	quantity: decimal("quantity").notNull()
});

export const orderLinesRel = relations(orderLines, ({ one }) => ({
	order: one(orders, {
		fields: [orderLines.orderId],
		references: [orders.id],
	}),
}));

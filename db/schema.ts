import { mysqlTable, int, double, time, varchar, timestamp } from "drizzle-orm/mysql-core"

export const quotesTable = mysqlTable("quotes", {
    id: int('id').primaryKey().autoincrement(),
    bankName: varchar('bank_name', { length: 255 }),
    hour: time('hour'),
    buy: double('buy'),
    sell: double('sell'),
    date: timestamp('date'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
    deletedAt: timestamp('deletedAt'),
})
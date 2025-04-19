import { drizzle } from "drizzle-orm/mysql2";
import { sql, desc } from "drizzle-orm";
import { quotesTable } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!)

export const getQuotes = async () => {
    try {
        const lastDateResult = await db
            .select({ date: sql`DATE(${quotesTable.date})` })
            .from(quotesTable)
            .groupBy(sql`DATE(${quotesTable.date})`)
            .orderBy(desc(sql`DATE(${quotesTable.date})`))
            .limit(1)

        const lastDate = lastDateResult[0]?.date;

        const lastDayQuotesResult = await db.execute(sql`
            SELECT qt.*
            FROM ${quotesTable} qt
            JOIN (
              SELECT ${quotesTable.bankName}, MAX(${quotesTable.hour}) AS max_hour
              FROM ${quotesTable}
              WHERE DATE(${quotesTable.date}) = ${lastDate}
              GROUP BY ${quotesTable.bankName}
            ) latest
            ON qt.bank_name = latest.bank_name AND qt.hour = latest.max_hour AND DATE(qt.date) = ${lastDate}
          `)

          const secondLastDateResult = await db
            .select({ date: sql`DATE(${quotesTable.date})` })
            .from(quotesTable)
            .groupBy(sql`DATE(${quotesTable.date})`)
            .orderBy(desc(sql`DATE(${quotesTable.date})`))
            .offset(1)
            .limit(1)

        const secondLastDate = secondLastDateResult[0]?.date

        const secondLastDayQuotesResult = await db.execute(sql`
            SELECT qt.*
            FROM ${quotesTable} qt
            JOIN (
              SELECT ${quotesTable.bankName}, MAX(${quotesTable.hour}) AS max_hour
              FROM ${quotesTable}
              WHERE DATE(${quotesTable.date}) = ${secondLastDate}
              GROUP BY ${quotesTable.bankName}
            ) latest
            ON qt.bank_name = latest.bank_name AND qt.hour = latest.max_hour AND DATE(qt.date) = ${secondLastDate}
          `)

          const lastDayQuotes = lastDayQuotesResult[0] as Quote[];
          const secondLastDayQuotes = secondLastDayQuotesResult[0] as Quote[];
          
        return { lastDayQuotes, secondLastDayQuotes };
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return { error: "Internal Server Error" };
    }
}


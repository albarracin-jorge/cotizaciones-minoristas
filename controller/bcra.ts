import { drizzle } from "drizzle-orm/mysql2";
import { quotesTable } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!)

export const getQuotes = async () => {
    try {
        const quotes = await db.select().from(quotesTable);
        return quotes;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return { error: "Internal Server Error" };
    }
}


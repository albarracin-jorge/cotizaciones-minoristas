import { drizzle } from "drizzle-orm/mysql2";
import { eq, desc, sql, and } from "drizzle-orm";
import { quotesTable } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

// Función para obtener la fecha N más reciente
const getNthMostRecentDate = async (offset: number) => {
  const result = await db
    .select({ date: sql`DATE(${quotesTable.date})`.as('date') })
    .from(quotesTable)
    .groupBy(sql`DATE(${quotesTable.date})`)
    .orderBy(desc(sql`DATE(${quotesTable.date})`))
    .offset(offset)
    .limit(1);

  return result[0]?.date as string | undefined;
};

// Función para obtener las últimas cotizaciones por fecha
const getQuotesForDate = async (date: string) => {
  const subquery = db
    .select({
      bankName: quotesTable.bankName,
      maxHour: sql`MAX(${quotesTable.hour})`.as('maxHour'),
    })
    .from(quotesTable)
    .where(sql`DATE(${quotesTable.date}) = ${date}`)
    .groupBy(quotesTable.bankName)
    .as('latest');

  const result = await db
    .select()
    .from(quotesTable)
    .innerJoin(subquery, and(
      eq(quotesTable.bankName, subquery.bankName),
      eq(quotesTable.hour, subquery.maxHour),
      sql`DATE(${quotesTable.date}) = ${date}`
    ));

  // `result` es de tipo { quotesTable: Quote, latest: { bankName, maxHour } }[]
  return result.map(r => r.quotes);
};

const getQuotesForDateWithBankName = async (date: string, bankName: string) => {
  const result = await db
    .select()
    .from(quotesTable)
    .where(
      and(
        eq(quotesTable.bankName, bankName),
        sql`DATE(${quotesTable.date}) = ${date}`
      )
    );

  return result;
}

// Función principal
export const getQuotes = async () => {
  try {
    const lastDate = await getNthMostRecentDate(0);
    const secondLastDate = await getNthMostRecentDate(1);

    if (!lastDate || !secondLastDate) {
      throw new Error("No se pudieron obtener fechas suficientes.");
    }

    const lastDayQuotes = await getQuotesForDate(lastDate);
    const secondLastDayQuotes = await getQuotesForDate(secondLastDate);
    if( lastDayQuotes.length < secondLastDayQuotes.length ) {
      //search what element is missing and fill with sell and buy value 0
      const missingQuotes = secondLastDayQuotes.filter(
        (quote) => !lastDayQuotes.some((q) => q.bankName === quote.bankName)
      );
      for (const quote of missingQuotes) {
        lastDayQuotes.push({
          ...quote,
          buy: 0,
          sell: 0,
        });
      }
    }
    if( secondLastDayQuotes.length < lastDayQuotes.length ) {
      //search what element is missing and search the day before that and fill with sell and buy value 0
      const missingQuotes = lastDayQuotes.filter(
        (quote) => !secondLastDayQuotes.some((q) => q.bankName === quote.bankName)
      );
      for (const quote of missingQuotes) {
        const previousQuote = await getQuotesForDateWithBankName(secondLastDate, quote.bankName!);
        if (previousQuote.length > 0) {
          secondLastDayQuotes.push({
            ...previousQuote[0],
            buy: 0,
            sell: 0,
          });
        } else {
          secondLastDayQuotes.push({
            id: 0, // or another placeholder/default
            bankName: quote.bankName,
            date: new Date(secondLastDate),
            hour: "00:00",
            buy: 0,
            sell: 0,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
          });
        }
      }
    }

    //sort by bankName
    lastDayQuotes.sort((a, b) => a.bankName!.localeCompare(b.bankName!));
    secondLastDayQuotes.sort((a, b) => a.bankName!.localeCompare(b.bankName!));
    return { lastDayQuotes, secondLastDayQuotes };
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return { error: "Internal Server Error" };
  }
};

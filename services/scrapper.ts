import { chromium } from "playwright";
import { ScrapingResult, Bank } from "../types";
import { saveScrapper } from "@/controller/bcra";
import cron from "node-cron";

const BCRA_URL = "https://www.bcra.gob.ar/PublicacionesEstadisticas/Tipo_de_cambio_minorista.asp";
const BCRA_URL_RESULT = "https://www.bcra.gob.ar/PublicacionesEstadisticas/Tipo_de_cambio_minorista_2.asp";

// cron.schedule('10 11,13,15 * * 1-5', async () => {
cron.schedule('* * * * *', async () => {
    console.log("Running cron job");
    
})

export async function main(dayBefore: number = 0): Promise<ScrapingResult | undefined> {
    console.log("Executing scraping");
    
    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();

        await page.goto(BCRA_URL);

        const select = page.locator('select').first();
        await select.selectOption("DOLAR");

        const currentDate = getDate(dayBefore);

        await page.evaluate((date) => {
            const input = document.querySelector('input[name="fecha"]') as HTMLInputElement;
            if (input) {
                input.value = date;
            }
        }, currentDate);

        await page.click("button[name='B1']");
        await page.waitForURL(BCRA_URL_RESULT);
        await page.waitForTimeout(2000);
        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll("table tr"));
            return rows.map(row => {
                const columns = Array.from(row.querySelectorAll("td"));
                return columns.map(column => column.innerText.trim());
            });
        });
        if(!data || data.length === 0) throw new Error("No data found");
        saveScrapper(data);
        const result = parseQuote(data);
        console.log(data);
        
        return result;

    } catch (error) {
        console.error("Scraping error:", error);
    } finally {
        await browser.close();
    }
}

function getDate(daysAgo: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    if (date.getDay() === 0 || date.getDay() === 6) {
        throw new Error("Date can't be Saturday or Sunday");
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function parseQuote(data: string[][]): { date: string; banks: any[] } {
    let bankRowStart: number;
    let hours: string[];
    let date: string;

    if (data[0][0] === "Planilla por Hora") {
        const dateRaw = data[4][0];
        bankRowStart = 9;
        hours = data[6];
        date = dateRaw.split(': ')[1].trim();
    } else {
        const dateRaw = data[0][0];
        bankRowStart = 5;
        hours = data[2];
        date = dateRaw.split(': ')[1].trim();
    }
    const banks: Bank[] = [];

    for (let i = bankRowStart; i < data.length; i++) {
        const bankData = data[i];
        const nombrebank = bankData[0];

        if (nombrebank && nombrebank.trim() !== '') {
            const bank: Bank = {
                name: nombrebank.trim(),
                quote: []
            };
            const indicesElectronico = [3, 7, 11];

            for (let j = 0; j < indicesElectronico.length; j++) {
                const baseIndex = indicesElectronico[j];

                const buy = bankData[baseIndex] || null;
                const sell = bankData[baseIndex + 1] || null;

                if (buy || sell) {
                    bank.quote.push({
                        hour: hours[j],
                        operationType: 'Electrónico',
                        buy: buy?.trim() || null,
                        sell: sell?.trim() || null
                    });
                }
            }

            banks.push(bank);
        }
    }

    return {
        date,
        banks
    };
}
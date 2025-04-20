interface Bank {
    name: string;
    quote: Quote[];
}

interface ScrapingResult {
    date: string;
    banks: Bank[];
}

export { Bank, ScrapingResult };
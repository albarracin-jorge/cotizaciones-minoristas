interface Quote {
    hour: string;
    operationType: "Electrónico" | "Mostrador";
    buy: string | null;
    sell: string | null;
}

interface Bank {
    name: string;
    quote: Quote[];
}

interface ScrapingResult {
    date: string;
    banks: Bank[];
}

export { Quote, Bank, ScrapingResult };
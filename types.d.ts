interface Quote {
    id: number;
    bankName: string;
    hour: string; // o Date si estás usando objetos Date
    buy: number;
    sell: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
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
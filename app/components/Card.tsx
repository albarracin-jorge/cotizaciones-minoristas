import { Quote } from "../../db/schema";
import { bankList } from "@/utils/bankList";
import { InfoPopup } from "./InfoPopup";

type CardProps = {
    quote: Quote;
    previousQuote: Quote;
};
export const Card = ({ quote, previousQuote }: CardProps) => {
    console.log(quote, previousQuote);
    return(
        <div className={`
            flex flex-col items-center justify-between rounded-lg shadow-lg w-72 h-32 
            ${quote.bankName && bankList[quote.bankName as keyof typeof bankList]?.cardStyle ? bankList[quote.bankName as keyof typeof bankList].cardStyle : "bg-gray-200"}`
        }>
            <div className={`m-4 mt-6 text-2xl font-bold flex`}>
                <h2 className="pr-2">
                {quote.bankName && bankList[quote.bankName as keyof typeof bankList]?.name ? bankList[quote.bankName as keyof typeof bankList].name : "Unknown Bank"}
                </h2>
                <InfoPopup quote={quote} previousQuote={previousQuote} />
            </div>
            <div className={`w-full py-1.5 rounded-b-lg bg-[rgba(0,0,0,0.3)]`}>
                <div className="flex items-center justify-center gap-4">
                    <p>
                        Compra: ${quote.buy}
                        {quote.buy !== previousQuote.buy ? (
                            <span className={`text-sm ${quote.buy! > previousQuote.buy! ? "text-green-500" : "text-red-500"}`}>
                                {quote.buy! > previousQuote.buy! ? " ▲" : " ▼"}
                            </span>
                        ) : (
                            <span className="text-xl font-bold text-gray-500">
                                {` - `}
                            </span>
                        )}
                    </p>
                    <p>
                        Venta: ${quote.sell}
                        {quote.sell !== previousQuote.sell ? (
                            <span className={`text-sm ${quote.sell! > previousQuote.sell! ? "text-green-500" : "text-red-500"}`}>
                                {quote.sell! > previousQuote.sell! ? " ▲" : " ▼"}
                            </span>
                        ) : (
                            <span className="text-xl font-bold text-gray-500">
                                {` - `}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}


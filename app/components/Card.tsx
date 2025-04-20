import { Quote } from "../../db/schema";
import { bankList } from "@/utils/bankList";
type CardProps = {
    quote: Quote;
};
export const Card = ({ quote }: CardProps) => {
    return(
        <div className={`
            flex flex-col items-center justify-between rounded-lg shadow-lg w-72 h-24 
            ${quote.bankName && bankList[quote.bankName as keyof typeof bankList]?.cardStyle ? bankList[quote.bankName as keyof typeof bankList].cardStyle : "bg-gray-200"}`
        }>
            <h2 className={`m-4 mb-0 text-2xl font-bold`}>
            {quote.bankName && bankList[quote.bankName as keyof typeof bankList]?.name ? bankList[quote.bankName as keyof typeof bankList].name : "Unknown Bank"}
            </h2>
            <div className={`flex bg-transparentitems-center justify-center w-full gap-4 rounded-b-lg py-1 bg-[rgba(0,0,0,0.3)]`}>
                <p>Compra: {quote.buy}</p>
                <p>Venta: {quote.sell}</p>
            </div>
            {/* <p>Ultimo horario: {quote.hour}</p> */}
        </div>
    )
}
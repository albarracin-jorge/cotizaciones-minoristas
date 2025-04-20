import { Quote } from "../../types";
type CardProps = {
    quote: Quote;
};
export const Card = ({ quote }: CardProps) => {
    return(
        <div className="flex flex-col items-center justify-center p-4 m-4 bg-emerald-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h2>{quote.bank_name}</h2>
            <p>Compra: {quote.buy}</p>
            <p>Venta: {quote.sell}</p>
            <p>Ultimo horario: {quote.hour}</p>
        </div>
    )
}
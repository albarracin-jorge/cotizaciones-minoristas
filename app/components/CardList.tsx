import { Quote } from "../../db/schema"
import { Card } from "./Card"
export const CardList = ({
    lastQuotes, secondLastQuotes
}: {
    lastQuotes: Quote[], secondLastQuotes: Quote[]
}) => {
    return(
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-12">
        {lastQuotes!.map((quote, index) => (
          <Card key={quote.id} quote={quote} previousQuote={secondLastQuotes[index]}/>
        ))}
      </section>
    )
}
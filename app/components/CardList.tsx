import { Quote } from "../../db/schema"
export const CardList = ({
    lastQuotes, secondLastQuotes
}: {
    lastQuotes: Quote[], secondLastQuotes: Quote[]
}) => {
    return(
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {lastQuotes!.map((quote) => (
          <Card key={quote.id} quote={quote}/>
        ))}
      </section>
    )
}
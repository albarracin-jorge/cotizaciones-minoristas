import Link from "next/link";
import { Card } from "./components/Card";
import { getQuotes } from "@/controller/bcra";
import { Quote } from "@/types";

export default async function Home() {
  const { lastDayQuotes, secondLastDayQuotes } = await getQuotes();
  console.log(lastDayQuotes, secondLastDayQuotes);
  
  // Tipar explícitamente si quieres
  // const quotes1: Quote[] = lastDayQuotes;
  // const quotes2: Quote[] = secondLastDayQuotes;
  
  return (
    <main className="flex flex-col items-center justify-around my-8">
      <section>
        <h1>Bienvenido a Dolar Bancos Hoy</h1>
        <p>Aca podrás seguir el precio de los dólares que los bancos compran y venden a los ciudadanos de a pie, mas conocido como dólar minorista.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {lastDayQuotes!.map((quote) => (
          <Card key={quote.id} quote={quote}/>
        ))}
      </section>
      <section>
        <i>
          Los valores se obtienen en base al informe diario que publica el BCRA (Banco Central de la República Argentina) en su página oficial. 
          Para más información visita la sección <Link href="/about">Sobre el proyecto</Link>.
        </i>
      </section>
    </main>
  );
}

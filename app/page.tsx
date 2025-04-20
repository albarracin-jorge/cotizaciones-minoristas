// export const revalidate = 60
export const dynamic = 'force-dynamic'
import Link from "next/link";
import { getQuotes } from "@/controller/bcra";
import { CardList } from "./components/CardList";

export default async function Home() {
  const { lastDayQuotes, secondLastDayQuotes} = await getQuotes();
  
  // Tipar explícitamente si quieres
  // const quotes1: Quote[] = lastDayQuotes;
  // const quotes2: Quote[] = secondLastDayQuotes;
  
  return (
    <main className="flex flex-col items-center justify-around my-8 mx-4">
      <section className="lg:max-w-[50%]">
        <h1 className="text-4xl">Bienvenido a Dolar Bancos Hoy</h1>
        <p className="text-lg mt-4">Aca podrás seguir el precio de los dólares que los bancos compran y venden a los ciudadanos de a pie, mas conocido como dólar minorista.</p>
      </section>
      <CardList lastQuotes={lastDayQuotes!} secondLastQuotes={secondLastDayQuotes!} />
      <section className="lg:max-w-[45%]">
        <i>
          Los valores se obtienen en base al informe diario que publica el BCRA (Banco Central de la República Argentina) en su página oficial. 
          Para más información visita la sección <Link className="font-bold" href="/about">Sobre el proyecto</Link>.
        </i>
      </section>
    </main>
  );
}

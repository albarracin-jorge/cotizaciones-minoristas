export default function About(){
    return(
        <main className="flex flex-col items-center h-full my-8 mx-4 lg:mx-[25%]">
            <h1 className="text-4xl mt-12">Dolar Bancos Hoy</h1>
            <p className="text-lg mt-12 mb-6">
                El objetivo de Dolar Bancos Hoy es presentar de forma sencilla y clara la cotización actual del dolar en los bancos de la República Argentina.
            </p>
            <p className="text-lg mb-6">
                No busca la total exactitud, debido a que los datos se extraen del reporte diario que realiza el BCRA (Banco Central de la República Argentina).
                Actualmente el BCRA publica una tabla diaria con 3 franjas horarias: mañana (11:00), mediodia(13:00) y tarde(15:00). El informe no abarca todos
                los bancos, como tampoco brokers, billeteras virtuales, casas de cambio, etc. Con el objetivo de simplificar, solo se muestra las operaciones
                Electrónicas (vía homebanking).
            </p>
            <p className="text-lg mb-6">
                Este proyecto fue realizado a modo de practica aprovechando el fin de semana de Pascuas 2025. No busca ser un proyecto serio ni tomar como referencia
                para decisiones financieras. Si ves errores o inconsistencias, por favor no dudes en contactarme a través de mi correo albarracinj.dev@gmail.com.
            </p>
        </main>
    )
}
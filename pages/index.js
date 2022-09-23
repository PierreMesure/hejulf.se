import Head from "next/head";
import ContactUs from "../components/ContactUs";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Hej Ulf!</title>
        <meta
          name="description"
          content="En enkel webbsida som hjälper dig att skicka ett klagomål till IMY"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <ContactUs />
      </main>
    </div>
  );
}

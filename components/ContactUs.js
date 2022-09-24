import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function ContactUs() {
  const [fullname, setFullname] = useState("");
  const [mia, setMia] = useState("");
  const [utlandssvensk, setUtlandssvensk] = useState("");
  const [tipsad, setTipsad] = useState("");
  const [medlem, setMedlem] = useState("");
  const [sjalv, setSjalv] = useState("");

  const imyAddress = "imy" + "@" + "imy" + "." + "se"
  const ccAddress = "klagomal" + "@" + "hejulf" + "." + "se"

  const jagFick = "Jag fick "
  const miaText = "videon via SMS (adresskälla: MIA).";
  const utlandssvenskText = "videon via brev eftersom jag är utlandssvensk.";
  const tipsadText = "videon eftersom en vän tipsade om mig.";
  const medlemText = "videon eftersom jag är registrerad moderat.";
  const sjalvText = "videon eftersom jag anmälde mig själv på Moderaternas webbplats.";

  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Skicka till Integritetsskyddsmyndigheten");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [{
      src: 'https://video.seen.io/API-moderaterna-stockholm/result/Solna-Pierre/Solna-Pierre_index.m3u8'
    }]
  }

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }

    if (!(mia || utlandssvensk|| tipsad || medlem || sjalv)) {
      tempErrors["sjalv"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      var link = "mailto:" + imyAddress + "?cc=" + ccAddress + "&subject=Klagomål om Moderaternas videokampanj&body=Hej IMY,%0D%0A%0D%0AJag heter " + fullname + ". %0D%0A%0D%0AJag hävdar att jag har drabbats av Moderaternas valkampanj och att mina personuppgifter användes utan rättslig grund och på ett felaktigt sätt. Jag skulle därför vilja skicka ett klagomål."

      var ocksa = ""

      const jagFickOcksa = (condition, text) => {
        if (condition) {
          const finalText = " " + jagFick + ocksa + text;
          ocksa = "också ";
          return finalText;
        }
        return "";
      }

      link += jagFickOcksa(mia, miaText);
      link += jagFickOcksa(utlandssvensk, utlandssvenskText);
      link += jagFickOcksa(tipsad, tipsadText);
      link += jagFickOcksa(medlem, medlemText);
      link += jagFickOcksa(sjalv, sjalvText);

      link += "%0D%0A%0D%0AFör en mer detaljerad beskrivning av klagomålet och de andra uppgifterna som ni efterfrågar kan ni ladda ner klagomålsblanketten här:%0D%0Ahttps://hejulf.se/blankett-klagomal.pdf%0D%0A%0D%0AJag önskar er en fortsatt trevlig dag.%0D%0AMvh,%0D%0A%0D%0A" + fullname;
      setButtonText("Skickar...");

      document.location = link;
    }
    console.log(fullname, mia);
  };
  return (
    <main>
      <header className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 lg:px-40 md:h-96">
        <div className="mx-auto m-5">
          <h1 className="text-6xl font-bold mt-4 dark:text-gray-50 text-gray-700">
            Hej Ulf!
          </h1>
          <h2 className="text-2xl font-bold mt-4 dark:text-gray-50 text-gray-700">
            Eller heter du något annat?
          </h2>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
            Hur som helst, har du fått ett <b className="font-bold">SMS</b>, ett <b className="font-bold">mejl</b> eller ett <b className="font-bold">brev</b> med en <b className="font-bold">personlig hälsning</b> från <b className="font-bold">Ulf Kristersson</b> nyligen?
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
            Oavsett om du hade gett ditt samtycke eller inte har Moderaterna mest sannolikt brutit mot <b className="font-bold">Europas dataskyddsförordning (GDPR)</b> för att skapa och skicka videon till dig.
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
             På denna webbsida kan du skicka ett <b className="font-bold">klagomål</b> till <b className="font-bold">Integritetsskyddsmyndigheten</b> så de utreder om du och andra har drabbats.
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
             Detta kommer förhoppningsvis leda till att myndigheten utreder händelsen och tydliggör vad politiska partier kan göra under en valrörelse. De skulle även kunna bestämma att straffa Moderaterna med böter och kompensera dig.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500"
        >
          <h1 className="text-2xl font-bold dark:text-gray-50">
            Skicka ett klagomål
          </h1>

          <label
            htmlFor="fullname"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Namn<span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name="fullname"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
          />
          {errors?.fullname && (
            <p className="text-red-500">Ditt namn behövs för att Integritetsskyddsmyndigheten kan hantera ditt klagomål.</p>
          )}
          <div className="mt-6">
            <label
            htmlFor="mia"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + miaText}
            </label>
            <input
              type="checkbox"
              name="mia"
              checked={mia}
              onChange={(e) => {
                setMia(e.target.checked);
              }}
              className="mx-3"
            />
          </div>
          <div className="mt-1">
            <label
            htmlFor="utlandssvensk"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + utlandssvenskText}
            </label>
            <input
              type="checkbox"
              name="utlandssvensk"
              checked={utlandssvensk}
              onChange={(e) => {
                setUtlandssvensk(e.target.checked);
              }}
              className="mx-3"
            />
          </div>
          <div className="mt-1">
            <label
            htmlFor="tipsad"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + tipsadText}
            </label>
            <input
              type="checkbox"
              name="tipsad"
              checked={tipsad}
              onChange={(e) => {
                setTipsad(e.target.checked);
              }}
              className="mx-3"
            />
          </div>
          <div className="mt-1">
            <label
            htmlFor="medlem"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + medlemText}
            </label>
            <input
              type="checkbox"
              name="medlem"
              checked={medlem}
              onChange={(e) => {
                setMedlem(e.target.checked);
              }}
              className="mx-3"
            />
          </div>
          <div className="mt-1">
            <label
            htmlFor="sjalv"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + sjalvText}
            </label>
            <input
              type="checkbox"
              name="sjalv"
              checked={sjalv}
              onChange={(e) => {
                setSjalv(e.target.checked);
              }}
              className="mx-3"
            />
            {errors?.sjalv && (
              <p className="text-red-500">För att skicka ett klagomål till Integritetsskyddsmyndigheten måste du ha drabbats själv genom att ha fått en personlig hälsning.</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start">
            <button
              type="submit"
              className="px-5 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
            >
              {buttonText}
            </button>
          </div>
          <div className="text-left">
            <p className="m-4 text-xs text-gray-500">När du trycker på knappen öppnas din e-post app där du kan granska klagomålet och skicka det. Inga personuppgifter behandlas. Du får gärna bifoga skärmbilder eller lägga till en länk till videon du fick.</p>
            {showSuccessMessage && (
              <p className="text-green-500 font-semibold text-sm my-2">
                Ditt klagomål skickades framgångsrikt!
              </p>
            )}
            {showFailureMessage && (
              <p className="text-red-500">
                Något gick fel!
              </p>
            )}
          </div>
        </form>
      </header>
      <section>
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 m-5 sm:mt-0 md:mt-80">
          Vad är det som Moderaterna gör fel?
        </h1>
        <div className="mx-auto m-5">
          <p className="m-5 text-xl text-gray-700 font-light dark:text-gray-200">
            Moderaterna samlade person- och kontaktuppgifter till flera hundratusentals människor under valrörelsen. De skapade och skickade personliga videohälsningar till dessa personer, oftast utan deras samtycke. Jag fick till exempel denna video som innehåller både mitt namn och min kommun.
          </p>

          <div className="m-40 mt-5 mb-5">
              <VideoPlayer {...videoJsOptions} />
          </div>


          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            I Sverige finns det ett regelverk som heter dataskyddsförordningen. Den beskriver bl.a. att en organisation måste ha en rättslig grund för att behandla personuppgifter. I detta fall hävdar jag att Moderaterna saknar en rättslig grund.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Regelverket säger även att den personuppgiftsansvariga måste förklara för användaren (dig) hur personuppgifterna behandlas och med vilka underleverantörer. Här finns det också en del brister. Moderaternas underleverantör Seen.io som skapade och lagrar videohälsningar glömde att nämna flera typer av personuppgifter som sparas och åtminstone en underleverantör som möjliggör insamlingen. De deklarerar även att personuppgifterna lagras på europeisk mark. Det stämmer tyvärr inte. I flera fall lagras de i USA, vilket betyder att de kan avlyssnats av amerikanska övervakningsmyndigheter.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Detta betyder alltså för dig som är registrerad moderat och fick (och kanske älskade) den videon att ditt parti kan ha avslöjat till utländska aktörer att du är medlem hos dem. Även om du hade ursprungligen gett ditt samtycke var detta inte ordentligt beskrivit i Moderaternas personuppgiftspolicy så du har rätt att skicka ett klagomål.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Det finns olika nyanser beroende på hur du fick videohälsningen. Jag förklarar alla situationer i klagomålets text som du kan läsa i sin helhet <a className="underline" href="./beskrivning-klagomal.pdf" target="_blank" rel="noreferrer">här</a>.
          </p>
        </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 m-5">
          Är det bara Moderaterna som gör fel?
        </h1>
        <div className="mx-auto m-5">
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Moderaterna var inte det enda partiet som skickade oönskad reklam under valrörelsen. Medierna rapporterade att även KD och SD gjorde det (<a className="underline" href="https://www.resume.se/alla-nyheter/nyheter/raseri-mot-mass-sms-en-m-och-sd-foljer-kd-s-spar/" target="_blank" rel="noreferrer">resume.se</a>).
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Tittar man lite längre bak i tiden fick Socialdemokraterna kritik för kampanjer <a className="underline" href="https://www.svt.se/nyheter/inrikes/s-skickade-ut-mass-sms-nu-anmals-partiet" target="_blank" rel="noreferrer"> 2018 och 2019</a>. Och Centerpartiet redan <a className="underline" href="https://www.aftonbladet.se/nyheter/a/6noRXz/unga-sura-over-centerns-mass-sms" target="_blank" rel="noreferrer">2010</a>.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Dessa andra partier har dock inte skickat anpassat innehåll eller skapat personligt material. Därför är Moderaterna ett mer intressant exempel.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Med detta klagomål hoppas jag att Integritetsskyddsmyndigheten utreder situationen av (riktade) reklamkampanjer under valrörelsen och återkommer med generella riktlinjer för de kommande valen.
          </p>
        </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 m-5">
          Hur funkar denna webbsida?
        </h1>
        <div className="mx-auto m-5">
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Syftet med denna sida är enbart att förklara problemen med Moderaternas kampanj och sänka tröskeln för att enskilda medborgare som har fått en personlig hälsning ska kunna skicka ett klagomål.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Vem som helst kan idag skicka ett klagomål men processen är inte helt okomplicerad. Dessutom finns det en större chans att Integritetsskyddsmyndigheten utreder situationen djupare om de får ett större antal klagomål.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Till skillnad från Moderaterna sparar denna webbsida inga personuppgifter om dig. Inte ens antalet besökare sparas. När du trycker på knappen för att skicka används din enhets e-postapp. Det enda webbsidan gör är att skicka en mall för e-postet vidare till appen.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Du kan såklart redigera e-postets text innan du skickar det.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto m-5">
          <p className="m-5 text-m text-gray-700 mt-0 font-light dark:text-gray-200 italic">
            Denna webbsida togs fram av <a className="underline" href="https://www.linkedin.com/in/pierremesure/" target="_blank" rel="noreferrer">Pierre Mesure</a> och publiceras som <a className="underline" href="http://github.com/PierreMesure/hejulf.se" target="_blank" rel="noreferrer">öppen källkod</a> (CC-BY 4.0).
          </p>
        </div>
      </section>
    </main>
  );
}

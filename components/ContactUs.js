import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function ContactUs() {
  const [fullname, setFullname] = useState("");
  const [mia, setMia] = useState("");
  const [utlandssvensk, setUtlandssvensk] = useState("");
  const [tipsad, setTipsad] = useState("");
  const [medlem, setMedlem] = useState("");
  const [sjalv, setSjalv] = useState("");
  const [delegera, setDelegera] = useState("");

  const imyAddress = "imy" + "@" + "imy" + "." + "se"
  const ccAddress = "klagomal" + "@" + "hejulf" + "." + "se"
  const moderatAddress = "dataskyddsombud" + "@" + "moderaterna" + "." + "se"

  const jagFick = "Jag fick "
  const title = {
    mia: "videon via SMS (adresskälla: MIA).",
    utlandssvensk: "videon via brev eftersom jag är utlandssvensk.",
    tipsad: "videon eftersom en vän tipsade om mig.",
    medlem: "videon eftersom jag är registrerad moderat.",
    sjalv: "videon eftersom jag anmälde mig själv på Moderaternas webbplats."
  }

  const body = {
    mia: "Behandlingen skedde efter att mina personuppgifter (namn, kommun, telefonnummer) köptes från adresskällan MIA av Moderaterna eller deras underleverantör. Jag skulle vilja att ni utreder om behandlingen av dessa uppgifter i följd av detta inköp var i enlighet med dataskyddsförordningen eller om Moderaterna hade behövt ta ytterligare åtgärder (t.ex. samla mitt samtycke eller söka utgivningsbevis) innan deras underleverantör utförde behandlingen.",
    utlandssvensk: "Jag är utlandssvensk och fick ett brev med en QR-kod som ledde till videon. Enligt deras egen kommunikationschef har 160 000 personer fått sina personuppgifter (namn, adress och land) behandlade för att möjliggöra sådana utskick. Jag skulle vilja att ni utreder om behandlingen av dessa uppgifter var i enlighet med dataskyddsförordningen eller om Moderaterna hade behövt ta ytterligare åtgärder (t.ex. samla mitt samtycke eller söka utgivningsbevis) innan deras underleverantör utförde behandlingen.",
    tipsad: "Behandlingen skedde efter att en annan person gav mina personuppgifter till Moderaterna med ett så-kallat “tipsa en vän” formulär. Moderaterna bad personen om deras samtycke innan att skicka till mig. Jag hävdar att Moderaterna har ingen rättslig grund för behandlingen enligt dataskyddsförordningens artikel 6 men skulle vilja att ni utreder om “tipsarens” samtycke räcker för att utföra en behandling av mina egna personuppgifter. Jag hävdar även att de oavsett borde ha informerat mig innan behandlingen påbörjades enligt artikeln 14, och att detta inte gjordes.  När jag fick en länk till videon (efter behandlingen hade skett) fick jag även möjligheten att ge mitt samtycke innan jag fick se videon. Jag skulle vilja att ni utreder om det räcker att samla mitt samtycke i efterhand i detta fall eller om detta strider mot dataskyddsförordningen.",
    medlem: "Jag är medlem i Moderaterna och blev utsatt för en liknande behandling. Personliga video-hälsningar har skickats till medlemmar under hela kampanjen. Moderaterna har en personuppgiftspolicy där de beskriver hur de använder medlemmarnas personuppgifter. Jag skulle vilja att ni utreder om detta dokument informerade medlemmarna ordentligt om möjligheten av en sådan behandling och att deras uppgifter skulle delas med underleverantörerna som utförde behandlingen.",
    sjalv: "Jag skickade mitt förnamn, efternamn, e-postadress och min kommun för att frivilligt få en sådan video. Jag gav mitt samtycke i förhand men jag anser nu att mina personuppgifter har använts på ett sätt som inte respekterar dataskyddsförordningen. Jag skulle då vilja att ni utreder om behandlingen gjordes i enlighet med dataskyddsförordningen, med särskild hänsyn till vad som följer."
  }
  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Skapa ett klagomål");

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
      var link = "mailto:" + imyAddress;
      link += "?subject=Klagomål om Moderaternas videokampanj";
      link += "&body=Hej IMY,";
      link += "%0D%0A%0D%0A";

      link += "Jag heter " + fullname + ".";
      link += "%0D%0A%0D%0A";

      link += "Jag hävdar att jag har drabbats av en kommunikationskampanj som Moderaterna gjorde under valrörelsen och att mina personuppgifter användes utan rättslig grund och på ett felaktigt sätt. Jag skulle därför vilja skicka ett klagomål.";
      link += "%0D%0A%0D%0A";

      link += "Här under kan ni läsa mina svar till frågorna ni ställer i blanketten. Detta klagomål skrevs med hjälp av hejulf.se.";
      link += "%0D%0A";

      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Har du kontaktat den som är personuppgiftsansvarig" + "%0D%0A";
      link += "och fört fram dina klagomål?";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Nej.";
      link += "%0D%0A%0D%0A";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Du som anmäler";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "– Namn: " + fullname + "%0D%0A";
      link += "– E-postadress: Se mejlavsändaren.";
      link += "%0D%0A%0D%0A";

      if (delegera) {
        link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
        link += "Annan kontaktperson för anmälan";
        link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
        link += "– Namn: Pierre Mesure" + "%0D%0A";
        link += "– E-postadress: " + ccAddress + "%0D%0A";
        link += "– Är det denna person som ska vara kontaktperson? Ja.";
        link += "%0D%0A%0D%0A";
      }

      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Vad har inträffat?";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "På vilket sätt har personuppgifter behandlats felaktigt?";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "✔︎ Bristfällig information till exempel att den personuppgiftsansvariga inte har informerat om hur dina personuppgifter kommer att behandlas." + "%0D%0A";
      link += "✔︎ Bristande säkerhet hos personuppgiftsansvarig, till exempel för behörighetshantering eller organisationens rutiner." + "%0D%0A";
      link += "✔︎ Övrigt: Behandling av personuppgifter utan rättslig grund." + "%0D%0A";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Beskriv vad som hänt";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Jag fick under valrörelsen en personlig videohälsning från Moderaterna.";
      link += "%0D%0A%0D%0A";
      link += "Moderaterna har med hjälp av sin underleverantör Seen.io skapat videomaterial med mitt namn och min kommun/land. ";
      link += "Kopplat med mina kontaktuppgifter, min IP-adress när jag öppnar videon från min webbläsare och ett antal personliga identifierare blir den personliga video-hälsningen ett material som innehåller personuppgifter och jag anser att processen för att skapa videon och skicka den till mig utgör en behandling av mina personuppgifter. ";
      link += "I resten av texten kommer ordet “behandling” referera till det som beskrevs i denna paragraf.";

      var ocksa = "";
      var siffra = 0;

      const jagFickOcksa = (condition, key) => {
        if (condition) {
          siffra ++;
          var finalText = "%0D%0A%0D%0A" + siffra + ". " + jagFick + ocksa + title[key];
          finalText += "%0D%0A%0D%0A" + body[key];
          ocksa = "också ";
          return finalText;
        }
        return "";
      }

      link += jagFickOcksa(mia, "mia");
      link += jagFickOcksa(utlandssvensk, "utlandssvensk");
      link += jagFickOcksa(tipsad, "tipsad");
      link += jagFickOcksa(medlem, "medlem");
      link += jagFickOcksa(sjalv, "sjalv");

      link += "%0D%0A%0D%0A";

      link += "För att genomföra de ovan nämnda kampanjerna använde Moderaterna en tjänst från underleverantören Seen.io. Även Seen.io använde ett antal underleverantörer och beskriver vissa av dem i sin personuppgiftspolicy: Amazon AWS. Google GCP och LINK Mobility Sweden (som i sin tur använder AWS, och Microsoft Azure)." + "%0D%0A";
      link += "Trots att Seen.io deklarerar att uppgifterna lagras i Europa kan man med en snabb utredning se att alla resurser från den personliga hälsningen hämtas från servrar hos Amazon i USA (möjligtvis i Seattle, IP-adressen är 2600:9000:2395:6600:1b:2608:f500:93a1)." + "%0D%0A";
      link += "Jag märker även att Seen.io glömde att beskriva att de använder sig av en till underleverantör, nämligen Sentry.io för webbanalys. Denna tjänst är också amerikansk och erkänner kunna behandla sina kunders data i USA. Sannolikt samlar Sentry även andra personuppgifter som inte nämnts någonstans i personuppgiftspolicies. Vanligtvis sparar verktyget metadata om enheten, IP-adressen, webbläsarspråk osv." + "%0D%0A";
      link += "Jag anser att jag drabbades av denna överföring till tredjeland. Jag skulle därför vilja att ni utreder om behandlingen skedde i enlighet med dataskyddsförordningen, och om informationen som skrev i deras personuppgiftspolicies var korrekt och omfattande. Och om behandlingen i Europa skedde i enlighet med dataskyddsförordningen och Schrems II-domen." + "%0D%0A";

      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "Organisationen som ditt klagomål gäller";
      link += "%0D%0A" + "––––––––––––––––––––––––––––-" + "%0D%0A";
      link += "– Organisationens namn: Moderata Samlingspartiets Riksorganisation" + "%0D%0A";
      link += "– E-postadress: " + moderatAddress + "%0D%0A";
      link += "– Webbplats: moderaterna.se";
      link += "%0D%0A%0D%0A";
      link += "Jag önskar er en fortsatt trevlig dag.";
      link += "%0D%0A";
      link += "Mvh,";
      link += "%0D%0A%0D%0A";
      link += fullname;

      setButtonText("Skickar...");

      document.location = link;
    }
    console.log(fullname, mia);
  };
  return (
    <main>
      <header className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 lg:px-40 md:h-100">
        <div className="mx-auto m-5">
          <h1 className="text-6xl font-bold mt-4 dark:text-gray-50 text-gray-700">
            Hej Ulf! 👋🏼
          </h1>
          <h2 className="text-2xl font-bold mt-4 dark:text-gray-50 text-gray-700">
            Eller heter du något annat?
          </h2>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
            Hur som helst, har du fått ett <b className="font-bold">SMS</b> 💬, ett <b className="font-bold">mejl</b> 📧 eller ett <b className="font-bold">brev</b> ✉️ med en <b className="font-bold">personlig hälsning</b> från <b className="font-bold">Ulf Kristersson</b> nyligen?
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
            Oavsett om du hade gett ditt samtycke eller inte har Moderaterna mest sannolikt brutit mot <b className="font-bold">Europas dataskyddsförordning (GDPR)</b> 🇪🇺 för att skapa och skicka videon till dig.
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
             På denna webbsida kan du skicka ett <b className="font-bold">klagomål</b> till <b className="font-bold">Integritetsskyddsmyndigheten</b> så de utreder om du och andra har drabbats.
          </p>
          <p className="text-xl text-gray-700 mt-4 font-light dark:text-gray-200">
             Detta kommer förhoppningsvis leda till att myndigheten tydliggör vad politiska partier kan göra under en valrörelse. De kan även ta ut en <a className="underline" href="https://www.imy.se/om-oss/vart-uppdrag/sa-arbetar-vi-med-tillsyn/vad-kan-tillsynen-leda-till/" target="_blank" rel="noreferrer">sanktionsavgift</a>.
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
            <p className="text-red-500">Ditt namn behövs för att Integritetsskyddsmyndigheten ska kunna hantera ditt klagomål.</p>
          )}
          <div className="mt-6">
            <label
            htmlFor="mia"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              {jagFick + title["mia"]}
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
              {jagFick + title["utlandssvensk"]}
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
              {jagFick + title["tipsad"]}
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
              {jagFick + title["medlem"]}
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
              {jagFick + title["sjalv"]}
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
          <div className="mt-5">
            <label
            htmlFor="delegera"
            className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              Jag föredrar att du står som kontaktperson för uppföljningen.
            </label>
            <input
              type="checkbox"
              name="delegera"
              checked={delegera}
              onChange={(e) => {
                setDelegera(e.target.checked);
              }}
              className="mx-3"
            />
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
            <p className="m-4 text-xs text-gray-500">När du trycker på knappen öppnas din e-post app där du kan granska klagomålet och skicka det. Dina personuppgifter delas inte med oss och lämnar inte din enhet tills du skickar dem till myndigheten. Du får gärna bifoga skärmbilder eller lägga till en länk till videon du fick.</p>
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
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 mx-10 mt-5 mb-0">
          Vad är det som Moderaterna gör fel?
        </h1>
        <div className="mx-10 m-5">
          <p className="m-5 text-xl text-gray-700 font-light dark:text-gray-200">
            Moderaterna samlade person- och kontaktuppgifter till flera hundratusentals människor under valrörelsen. De skapade och skickade personliga videohälsningar till dessa personer, oftast utan deras samtycke. Jag fick till exempel denna video som innehåller både mitt namn och min kommun.
          </p>

          <div className="sm:mx-10 md:mx-20 lg:mx-80 my-5">
              <VideoPlayer {...videoJsOptions} />
          </div>


          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            I Sverige finns det ett regelverk som heter dataskyddsförordningen. Den beskriver bl.a. att en organisation måste ha en rättslig grund för att behandla personuppgifter. I detta fall hävdar jag att Moderaterna saknar en rättslig grund.
          </p>
          <p className="m-5 text-xl text-gray-700 mt-0 font-light dark:text-gray-200">
            Regelverket säger även att den personuppgiftsansvariga måste förklara för användaren (dig) hur personuppgifterna behandlas och med vilka underleverantörer. Här finns det också en del brister. Moderaterna och deras underleverantör Seen.io som skapade och lagrar videohälsningar glömde att nämna flera typer av personuppgifter som sparas och åtminstone en underleverantör som möjliggör insamlingen. De deklarerar även att personuppgifterna lagras på europeisk mark. Vad jag kan se stämmer det tyvärr inte. I flera fall lagras de i USA, vilket betyder att de kan avlyssnats av amerikanska övervakningsmyndigheter.
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
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 mx-10 mt-5 mb-0">
          Är det bara Moderaterna som gör fel?
        </h1>
        <div className="mx-10 m-5">
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
        <h1 className="text-4xl font-bold text-center gradient-text text-gray-700 mx-10 mt-5 mb-0">
          Hur funkar denna webbsida?
        </h1>
        <div className="mx-10 m-5">
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
            Du kan såklart redigera e-postets text innan du skickar det och lägga till detaljer, skärmbilder...
          </p>
        </div>
      </section>
      <section>
        <div className="mx-10 m-5">
          <p className="m-5 text-m text-gray-700 mt-0 font-light dark:text-gray-200 italic">
            Denna webbsida togs fram av <a className="underline" href="https://www.linkedin.com/in/pierremesure/" target="_blank" rel="noreferrer">Pierre Mesure</a> och publiceras som <a className="underline" href="http://github.com/PierreMesure/hejulf.se" target="_blank" rel="noreferrer">öppen källkod</a> (CC-BY 4.0).
          </p>
        </div>
      </section>
    </main>
  );
}

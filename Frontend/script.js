/*
  script.js
  Simpele functies:
  1. speelFilm() => speelt de film
  4. toggleTheme() => switcht tussen dark en light mode
*/

document.addEventListener("DOMContentLoaded", function () {
  laadOpgeslagenThema();
  stopVideoBijSluiten();});


  //Film openen


  function speelFilm(titel, videoUrl, ondertitelUrl) {
  const filmVenster = document.getElementById("filmVenster");
  const filmTitel = document.getElementById("filmTitel");
  const filmSpeler = document.getElementById("filmSpeler");

  // Als de videospeler niet bestaat op deze pagina, stop dan veilig
  if (!filmVenster || !filmTitel || !filmSpeler) {
    return;
  }

  // Titel boven de video zetten
  filmTitel.textContent = titel;

  // Oude video verwijderen
  filmSpeler.pause();
  filmSpeler.innerHTML = "";

  // Nieuwe video toevoegen
  filmSpeler.innerHTML = `
    <source src="${videoUrl}" type="video/mp4">
  `;

  // Ondertitels toevoegen als er een ondertitelbestand is
  if (ondertitelUrl) {
    filmSpeler.innerHTML += `
      <track 
        src="${ondertitelUrl}" 
        kind="subtitles" 
        srclang="nl" 
        label="Nederlands" 
        default>
    `;
  }

  // Video laden
  filmSpeler.load();

  // Popup openen
  const popup = new bootstrap.Modal(filmVenster);
  popup.show();
}

//Switch dark light mode


function toggleTheme() {
  const html = document.documentElement;
  const huidigThema = html.getAttribute("data-bs-theme");

  if (huidigThema === "light") {
    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("thema", "dark");
  } else {
    html.setAttribute("data-bs-theme", "light");
    localStorage.setItem("thema", "light");
  }
}

// Video stoppen als vesnter sluit 

function stopVideoBijSluiten() {
  const filmVenster = document.getElementById("filmVenster");
  const filmSpeler = document.getElementById("filmSpeler");

  // Als de videospeler niet bestaat op deze pagina, stop dan veilig
  if (!filmVenster || !filmSpeler) {
    return;
  }

  filmVenster.addEventListener("hidden.bs.modal", function () {
    filmSpeler.pause();
    filmSpeler.innerHTML = "";
  });
}
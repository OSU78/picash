export const API_URL = "http://162.19.65.178:8080"





export const  estimerDureeEtImages = (texte)=> {
  // Estimation du nombre de mots par minute
  let motsParMinute = 145;
  
  // Calculer le nombre de mots dans le texte
  let nombreMots = texte.split(' ').length;
  
  // Estimer la durée en minutes
  let dureeMinutes = nombreMots / motsParMinute;
  
  // Convertir la durée en secondes pour le calcul d'images
  let dureeSecondes = dureeMinutes * 60;
  
  // Calculer le nombre d'images, une image toutes les 4 secondes
  let nombreImages = dureeSecondes / 4;
  
  // Arrondir au nombre supérieur pour le nombre d'images
  let nombreImagesArrondi = Math.ceil(nombreImages);
  
  return nombreImagesArrondi;
}

// // Exemple d'utilisation
// let texte = "Exemple de texte pour tester la fonction, supposons que ce soit une phrase assez longue pour avoir une idée approximative.";
// let nombreImages = estimerDureeEtImages(texte);
// console.log(`Nombre d'images estimé : ${nombreImages}`);



// Fonction utilitaire pour définir un cookie
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  };
  
  // Fonction utilitaire pour obtenir un cookie
export const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };
  
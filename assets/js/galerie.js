/* ==========================================================
   GALERIE PHOTOS (page Réalisations)

   Pour ajouter une photo :
   1. Déposez l'image dans le dossier  assets/images/galerie/
      (idéalement en JPG, largeur 1600 px maximum, moins de 500 Ko).
   2. Ajoutez une ligne dans la liste GALERIE ci-dessous.
   3. Enregistrez : la photo apparaît dans la galerie, avec
      agrandissement au clic (flèches du clavier et Échap compris).

   Exemple :
     { fichier: "assets/images/galerie/slam-2025-01.jpg", legende: "Finale du concours de slam interuniversitaire, Kindu, 2025" },

   Tant que la liste est vide, un message « Galerie bientôt disponible » s'affiche.
   ========================================================== */
var GALERIE = [
  /* Ajouter ici vos photos, une ligne par photo */
];

(function () {
  "use strict";
  var box = document.getElementById("gallery");
  if (!box || !GALERIE.length) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  box.innerHTML = GALERIE.map(function (p) {
    var alt = esc(p.legende || "Photographie d'un événement");
    return '<button class="gallery-item" type="button" data-full="' + esc(p.fichier) + '" data-alt="' + alt + '">' +
      '<img src="' + esc(p.fichier) + '" alt="' + alt + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></button>';
  }).join("");
})();

/* ==========================================================
   ACTUALITÉS — pour ajouter une publication, copiez un bloc
   dans la liste ACTUALITES ci-dessous, puis remplissez-le.
   Tant que la liste est vide, un message d'attente s'affiche.
   Aucune fausse actualité n'est fournie.

   Exemple de publication (à décommenter et adapter) :
   {
     date: "2026-01-15",                       // AAAA-MM-JJ
     categorie: "Jeunesse",
     titre: "Titre de la publication",
     resume: "Court résumé de deux ou trois phrases.",
     image: "assets/images/evenement-1.jpg",   // image de couverture
     lien: ""                                   // lien « Lire la suite » (page ou URL)
   },
   ========================================================== */
var ACTUALITES = [
  /* Ajouter ici les publications réelles */
];

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(d) {
    var dt = new Date(d + "T00:00:00");
    if (isNaN(dt)) return esc(d);
    return dt.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }
  function card(a) {
    var link = a.lien
      ? '<a class="news-link" href="' + esc(a.lien) + '">Lire la suite <i class="bi bi-arrow-right"></i></a>'
      : '<span class="news-link" style="color:var(--muted)">Détails à venir</span>';
    return '<article class="news-card reveal visible">' +
      '<div class="news-cover"><img src="' + esc(a.image) + '" alt="' + esc(a.titre) + '" loading="lazy" data-fallback="cover"></div>' +
      '<div class="news-body">' +
        '<div class="news-meta"><time datetime="' + esc(a.date) + '"><i class="bi bi-calendar3"></i> ' + fmtDate(a.date) + '</time>' +
        '<span class="badge">' + esc(a.categorie) + '</span></div>' +
        '<h3>' + esc(a.titre) + '</h3>' +
        '<p>' + esc(a.resume) + '</p>' + link +
      '</div></article>';
  }
  var emptyHTML =
    '<div class="news-empty"><i class="bi bi-hourglass-split"></i>' +
    '<h3>Les actualités arrivent bientôt</h3>' +
    '<p>Aucune publication n\'est disponible pour le moment. Revenez prochainement pour suivre les activités et initiatives.</p></div>';

  function sorted() {
    return ACTUALITES.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  /* Page Actualités : liste complète + filtres par catégorie */
  var full = document.getElementById("news-list");
  if (full) {
    var list = sorted();
    var filters = document.getElementById("news-filters");
    function render(cat) {
      var shown = cat ? list.filter(function (a) { return a.categorie === cat; }) : list;
      full.innerHTML = shown.length ? shown.map(card).join("") : emptyHTML;
      full.className = shown.length ? "news-grid" : "";
    }
    if (filters && list.length) {
      var cats = [];
      list.forEach(function (a) { if (cats.indexOf(a.categorie) < 0) cats.push(a.categorie); });
      filters.innerHTML = '<button class="filter-btn active" data-cat="">Toutes</button>' +
        cats.map(function (c) { return '<button class="filter-btn" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }).join("");
      filters.addEventListener("click", function (e) {
        var b = e.target.closest(".filter-btn");
        if (!b) return;
        filters.querySelectorAll(".filter-btn").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        render(b.getAttribute("data-cat"));
      });
    } else if (filters) { filters.style.display = "none"; }
    render("");
  }

  /* Accueil : trois dernières publications */
  var home = document.getElementById("news-latest");
  if (home) {
    var latest = sorted().slice(0, 3);
    home.innerHTML = latest.length ? latest.map(card).join("") : emptyHTML;
    home.className = latest.length ? "news-grid" : "";
  }
})();

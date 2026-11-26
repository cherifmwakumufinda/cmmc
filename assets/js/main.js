/* Chérif Mwaku Mufinda — scripts communs (JavaScript Vanilla) */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ----- Menu mobile ----- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ----- Header sticky, progression, retour en haut ----- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress");
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----- Apparition au défilement ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ----- Réseaux sociaux : renseignez ici les adresses complètes de vos pages -----
     Exemple : facebook: "https://www.facebook.com/votre.page"
     Les liens s'ouvrent dans un nouvel onglet, partout sur le site (pied de page et Contact). */
  var SOCIAL = {
    facebook: "https://www.facebook.com/cherif.mwaku.2025",
    instagram: "https://www.instagram.com/cherif_mwaku",
    x: "https://x.com/mwaku_cherif",
    linkedin: "https://www.linkedin.com/in/ch%C3%A9rif-mwaku-8241672a7"
  };
  document.querySelectorAll("a[data-social]").forEach(function (a) {
    var url = SOCIAL[a.getAttribute("data-social")];
    if (url) {
      a.href = url;
    } else {
      a.title = "Lien à renseigner (assets/js/main.js)";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  /* ----- Images manquantes (logo / photo) : repli propre, sans créer de faux logo ----- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function miss() {
      var type = img.getAttribute("data-fallback");
      if (type === "photo") {
        var box = img.closest(".frame, .hero-photo-frame, .media");
        if (box) box.classList.add("is-missing");
      } else if (type === "logo") {
        img.style.display = "none";
      } else if (type === "hide") {
        var m = img.closest(".media");
        if (m) m.style.display = "none";
      } else if (type === "cover") {
        img.style.display = "none";
      }
    }
    if (img.complete && img.naturalWidth === 0) miss();
    img.addEventListener("error", miss);
  });

  /* ----- Transition douce entre les pages ----- */
  document.querySelectorAll("a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(https?:|mailto:|tel:)/.test(href) || a.target === "_blank") return;
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(function () { window.location.href = a.href; }, 180);
    });
  });
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) document.body.classList.remove("leaving");
  });

  /* ----- Galerie avec agrandissement ----- */
  var items = [];
  var lb = document.getElementById("lightbox");
  var galleryBox = document.getElementById("gallery");
  if (lb && galleryBox) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var idx = 0;
    var opener = null;
    function show(i) {
      idx = (i + items.length) % items.length;
      lbImg.src = items[idx].getAttribute("data-full");
      lbImg.alt = items[idx].getAttribute("data-alt") || "";
      lbCap.textContent = items[idx].getAttribute("data-alt") || "";
    }
    function openLb(i) { opener = items[i]; show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); lb.querySelector(".lightbox-close").focus(); }
    function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); if (opener) opener.focus(); }
    galleryBox.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery-item[data-full]");
      if (!b) return;
      items = Array.prototype.slice.call(galleryBox.querySelectorAll(".gallery-item[data-full]")).filter(function (x) { return x.style.display !== "none"; });
      openLb(items.indexOf(b));
    });
    lb.querySelector(".lightbox-close").addEventListener("click", closeLb);
    lb.querySelector(".lightbox-prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lightbox-next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ----- Formulaire de contact : ouverture réelle du client e-mail (mailto) -----
     Aucun envoi n'est simulé. Renseignez CONTACT_EMAIL, ou utilisez un service
     compatible sites statiques (voir README.md) en renseignant FORM_ENDPOINT. */
  var CONTACT_EMAIL = "cherifmwakumufinda@gmail.com";   // utilisé seulement si FORM_ENDPOINT est vide
  var FORM_ENDPOINT = "https://formspree.io/f/xaeovknv";   // Formspree : envoi direct dans votre boîte mail

  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    function say(msg, err) {
      status.textContent = msg;
      status.className = "form-status show" + (err ? " error" : "");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      var nom = data.get("nom"), email = data.get("email"), sujet = data.get("sujet"), message = data.get("message");

      if (FORM_ENDPOINT) {
        say("Envoi en cours…");
        fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (r.ok) { form.reset(); say("Merci, votre message a bien été transmis."); }
            else { say("L'envoi a échoué. Veuillez réessayer ou écrire directement par e-mail.", true); }
          })
          .catch(function () { say("Erreur réseau. Veuillez réessayer plus tard.", true); });
        return;
      }
      if (CONTACT_EMAIL) {
        var body = "Nom : " + nom + "\nE-mail : " + email + "\n\n" + message;
        window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(body);
        say("Votre application de messagerie va s'ouvrir pour finaliser l'envoi.");
        return;
      }
      say("Le formulaire n'est pas encore relié à une adresse e-mail. Le propriétaire du site doit renseigner CONTACT_EMAIL ou FORM_ENDPOINT dans assets/js/main.js (voir README.md).", true);
    });
  }
})();

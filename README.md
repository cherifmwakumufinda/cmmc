# Site officiel — Chérif Mwaku Mufinda

Site web statique (HTML5, CSS3, JavaScript Vanilla) prêt pour GitHub Pages. Aucun backend, aucune compilation.

## Ressources à ajouter (non fournies avec ce projet)

| Fichier | Rôle |
|---|---|
| `assets/images/logo.png` (ou `logo.svg`) | **Logo officiel** — en-tête, pied de page, favicon. Ne pas le modifier. Si vous fournissez un SVG, remplacez `logo.png` par `logo.svg` dans les pages. |
| `assets/images/profil-cherif.jpg` | Portrait professionnel (format vertical 4:5 recommandé) |
| `assets/images/hero-bg.jpg` | Image de fond optionnelle de l'accueil (aussi utilisée pour Open Graph) |
| `assets/images/evenement-1.jpg`, `evenement-2.jpg` | Images d'événements (couvertures d'actualités) |
| `assets/images/galerie/` | Photos de la galerie (page Réalisations) |
| `assets/fonts/Down.ttf` | Police **Down** (déjà déclarée par `@font-face`, repli sans-serif tant qu'elle est absente) |

Tant que le logo ou la photo sont absents, le site affiche un repli discret (aucun faux logo n'est créé).

## Informations à renseigner

- **E-mail, téléphone, Facebook, LinkedIn** : pages `contact.html` et pied de page (repères « à renseigner »).
- **Formulaire de contact** (`assets/js/main.js`, en haut de la section formulaire) :
  - `CONTACT_EMAIL = "adresse@exemple.com"` → ouvre la messagerie du visiteur (mailto) ; ou
  - `FORM_ENDPOINT = "https://formspree.io/f/xxxx"` → service compatible sites statiques (Formspree, Getform…).
  - Tant qu'aucun des deux n'est défini, le site affiche un message d'erreur honnête et ne simule aucun envoi.
- **Sitemap / robots / Open Graph** : remplacez `VOTRE-COMPTE` par votre nom d'utilisateur GitHub dans `sitemap.xml`, `robots.txt` et les balises `og:image`.

## Ajouter des actualités

Éditez `assets/js/actualites.js` : copiez l'exemple commenté dans la liste `ACTUALITES`. Tant que la liste est vide, un message d'attente élégant s'affiche (aucune fausse actualité).

## Ajouter des photos à la galerie

Voir le commentaire dans `realisations.html` : déposez les images dans `assets/images/galerie/` et ajoutez un bloc `gallery-item` (agrandissement, navigation clavier et flèches inclus).

## Publier sur GitHub Pages

1. Créez un compte sur [github.com](https://github.com) si nécessaire.
2. Créez un nouveau dépôt nommé `cherif-mwaku-portfolio` (public).
3. Importez tous les fichiers du dossier (bouton *Add file → Upload files*), à la racine du dépôt.
4. Ouvrez **Settings**.
5. Accédez à **Pages**.
6. Sous *Build and deployment*, choisissez **Deploy from a branch**.
7. Sélectionnez la branche **main** et le dossier **/ (root)**.
8. Cliquez sur **Save** et patientez une à deux minutes.
9. Vérifiez l'adresse publique : `https://VOTRE-COMPTE.github.io/cherif-mwaku-portfolio/`

## Notes techniques

- Tous les chemins sont **relatifs** : le site fonctionne dans un sous-répertoire GitHub Pages.
- Test local : `python3 -m http.server` puis ouvrir `http://localhost:8000/`.
- Palette : bleu `#123B70`, jaune `#F5C518`, rouge `#D62828`, blanc `#FFFFFF`. Typographies : Down (titres), Arial (texte).
- Icônes : Bootstrap Icons (CDN). Hors connexion, les icônes ne s'affichent pas ; pour un usage 100 % local, téléchargez la bibliothèque dans `assets/`.
- La page `404.html` est servie par GitHub Pages pour les adresses inconnues ; ses liens sont relatifs à la racine du dépôt.

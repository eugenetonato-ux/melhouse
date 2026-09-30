# PROMPT DE DÉVELOPPEMENT — Landing Page "LE MEL HOUSE"

> À coller tel quel dans Cursor / Codex. Ce document liste aussi les fichiers à créer manuellement (voir section 3).

---

## 1. Rôle de l'IA

Tu es un développeur front-end senior, spécialisé en design de landing pages e-commerce vitrine, UX/UI, animations web modernes (GSAP, Lenis) et copywriting orienté conversion. Tu dois produire un site web statique multi-pages, propre, rapide et premium.

## 2. Objectif

Construire le site vitrine de **LE MEL HOUSE**, boutique en ligne béninoise vendant des vêtements, chaussures, montres et accessoires de mode. Le site n'a **aucun paiement en ligne, aucun compte client, aucun panier**. Son unique rôle est de présenter les produits et de rediriger chaque visiteur intéressé vers **WhatsApp** pour finaliser la commande avec le vendeur.

## 3. Contexte

- Nom : **LE MEL HOUSE**
- Produits : vêtements (T-shirts, Chemises, Pantalons, Jeans,  , Ensembles), chaussures/baskets (Sneakers, Baskets, Chaussures classiques, Sandales), montres (Montres homme, Montres femme, Montres classiques, Montres sport), accessoires (Lunettes, Ceintures, Sacs, Casquettes, Bijoux)
- Canal de commande unique : **WhatsApp**, numéro **+229 01 51 83 32 07**
- Aucun email de commande côté client (une adresse Gmail existe seulement pour la gestion interne du projet, elle n'apparaît pas comme canal de contact commercial)
- Logo existant : cercle noir avec cercles concentriques orange, texte "LE MEL HOUSE", pictogrammes (basket, montre, écouteurs, cintre, sac, caddie)
- Référence structurelle existante : template "Aurelia Grand Hotel" (HTML/CSS/JS statique, Tailwind CSS, GSAP + ScrollTrigger, Lenis, Font Awesome, Google Fonts Poppins + Cormorant Garamond, élément signature "Le Fil d'Or" — trait doré animé au scroll). **Conserve cette base technique et cet élément signature**, en l'adaptant à la nouvelle palette et au nouveau contenu.
- Les produits réels (photos, prix, descriptions) seront ajoutés manuellement plus tard par le propriétaire : prévoir une structure facilement duplicable/remplaçable, jamais des données figées dans le design.

## 4. Palette de couleurs (dominante orange / blanc / noir)

Inspirée des couleurs d'une capture d'écran d'application e-commerce (Fashora) — **uniquement pour la couleur, pas pour la structure UI, qui reste celle du cahier des charges LE MEL HOUSE**.

```css
:root {
  --color-primary: #FF6A13;      /* orange principal - CTA, accents */
  --color-primary-dark: #E85A00; /* orange hover/active */
  --color-primary-light: #FFE4CF;/* fond doux orange pour cards/badges */
  --color-black: #111111;        /* fond sombre, textes forts, header */
  --color-black-soft: #1F1F1F;   /* sections sombres alternées */
  --color-white: #FFFFFF;
  --color-gray-50: #FAFAFA;
  --color-gray-200: #E5E5E5;
  --color-text: #1A1A1A;
  --color-text-muted: #6B6B6B;
}
```

## 5. Typographie

- Titres : **Cormorant Garamond** (élégance, univers mode) — poids 500/600
- Corps de texte, UI, boutons : **Poppins** — poids 400/500/600
- Hiérarchie : H1 36–56px / H2 28–36px / H3 20–24px / body 16px / small 13–14px
- Line-height généreux (1.5–1.7) sur les textes de présentation, plus serré (1.2) sur les titres

## 6. Architecture des fichiers (multi-pages)

Chaque page ci-dessous doit être un fichier `.html` distinct, reliés par une navigation commune (header/footer inclus dans chaque page). Voici les fichiers à créer :

| Fichier | Contenu / rôle |
|---|---|
| `index.html` | Hero + phrase d'accroche + présentation courte de la boutique + aperçu des 4 catégories + produits mis en avant + argument commercial (points forts) + CTA final + footer |
| `categories.html` | Les 4 catégories, chacune avec ses sous-catégories/noms de produits, menant vers `boutique.html` filtré : **Vêtements** (T-shirts, Chemises, Pantalons, Jeans,  , Ensembles) · **Chaussures** (Sneakers, Baskets, Chaussures classiques, Sandales) · **Montres** (Montres homme, Montres femme, Montres classiques, Montres sport) · **Accessoires** (Lunettes, Ceintures, Sacs, Casquettes, Bijoux) |
| `boutique.html` | Catalogue complet des produits sous forme de cartes, avec filtre par catégorie en JS (sans rechargement de page). Chaque carte pointe vers le fichier statique correspondant dans `produits/` |
| `produits/[nom-du-produit].html` | Un fichier statique **par produit** (ex. `produits/bomber-jacket-orange.html`), copié depuis un modèle de fiche produit : photo, nom, catégorie, prix, description, tailles/couleurs si besoin, bouton WhatsApp pré-rempli avec le nom du produit. Facile à dupliquer et modifier un par un sans toucher au reste du site |
| `comment-commander.html` | Les 5 étapes du parcours de commande (consulter → choisir → WhatsApp → échanger → livraison/paiement) |
| `galerie.html` | Galerie visuelle de l'univers de la boutique (vêtements, chaussures, montres, accessoires, photos portées) |
| `contact.html` | Localisation, horaires si besoin, réseaux sociaux, bouton WhatsApp principal, footer détaillé |
| `css/style.css` | Variables CSS, design system, styles partagés à toutes les pages |
| `js/main.js` | Navigation, menu mobile, animations GSAP/Lenis, comportements communs |
| `js/whatsapp.js` | Génération des liens WhatsApp avec message pré-rempli (voir section 7) |
| `produits/_template-produit.html` | Modèle de fiche produit vierge, à dupliquer pour créer chaque nouveau fichier dans `produits/` (contient les placeholders photo/nom/prix/description à remplacer) |

> Chaque produit = un fichier HTML statique dans `produits/`, dupliqué depuis `_template-produit.html`. C'est volontairement simple : ajouter un produit revient à copier un fichier, changer les infos et l'ajouter dans `boutique.html`, sans logique JS ni fichier de données à maintenir.

## 7. Intégration WhatsApp (obligatoire, sur chaque page produit et sur les CTA principaux)

Chaque bouton "Commander sur WhatsApp" doit ouvrir un lien `wa.me` avec message pré-rempli, généré dynamiquement selon le produit consulté :

```js
function getWhatsAppLink(productName) {
  const phone = "2290151833207";
  const message = productName
    ? `Bonjour, je suis intéressé(e) par ${productName}. Je voudrais avoir plus d'informations.`
    : `Bonjour, je souhaite en savoir plus sur vos articles LE MEL HOUSE.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

Le client ne doit jamais avoir à taper lui-même son message : au clic, WhatsApp s'ouvre avec le texte déjà prêt à envoyer.

## 8. Composants UI à respecter

- **Header** : logo LE MEL HOUSE, navigation (Accueil, Catégories, Boutique, Comment commander, Contact), CTA WhatsApp visible en permanence
- **Cards produit** : photo (ratio cohérent, jamais déformée), nom, prix, bouton "Commander sur WhatsApp"
- **Badges catégories** : fond orange clair, texte noir/orange
- **Boutons primaires** : fond orange (`--color-primary`), texte blanc, hover assombri (`--color-primary-dark`)
- **Footer** : logo/nom, description courte, catégories principales, bouton WhatsApp, localisation

## 9. Animations

- Lenis pour le smooth scroll sur toutes les pages
- GSAP + ScrollTrigger pour les apparitions de sections et l'élément "Le Fil d'Or"
- Micro-interactions : hover sur cards produits (léger zoom image), hover boutons (changement de couleur + légère élévation/ombre)
- Aucune animation qui ralentit le chargement des images produits

## 10. Responsive

- Conception mobile-first (la majorité des visiteurs consulteront depuis leur téléphone)
- Grille catalogue : 1 colonne mobile, 2 colonnes tablette, 3–4 colonnes desktop
- Menu header : hamburger sur mobile, navigation complète sur desktop
- Bouton WhatsApp flottant fixe en bas d'écran sur mobile (optionnel mais recommandé)

## 11. Technologies imposées

- HTML5, CSS3, JavaScript ES6, sans backend
- Base technique conservée du template Aurelia Grand Hotel : Tailwind CSS, GSAP + ScrollTrigger, Lenis, Font Awesome
- Google Fonts : Poppins + Cormorant Garamond
- Variables CSS (`:root`) pour toute la palette et les espacements

## 12. Ce qui est explicitement exclu

- Pas de formulaire d'envoi d'email côté client
- Pas de section "Tarifs" (abonnement) ni de FAQ générique type SaaS
- Pas de génération de leads par email/PDF — le seul canal de capture est le clic WhatsApp
- Pas de paiement en ligne ni de compte utilisateur

## 13. Résultat attendu

Un site vitrine multi-pages, orange/blanc/noir, à l'identité "LE MEL HOUSE", qui donne en quelques secondes l'impression d'une vraie boutique de mode professionnelle, avec un parcours simple : **Découvrir → Explorer → Choisir → Contacter via WhatsApp → Commander**. Les contenus réels (produits, photos, prix) seront rédigés et ajoutés ensuite par Cursor/Codex puis complétés manuellement par le propriétaire.

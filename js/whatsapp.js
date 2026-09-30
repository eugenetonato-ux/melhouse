/* ─── WhatsApp Link Generator ─── */
const MEL_HOUSE_PHONE = "2290151833207";

const CATEGORY_MESSAGES = {
  vetements: "Bonjour LE MEL HOUSE, je recherche d'autres vêtements ou des modèles similaires à votre collection (tailles, coupes, nouveaux arrivages). Pourriez-vous me donner plus de détails ?",
  chaussures: "Bonjour LE MEL HOUSE, je recherche d'autres chaussures ou des modèles similaires de sneakers (pointures, modèles particuliers). Pourriez-vous me donner plus de détails ?",
  montres: "Bonjour LE MEL HOUSE, je recherche d'autres montres ou des modèles similaires dans votre sélection horlogère (finitions, coloris, coffrets). Pourriez-vous me donner plus de détails ?",
  accessoires: "Bonjour LE MEL HOUSE, je recherche d'autres accessoires ou des pièces similaires (bijoux, sacs, coffrets connectés). Pourriez-vous me donner plus de détails ?",
  all: "Bonjour LE MEL HOUSE, je recherche d'autres articles ou des modèles personnalisés dans votre boutique. Pourriez-vous me donner plus de détails ?"
};

function getWhatsAppLink(productName) {
  const message = productName
    ? `Bonjour, je suis intéressé(e) par ${productName}. Je voudrais avoir plus d'informations.`
    : `Bonjour, je souhaite en savoir plus sur vos articles LE MEL HOUSE.`;
  return `https://wa.me/${MEL_HOUSE_PHONE}?text=${encodeURIComponent(message)}`;
}

function getCategoryWhatsAppLink(categoryKey) {
  const message = CATEGORY_MESSAGES[categoryKey] || CATEGORY_MESSAGES.all;
  return `https://wa.me/${MEL_HOUSE_PHONE}?text=${encodeURIComponent(message)}`;
}

/* Apply to elements with data-whatsapp or data-whatsapp-category */
function initWhatsAppButtons() {
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const product = el.dataset.whatsapp || '';
    el.href = getWhatsAppLink(product || null);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-whatsapp-category]').forEach(el => {
    const cat = el.dataset.whatsappCategory || 'all';
    el.href = getCategoryWhatsAppLink(cat);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

document.addEventListener('DOMContentLoaded', initWhatsAppButtons);


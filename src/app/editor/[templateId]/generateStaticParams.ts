// Générer les paramètres statiques pour les templates disponibles
export async function generateStaticParams() {
  const templates = [
    'cv-moderne-bleu',
    'cv-classique-noir',
    'lettre-motivation-pro',
    'facture-service',
    'cv-creatif-rose',
    'attestation-travail'
  ]
  
  return templates.map((templateId) => ({
    templateId,
  }))
}
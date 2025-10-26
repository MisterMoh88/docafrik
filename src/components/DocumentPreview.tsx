'use client';

import { useEffect, useRef, useState } from 'react';
import { Template } from '@/app/templates/page';

interface DocumentPreviewProps {
  template: Template;
  scale?: number;
  showControls?: boolean;
}

export default function DocumentPreview({ 
  template, 
  scale = 1, 
  showControls = true 
}: DocumentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#2563EB');

  // Enhanced template HTML with proper styling
  const getEnhancedHTML = (baseHTML: string, color: string) => {
    const enhancedStyles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: white;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid ${color};
          padding-bottom: 20px;
        }
        
        .name {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        
        .title {
          font-size: 18px;
          color: ${color};
          font-weight: 500;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: ${color};
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .experience-item, .education-item {
          margin-bottom: 15px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .item-title {
          font-weight: 600;
          color: #111827;
        }
        
        .item-date {
          color: #6b7280;
          font-size: 14px;
        }
        
        .item-subtitle {
          color: ${color};
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .item-description {
          color: #4b5563;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .skill-item {
          background: #f9fafb;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          border-left: 3px solid ${color};
        }
        
        @media print {
          body { padding: 20px; }
          .header { border-bottom: 1px solid ${color}; }
        }
      </style>
    `;

    // Sample content based on template category
    const getSampleContent = () => {
      switch (template.category.toLowerCase()) {
        case 'cv':
          return `
            <div class="header">
              <div class="name">JEAN DUPONT</div>
              <div class="title">Développeur Full Stack Senior</div>
              <div class="contact-info">
                <span>📧 jean.dupont@email.com</span>
                <span>📱 06 12 34 56 78</span>
                <span>📍 Paris, France</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Expérience Professionnelle</div>
              <div class="experience-item">
                <div class="item-header">
                  <div class="item-title">Senior Full Stack Developer</div>
                  <div class="item-date">2021 - Présent</div>
                </div>
                <div class="item-subtitle">TechCorp Solutions</div>
                <div class="item-description">
                  Développement d'applications web modernes avec React, Node.js et TypeScript. 
                  Leadership technique sur des projets stratégiques.
                </div>
              </div>
              <div class="experience-item">
                <div class="item-header">
                  <div class="item-title">Full Stack Developer</div>
                  <div class="item-date">2018 - 2021</div>
                </div>
                <div class="item-subtitle">Digital Innovation Lab</div>
                <div class="item-description">
                  Conception et réalisation d'applications SaaS pour des clients internationaux.
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Compétences Techniques</div>
              <div class="skills-grid">
                <div class="skill-item">JavaScript/TypeScript</div>
                <div class="skill-item">React/Next.js</div>
                <div class="skill-item">Node.js/Express</div>
                <div class="skill-item">Python/Django</div>
                <div class="skill-item">PostgreSQL/MongoDB</div>
                <div class="skill-item">Docker/Kubernetes</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Formation</div>
              <div class="education-item">
                <div class="item-header">
                  <div class="item-title">Master en Informatique</div>
                  <div class="item-date">2016 - 2018</div>
                </div>
                <div class="item-subtitle">Université Paris-Saclay</div>
              </div>
            </div>
          `;
          
        case 'lettre':
          return `
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="text-align: right; margin-bottom: 30px;">
                <div style="font-weight: 600;">Jean Dupont</div>
                <div style="color: #6b7280; font-size: 14px;">15 Rue de la Paix</div>
                <div style="color: #6b7280; font-size: 14px;">75001 Paris</div>
                <div style="color: #6b7280; font-size: 14px;">jean.dupont@email.com</div>
                <div style="color: #6b7280; font-size: 14px;">06 12 34 56 78</div>
              </div>
              
              <div style="margin-bottom: 30px;">
                <div style="font-weight: 600;">TechCorp Solutions</div>
                <div style="color: #6b7280; font-size: 14px;">Service des Ressources Humaines</div>
                <div style="color: #6b7280; font-size: 14px;">123 Avenue des Champs-Élysées</div>
                <div style="color: #6b7280; font-size: 14px;">75008 Paris</div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <div style="color: #6b7280; font-size: 14px;">Paris, le ${new Date().toLocaleDateString('fr-FR')}</div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <div style="font-weight: 600; margin-bottom: 10px;">Objet : Candidature au poste de Développeur Full Stack Senior</div>
              </div>
              
              <div style="line-height: 1.6; margin-bottom: 30px;">
                <p style="margin-bottom: 15px;">
                  Madame, Monsieur,
                </p>
                <p style="margin-bottom: 15px;">
                  C'est avec un grand intérêt que j'ai découvert votre offre d'emploi pour le poste de 
                  Développeur Full Stack Senior. Avec plus de 5 ans d'expérience dans le développement 
                  d'applications web modernes, je suis convaincu de pouvoir apporter une réelle valeur 
                  ajoutée à votre équipe.
                </p>
                <p style="margin-bottom: 15px;">
                  Au cours de mes précédentes expériences, j'ai eu l'opportunité de travailler sur des 
                  projets complexes et innovants, en utilisant des technologies de pointe comme React, 
                  Node.js et TypeScript. Mon expertise couvre l'ensemble du cycle de développement, 
                  de la conception à la mise en production.
                </p>
                <p style="margin-bottom: 15px;">
                  Je serais ravi de pouvoir échanger avec vous plus en détail sur ma candidature et 
                  sur la manière dont mes compétences pourraient contribuer au succès de vos projets.
                </p>
                <p>
                  Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, 
                  l'expression de mes salutations distinguées.
                </p>
              </div>
              
              <div style="text-align: left;">
                <div style="font-weight: 600;">Jean Dupont</div>
              </div>
            </div>
          `;
          
        case 'facture':
          return `
            <div style="max-width: 800px; margin: 0 auto;">
              <!-- En-tête -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid ${color};">
                <div>
                  <div style="font-size: 24px; font-weight: 700; color: #111827;">FACTURE</div>
                  <div style="color: #6b7280; font-size: 14px;">N° FAC-2024-001</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 600; color: #111827;">TechCorp Solutions</div>
                  <div style="color: #6b7280; font-size: 14px;">123 Avenue des Champs-Élysées</div>
                  <div style="color: #6b7280; font-size: 14px;">75008 Paris</div>
                  <div style="color: #6b7280; font-size: 14px;">SIRET: 123 456 789 00012</div>
                </div>
              </div>
              
              <!-- Infos client et date -->
              <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 10px; color: ${color};">CLIENT</div>
                  <div style="font-weight: 600;">Client ABC</div>
                  <div style="color: #6b7280; font-size: 14px;">456 Rue de la République</div>
                  <div style="color: #6b7280; font-size: 14px;">69002 Lyon</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 600; margin-bottom: 10px; color: ${color};">DATE FACTURE</div>
                  <div>${new Date().toLocaleDateString('fr-FR')}</div>
                  <div style="margin-top: 15px;">
                    <div style="font-weight: 600; margin-bottom: 10px; color: ${color};">DATE ÉCHÉANCE</div>
                    <div>${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}</div>
                  </div>
                </div>
              </div>
              
              <!-- Tableau des prestations -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                  <tr style="background: #f9fafb; border-bottom: 2px solid ${color};">
                    <th style="padding: 12px; text-align: left; font-weight: 600;">Description</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600;">Quantité</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600;">Prix unitaire</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600;">Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px;">
                      <div style="font-weight: 600;">Développement site web</div>
                      <div style="color: #6b7280; font-size: 14px;">Site vitrine avec CMS intégré</div>
                    </td>
                    <td style="padding: 12px; text-align: center;">1</td>
                    <td style="padding: 12px; text-align: right;">3 000,00 €</td>
                    <td style="padding: 12px; text-align: right;">3 000,00 €</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px;">
                      <div style="font-weight: 600;">Maintenance mensuelle</div>
                      <div style="color: #6b7280; font-size: 14px;">Support technique et mises à jour</div>
                    </td>
                    <td style="padding: 12px; text-align: center;">3</td>
                    <td style="padding: 12px; text-align: right;">300,00 €</td>
                    <td style="padding: 12px; text-align: right;">900,00 €</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px;">
                      <div style="font-weight: 600;">Hébergement premium</div>
                      <div style="color: #6b7280; font-size: 14px;">Serveur dédié 12 mois</div>
                    </td>
                    <td style="padding: 12px; text-align: center;">12</td>
                    <td style="padding: 12px; text-align: right;">50,00 €</td>
                    <td style="padding: 12px; text-align: right;">600,00 €</td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Totaux -->
              <div style="display: flex; justify-content: flex-end;">
                <div style="width: 300px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span>Total HT:</span>
                    <span style="font-weight: 600;">4 500,00 €</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span>TVA (20%):</span>
                    <span style="font-weight: 600;">900,00 €</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 12px 0; background: #f9fafb; border-radius: 6px;">
                    <span style="font-weight: 600; font-size: 16px;">Total TTC:</span>
                    <span style="font-weight: 600; font-size: 16px; color: ${color};">5 400,00 €</span>
                  </div>
                </div>
              </div>
              
              <!-- Conditions -->
              <div style="margin-top: 40px; padding: 20px; background: #f9fafb; border-radius: 6px;">
                <div style="font-weight: 600; margin-bottom: 10px; color: ${color};">Conditions de paiement</div>
                <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                  Paiement à 30 jours date de facture. En cas de retard de paiement, une pénalité 
                  égale à trois fois le taux d'intérêt légal sera appliquée. Aucun escompte 
                  n'est accordé pour paiement anticipé.
                </div>
              </div>
            </div>
          `;
          
        default:
          return `
            <div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 40px;">
              <div style="font-size: 24px; font-weight: 700; color: ${color}; margin-bottom: 20px;">
                ${template.name}
              </div>
              <div style="color: #6b7280; line-height: 1.6;">
                ${template.description}
              </div>
              <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 6px;">
                <div style="font-weight: 600; margin-bottom: 10px;">Caractéristiques</div>
                <div style="color: #6b7280; font-size: 14px;">
                  {template.features?.join(', ') || 'Design professionnel et moderne'}
                </div>
              </div>
            </div>
          `;
      }
    };

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.name}</title>
        ${enhancedStyles}
      </head>
      <body>
        ${getSampleContent()}
      </body>
      </html>
    `;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);
    };

    iframe.addEventListener('load', handleLoad);
    
    // Set the iframe content
    const htmlContent = getEnhancedHTML(template.htmlContent, selectedColor);
    iframe.srcdoc = htmlContent;

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [template, selectedColor]);

  const handlePrint = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow) {
        iframeWindow.print();
      }
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {showControls && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
          {template.colorVariants && template.colorVariants.length > 0 && (
            <div className="flex items-center gap-2 pr-2 border-r border-gray-200">
              {template.colorVariants.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Variante de couleur ${index + 1}`}
                />
              ))}
            </div>
          )}
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Imprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Chargement de la prévisualisation...</span>
          </div>
        </div>
      )}
      
      <div 
        className="bg-white" 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          transition: 'transform 0.3s ease'
        }}
      >
        <iframe
          ref={iframeRef}
          className="w-full"
          style={{ 
            height: scale === 1 ? '600px' : '800px',
            border: 'none'
          }}
          title={`Prévisualisation de ${template.name}`}
        />
      </div>
    </div>
  );
}
import { NextRequest, NextResponse } from 'next/server'

interface TemplatePreview {
  id: string
  name: string
  category: string
  htmlContent: string
  previewData: Record<string, string>
}

const templates: Record<string, TemplatePreview> = {
  'cv-moderne-bleu': {
    id: 'cv-moderne-bleu',
    name: 'CV Moderne Bleu',
    category: 'CV',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <header style="background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 2em; font-weight: bold;">Jean Dupont</h1>
          <p style="margin: 5px 0 0 0; font-size: 1.1em; opacity: 0.9;">Développeur Web</p>
        </header>
        
        <section style="margin-bottom: 20px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.9em;">
            <div><strong>Email:</strong> jean.dupont@email.com</div>
            <div><strong>Téléphone:</strong> +223 XX XX XX XX</div>
            <div><strong>Adresse:</strong> Bamako, Mali</div>
            <div><strong>Disponibilité:</strong> Immédiate</div>
          </div>
        </section>
        
        <section style="margin-bottom: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; font-size: 1.2em;">Résumé</h2>
          <p style="line-height: 1.5; font-size: 0.9em;">Développeur web avec 5 ans d'expérience dans la création d'applications modernes et performantes.</p>
        </section>
        
        <section style="margin-bottom: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; font-size: 1.2em;">Compétences</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">React</span>
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">TypeScript</span>
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">Node.js</span>
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">MongoDB</span>
          </div>
        </section>
      </div>
    `,
    previewData: {
      fullName: 'Jean Dupont',
      jobTitle: 'Développeur Web',
      email: 'jean.dupont@email.com',
      phone: '+223 XX XX XX XX',
      address: 'Bamako, Mali'
    }
  },
  'cv-classique-noir': {
    id: 'cv-classique-noir',
    name: 'CV Classique Noir',
    category: 'CV',
    htmlContent: `
      <div style="font-family: Times New Roman, serif; max-width: 600px; margin: 0 auto; background: white; padding: 30px; border: 1px solid #333;">
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 2.2em; font-weight: bold; color: #333;">Marie Konaté</h1>
          <p style="margin: 8px 0 0 0; font-size: 1.2em; color: #666;">Chef de Projet</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
          <div>
            <h3 style="font-size: 1.1em; font-weight: bold; margin-bottom: 10px; color: #333;">Contact</h3>
            <p style="font-size: 0.9em; line-height: 1.6; color: #666;">
              marie.konate@email.com<br/>
              +223 XX XX XX XX<br/>
              Bamako, Mali
            </p>
          </div>
          
          <div>
            <h3 style="font-size: 1.1em; font-weight: bold; margin-bottom: 10px; color: #333;">Expérience</h3>
            <div style="font-size: 0.9em; line-height: 1.6; color: #666;">
              <strong>Chef de Projet Senior</strong><br/>
              Tech Solutions • 2020-Présent<br/>
              <em>Gestion d'équipes et livraison de projets</em>
            </div>
          </div>
        </div>
      </div>
    `,
    previewData: {
      fullName: 'Marie Konaté',
      jobTitle: 'Chef de Projet',
      email: 'marie.konate@email.com',
      phone: '+223 XX XX XX XX',
      address: 'Bamako, Mali'
    }
  },
  'lettre-motivation-pro': {
    id: 'lettre-motivation-pro',
    name: 'Lettre de Motivation Pro',
    category: 'Lettre',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; padding: 40px; border: 1px solid #ddd;">
        <div style="margin-bottom: 30px;">
          <p style="margin: 0; font-size: 0.9em; color: #666;">Jean Dupont</p>
          <p style="margin: 2px 0; font-size: 0.9em; color: #666;">Bamako, Mali</p>
          <p style="margin: 2px 0; font-size: 0.9em; color: #666;">jean.dupont@email.com</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0; font-size: 0.9em; color: #666;">À l'attention du Service RH</p>
          <p style="margin: 2px 0; font-size: 0.9em; color: #666;">Entreprise Solutions</p>
          <p style="margin: 2px 0; font-size: 0.9em; color: #666;">Bamako, Mali</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0; font-size: 0.9em; color: #666;">Fait à Bamako, le 15 janvier 2024</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <h2 style="margin: 0; font-size: 1.3em; font-weight: bold; color: #333;">Objet : Candidature au poste de Développeur Web</h2>
        </div>
        
        <div style="line-height: 1.6; font-size: 0.95em; color: #333;">
          <p style="margin-bottom: 15px;">Madame, Monsieur,</p>
          <p style="margin-bottom: 15px;">C'est avec grand intérêt que j'ai pris connaissance de votre offre d'emploi pour le poste de Développeur Web. Mon expérience et mes compétences correspondent parfaitement à vos attentes.</p>
          <p style="margin-bottom: 15px;">Au cours de mes 5 années d'expérience, j'ai développé une expertise solide dans les technologies web modernes...</p>
          <p style="margin-bottom: 15px;">Je serais ravi de pouvoir échanger avec vous sur ma candidature lors d'un entretien.</p>
          <p style="margin-bottom: 15px;">Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
        </div>
        
        <div style="margin-top: 40px;">
          <p style="margin: 0; font-size: 0.9em; color: #333;">Jean Dupont</p>
        </div>
      </div>
    `,
    previewData: {
      fullName: 'Jean Dupont',
      company: 'Entreprise Solutions',
      position: 'Développeur Web',
      email: 'jean.dupont@email.com'
    }
  },
  'facture-service': {
    id: 'facture-service',
    name: 'Facture Service',
    category: 'Facture',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; padding: 30px; border: 2px solid #333;">
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 2em; font-weight: bold; color: #333;">FACTURE</h1>
          <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">N° FAC-2024-001</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="font-size: 1em; font-weight: bold; margin-bottom: 8px; color: #333;">EMETTEUR</h3>
            <p style="margin: 0; font-size: 0.85em; line-height: 1.4; color: #666;">
              <strong>Tech Solutions</strong><br/>
              Rue 123, Quartier du Commerce<br/>
              Bamako, Mali<br/>
              N° TVA : ML001234567
            </p>
          </div>
          
          <div>
            <h3 style="font-size: 1em; font-weight: bold; margin-bottom: 8px; color: #333;">CLIENT</h3>
            <p style="margin: 0; font-size: 0.85em; line-height: 1.4; color: #666;">
              <strong>Client SARL</strong><br/>
              Avenue 456<br/>
              Bamako, Mali<br/>
              N° TVA : ML009876543
            </p>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f5f5f5; border: 1px solid #333;">
              <th style="padding: 10px; text-align: left; font-size: 0.85em; border: 1px solid #333;">Description</th>
              <th style="padding: 10px; text-align: center; font-size: 0.85em; border: 1px solid #333;">Quantité</th>
              <th style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">Prix unitaire</th>
              <th style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; font-size: 0.85em; border: 1px solid #333;">Développement site web</td>
              <td style="padding: 10px; text-align: center; font-size: 0.85em; border: 1px solid #333;">1</td>
              <td style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">500 000 FCFA</td>
              <td style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">500 000 FCFA</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-size: 0.85em; border: 1px solid #333;">Maintenance annuelle</td>
              <td style="padding: 10px; text-align: center; font-size: 0.85em; border: 1px solid #333;">1</td>
              <td style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">120 000 FCFA</td>
              <td style="padding: 10px; text-align: right; font-size: 0.85em; border: 1px solid #333;">120 000 FCFA</td>
            </tr>
          </tbody>
        </table>
        
        <div style="text-align: right; margin-bottom: 20px;">
          <div style="display: inline-block; text-align: right;">
            <p style="margin: 5px 0; font-size: 0.9em; color: #666;">Total HT : 620 000 FCFA</p>
            <p style="margin: 5px 0; font-size: 0.9em; color: #666;">TVA (18%) : 111 600 FCFA</p>
            <p style="margin: 10px 0; font-size: 1.1em; font-weight: bold; color: #333;">Total TTC : 731 600 FCFA</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
          <p style="margin: 0; font-size: 0.8em; color: #666;">Date d'échéance : 15 février 2024</p>
          <p style="margin: 5px 0 0 0; font-size: 0.8em; color: #666;">Mode de paiement : Virement bancaire</p>
        </div>
      </div>
    `,
    previewData: {
      invoiceNumber: 'FAC-2024-001',
      clientName: 'Client SARL',
      totalAmount: '731 600 FCFA'
    }
  },
  'cv-creatif-rose': {
    id: 'cv-creatif-rose',
    name: 'CV Créatif Rose',
    category: 'CV',
    htmlContent: `
      <div style="font-family: 'Comic Sans MS', cursive; max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(219, 39, 119, 0.2);">
        <div style="background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
          <div style="position: absolute; bottom: -15px; left: -15px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
          <h1 style="margin: 0; font-size: 2.2em; font-weight: bold; position: relative; z-index: 1;">Aminata Touré</h1>
          <p style="margin: 8px 0 0 0; font-size: 1.2em; opacity: 0.95; position: relative; z-index: 1;">Designer Graphique</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
          <div style="background: #fce7f3; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 1.5em; margin-bottom: 5px;">📧</div>
            <p style="margin: 0; font-size: 0.8em; color: #db2777;">Email</p>
            <p style="margin: 2px 0 0 0; font-size: 0.85em; color: #666;">amina@email.com</p>
          </div>
          <div style="background: #fce7f3; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 1.5em; margin-bottom: 5px;">📱</div>
            <p style="margin: 0; font-size: 0.8em; color: #db2777;">Téléphone</p>
            <p style="margin: 2px 0 0 0; font-size: 0.85em; color: #666;">+223 XX XX XX</p>
          </div>
          <div style="background: #fce7f3; padding: 15px; border-radius: 10px; text-align: center;">
            <div style="font-size: 1.5em; margin-bottom: 5px;">📍</div>
            <p style="margin: 0; font-size: 0.8em; color: #db2777;">Localisation</p>
            <p style="margin: 2px 0 0 0; font-size: 0.85em; color: #666;">Bamako</p>
          </div>
        </div>
        
        <div style="background: #fdf2f8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #db2777; font-size: 1.2em;">✨ À propos de moi</h3>
          <p style="margin: 0; line-height: 1.5; font-size: 0.9em; color: #666;">Designer créative avec une passion pour l'art visuel et l'innovation. Je transforme les idées en expériences visuelles mémorables.</p>
        </div>
        
        <div style="background: #fdf2f8; padding: 20px; border-radius: 10px;">
          <h3 style="margin: 0 0 15px 0; color: #db2777; font-size: 1.2em;">🎨 Compétences créatives</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <span style="background: #ec4899; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8em;">Photoshop</span>
            <span style="background: #ec4899; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8em;">Illustrator</span>
            <span style="background: #ec4899; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8em;">UI Design</span>
            <span style="background: #ec4899; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8em;">Branding</span>
          </div>
        </div>
      </div>
    `,
    previewData: {
      fullName: 'Aminata Touré',
      jobTitle: 'Designer Graphique',
      email: 'amina@email.com',
      phone: '+223 XX XX XX',
      address: 'Bamako'
    }
  },
  'attestation-travail': {
    id: 'attestation-travail',
    name: 'Attestation de Travail',
    category: 'Document Administratif',
    htmlContent: `
      <div style="font-family: Times New Roman, serif; max-width: 600px; margin: 0 auto; background: white; padding: 40px; border: 2px solid #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 1.8em; font-weight: bold; color: #333;">ATTESTATION DE TRAVAIL</h1>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0; font-size: 0.95em; line-height: 1.6; color: #333;">
            Je soussigné, Directeur des Ressources Humaines de la société <strong>Tech Solutions SARL</strong>, 
            sise à Bamako, Rue du Commerce 123, certifie par la présente que :
          </p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #333; margin: 30px 0;">
          <p style="margin: 0; font-size: 1.1em; font-weight: bold; color: #333;">Moussa Coulibaly</p>
          <p style="margin: 8px 0 0 0; font-size: 0.95em; color: #666;">Développeur Senior</p>
          <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Matricule : EMP-2021-045</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <p style="margin: 0 0 10px 0; font-size: 0.95em; color: #333;">
            <strong>Informations professionnelles :</strong>
          </p>
          <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.6; color: #666;">
            <li>Date d'embauche : 15 mars 2021</li>
            <li>Poste occupé : Développeur Senior</li>
            <li>Département : Technique</li>
            <li>Type de contrat : CDI</li>
            <li>Salaire mensuel : Confidentiel</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 10px 0; font-size: 0.95em; color: #333;">
            <strong>Appréciation :</strong>
          </p>
          <p style="margin: 0; font-size: 0.9em; line-height: 1.6; color: #666;">
            Monsieur Coulibaly a toujours fait preuve de professionnalisme, de compétence et de dévouement 
            dans l'exercice de ses fonctions. C'est un élément précieux pour notre équipe.
          </p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="margin: 0; font-size: 0.9em; line-height: 1.6; color: #333;">
            La présente attestation est délivrée pour servir et valoir ce que de droit.
          </p>
        </div>
        
        <div style="margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
          <div>
            <p style="margin: 0; font-size: 0.85em; color: #666;">Fait à Bamako, le 15 janvier 2024</p>
          </div>
          <div style="text-align: center;">
            <div style="border-bottom: 1px solid #333; width: 200px; margin: 0 auto 10px auto; height: 40px;"></div>
            <p style="margin: 0; font-size: 0.85em; color: #333;">Le Directeur des RH</p>
            <p style="margin: 2px 0 0 0; font-size: 0.85em; color: #666;">Signature et cachet</p>
          </div>
        </div>
      </div>
    `,
    previewData: {
      employeeName: 'Moussa Coulibaly',
      position: 'Développeur Senior',
      company: 'Tech Solutions SARL',
      startDate: '15 mars 2021'
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const templateId = params.templateId
  
  const template = templates[templateId]
  
  if (!template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    )
  }

  // Générer une image SVG de prévisualisation
  const svgContent = `
    <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; fill: #333; }
          .subtitle { font-family: Arial, sans-serif; font-size: 12px; fill: #666; }
          .category { font-family: Arial, sans-serif; font-size: 10px; fill: white; }
          .preview-box { fill: white; stroke: #ddd; stroke-width: 1; rx: 8; }
        </style>
      </defs>
      
      <!-- Fond -->
      <rect width="400" height="500" fill="#f8f9fa"/>
      
      <!-- Boîte de prévisualisation -->
      <rect x="20" y="60" width="360" height="400" class="preview-box"/>
      
      <!-- En-tête du document -->
      <rect x="20" y="60" width="360" height="80" fill="#2563eb" rx="8 8 0 0"/>
      <text x="200" y="95" text-anchor="middle" class="title" fill="white">${template.previewData.fullName || 'Document'}</text>
      <text x="200" y="115" text-anchor="middle" class="subtitle" fill="white" opacity="0.9">${template.previewData.jobTitle || template.name}</text>
      
      <!-- Contenu simplifié -->
      <g transform="translate(40, 160)">
        <!-- Lignes de contenu -->
        <rect x="0" y="0" width="280" height="8" fill="#e5e7eb" rx="4"/>
        <rect x="0" y="15" width="320" height="6" fill="#f3f4f6" rx="3"/>
        <rect x="0" y="28" width="300" height="6" fill="#f3f4f6" rx="3"/>
        <rect x="0" y="41" width="310" height="6" fill="#f3f4f6" rx="3"/>
        
        <!-- Section -->
        <rect x="0" y="65" width="120" height="8" fill="#2563eb" rx="4"/>
        <rect x="0" y="80" width="290" height="6" fill="#f3f4f6" rx="3"/>
        <rect x="0" y="93" width="270" height="6" fill="#f3f4f6" rx="3"/>
        
        <!-- Badges -->
        <rect x="0" y="115" width="60" height="20" fill="#e0f2fe" rx="10"/>
        <rect x="70" y="115" width="50" height="20" fill="#e0f2fe" rx="10"/>
        <rect x="130" y="115" width="70" height="20" fill="#e0f2fe" rx="10"/>
      </g>
      
      <!-- Badge de catégorie -->
      <rect x="20" y="20" width="100" height="25" fill="#059669" rx="12"/>
      <text x="70" y="37" text-anchor="middle" class="category">${template.category}</text>
      
      <!-- Titre du modèle -->
      <text x="200" y="35" text-anchor="middle" class="title">${template.name}</text>
    </svg>
  `

  const buffer = Buffer.from(svgContent)
  
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
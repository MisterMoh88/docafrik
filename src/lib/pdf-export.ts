export const exportToPDF = async (element: HTMLElement, filename: string = 'document.pdf') => {
  try {
    // Vérifier si html2pdf.js est disponible
    if (typeof window === 'undefined' || !window.html2pdf) {
      // Fallback: utiliser la fonction d'impression du navigateur
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${filename}</title>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                @media print { body { margin: 0; padding: 0; } }
              </style>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
      return
    }

    // Utiliser html2pdf.js s'il est disponible
    const opt = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    await window.html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Error exporting PDF:', error)
    // Fallback vers l'impression
    window.print()
  }
}

export const exportToWord = async (content: string, filename: string = 'document.docx') => {
  try {
    // Créer un contenu Word simple en format RTF
    const rtfContent = `{
      \\rtf1\\ansi\\deff0
      {\\fonttbl {\\f0 Times New Roman;}}
      \\f0\\fs24 
      ${content.replace(/<[^>]*>/g, '').replace(/\n/g, '\\par ')}
    }`

    // Créer un blob et télécharger
    const blob = new Blob([rtfContent], { type: 'application/rtf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename.replace('.docx', '.rtf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting Word:', error)
    // Fallback: copier le contenu dans le presse-papiers
    navigator.clipboard.writeText(content.replace(/<[^>]*>/g, ''))
    alert('Contenu copié dans le presse-papiers. Collez-le dans Word.')
  }
}

// Déclaration des types pour html2pdf
declare global {
  interface Window {
    html2pdf: any
  }
}
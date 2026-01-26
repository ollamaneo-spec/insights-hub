import html2pdf from 'html2pdf.js';

/**
 * Export HTML content to PDF file
 */
export const exportToPdf = async (htmlContent: string, fileName: string = 'answer') => {
  // Create a temporary container with proper styling
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.cssText = `
    font-family: 'Times New Roman', Times, serif;
    font-size: 14px;
    line-height: 1.6;
    padding: 20px;
    max-width: 800px;
    color: #000;
  `;
  
  // Temporarily add to DOM for rendering
  document.body.appendChild(container);
  
  const options = {
    margin: [15, 15, 15, 15],
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  try {
    await html2pdf().set(options).from(container).save();
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

/**
 * Export HTML content to DOCX file
 * Uses HTML blob with Word-compatible markup
 */
export const exportToDocx = (htmlContent: string, fileName: string = 'answer') => {
  // Word-compatible HTML wrapper with styling
  const wordHtml = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Ответ</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4;
          margin: 2cm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14pt;
          line-height: 1.5;
          color: #000000;
        }
        p {
          margin: 0 0 12pt 0;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  // Create blob with Word MIME type
  const blob = new Blob(['\ufeff', wordHtml], {
    type: 'application/msword'
  });

  // Download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

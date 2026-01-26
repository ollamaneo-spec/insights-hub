/**
 * Export HTML content to PDF using browser's native print dialog
 * This is a secure alternative that doesn't require vulnerable dependencies
 */
export const exportToPdf = async (htmlContent: string, fileName: string = 'answer') => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Не удалось открыть окно печати. Проверьте настройки блокировки всплывающих окон.');
  }

  // Write content with print-optimized styling
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${fileName}</title>
      <style>
        @page {
          size: A4;
          margin: 2cm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14pt;
          line-height: 1.6;
          color: #000;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        p {
          margin: 0 0 12pt 0;
        }
        @media print {
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
  
  printWindow.document.close();
  
  // Wait for content to load then trigger print
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
  
  // Fallback for browsers that don't fire onload
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);
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
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });

  // Download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

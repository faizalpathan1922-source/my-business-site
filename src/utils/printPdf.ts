/**
 * Triggers the browser's native print engine configured for clean PDF generation.
 * Temporarily updates the document title to provide a clean default filename
 * (e.g. 'profitcalci-gst-calculation-2026-10-23.pdf').
 */
export function printCalculationAsPdf(reportTitle?: string) {
  const originalTitle = document.title;
  const timestamp = new Date().toISOString().split('T')[0];
  const sanitizedTitle = (reportTitle || 'profitcalci-calculation-summary')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  try {
    document.title = `${sanitizedTitle}-${timestamp}`;
    window.print();
  } finally {
    // Restore title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
}

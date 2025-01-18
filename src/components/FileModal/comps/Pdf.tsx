import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfProps {
  url: string;
}

export const Pdf: React.FC<PdfProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, idx) => (
        <Page
          width={800}
          key={`page_${idx + 1}`}
          pageNumber={idx + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
};

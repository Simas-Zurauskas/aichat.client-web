import { CircularProgress, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfProps {
  url: string;
}

export const Pdf: React.FC<PdfProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>();
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={
        <div style={{ padding: 18 }}>
          <CircularProgress />
        </div>
      }
    >
      {Array.from(new Array(numPages), (el, idx) => (
        <Page
          width={isMd ? (isSm ? undefined : 600) : 800}
          key={`page_${idx + 1}`}
          pageNumber={idx + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
};

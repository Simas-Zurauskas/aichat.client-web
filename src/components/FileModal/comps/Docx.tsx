import { useEffect, useRef } from 'react';
import { renderAsync } from 'docx-preview';
import { CircularProgress } from '@mui/material';

interface DocxProps {
  url: string;
}

export const Docx: React.FC<DocxProps> = ({ url }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        renderAsync(blob, viewerRef.current as HTMLElement, undefined, {
          inWrapper: false,
        });
      });
  }, [url]);

  return (
    <div ref={viewerRef}>
      <div style={{ padding: 18 }}>
        <CircularProgress />
      </div>
    </div>
  );
};

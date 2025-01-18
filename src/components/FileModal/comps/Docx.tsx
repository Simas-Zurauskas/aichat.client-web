import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';

const Div = styled.div``;

interface DocxProps {
  url: string;
}

export const Docx: React.FC<DocxProps> = ({ url }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  console.log(url);

  useEffect(() => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        renderAsync(blob, viewerRef.current as HTMLElement, undefined, {
          inWrapper: false, //enables rendering of wrapper around document content
        });
      });
  }, [url]);

  return (
    <>
      <div ref={viewerRef} />
    </>
  );
};

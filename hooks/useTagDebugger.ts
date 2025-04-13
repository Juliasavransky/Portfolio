// hooks/useTagDebugger.ts
import { useEffect } from 'react';

export const useTagDebugger = () => {
  const tags = document.querySelectorAll('[data-tag]');
  if (tags.length === 0) {
    console.warn('⚠️ No [data-tag] elements found in DOM.');
  }

  tags.forEach((tag) => {
    const rect = tag.getBoundingClientRect();
    console.log(
      `%c[${tag.getAttribute('data-tag')}] top: ${Math.round(rect.top)}px, left: ${Math.round(rect.left)}px`,
      'color: #00bfff; font-weight: bold;'
    );
  });
};

import { useState, useEffect } from 'react';

/**
 * A custom hook to detect if a media query matches the current viewport.
 * @param query The media query string (e.g., '(max-width: 768px)').
 * @returns A boolean indicating if the query matches.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false; // or true if you want to assume mobile by default on SSR
  });

  useEffect(() => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return;
  }

  const mediaQueryList = window.matchMedia(query);

  const listener = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', listener);
  } else {
    mediaQueryList.addListener(listener);
  }

  setMatches(mediaQueryList.matches); // This is fine as a direct call

  return () => {
    if (mediaQueryList.removeEventListener) {
      mediaQueryList.removeEventListener('change', listener);
    } else {
      mediaQueryList.removeListener(listener);
    }
  };
}, [query]);


  return matches;
};

import { useRef } from 'react';

export const useCountRenders1 = () => {
  const renders = useRef(0);

  console.log('--- #1 - renders: ', renders.current++);
};

export const useCountRenders2 = () => {
  const renders = useRef(0);

  console.log('--- #2 - renders: ', renders.current++);
};

export const useCountRenders3 = () => {
  const renders = useRef(0);

  console.log('--- #3 - renders: ', renders.current++);
};

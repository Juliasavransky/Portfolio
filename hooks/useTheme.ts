import { useTheme as useEmotionTheme } from '@emotion/react';
import { Theme } from '../styles/theme'; // עכשיו Theme מיוצא

export const useCustomTheme = (): Theme => {
  return useEmotionTheme() as Theme;
};

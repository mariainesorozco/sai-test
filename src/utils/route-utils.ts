// src/utils/route-utils.ts

export const getBasePath = (): string => {
    // En producción en GitHub Pages
    if (process.env.NODE_ENV === 'production') {
      return '/sai-test';
    }
    // En desarrollo
    return '';
  };
  
  export const prefixRoute = (route: string): string => {
    const basePath = getBasePath();
    return `${basePath}${route}`;
  };
  
  export const stripBasePath = (pathname: string): string => {
    const basePath = getBasePath();
    return pathname.replace(new RegExp(`^${basePath}`), '');
  };
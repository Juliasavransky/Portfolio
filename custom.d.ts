declare module 'components/svgs/*.svg' {
  import React from 'react';
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  export default Component;
}
export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  placeholder: string;
}

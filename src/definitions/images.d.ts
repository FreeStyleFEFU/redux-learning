declare module '*.svg' {
    import { FC, SVGProps } from 'react';
    export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export const value: string;
    const src: string;
    export default src;
}

declare module '*.svg?inline' {
    import { StaticImageData } from 'next/image';
    const value: StaticImageData;
    export = value;
}

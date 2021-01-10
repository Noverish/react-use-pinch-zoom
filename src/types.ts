export interface Point {
  x: number;
  y: number;
}

export interface Transform {
  zoomFactor: number;
  translate: Point;
}

export interface Options {
  minZoomScale: number;
  maxZoomScale: number;
  onTransform?: (transform: Transform) => void;
}

type HTMLElementProps<T extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
export type ContainerStyle = Required<Pick<React.CSSProperties, 'overflow' | 'touchAction'>>;
export type ContentStyle = Required<Pick<React.CSSProperties, 'willChange' | 'transition' | 'transitionTimingFunction' | 'transitionDuration'>>;
export type ContainerProps<T extends HTMLElement> = Required<Pick<HTMLElementProps<T>, 'onTouchStart' | 'onTouchEnd' | 'onTouchMove'>> & { style: ContainerStyle, ref: React.RefObject<T> };
export type ContentProps<T extends HTMLElement> = { style: ContentStyle, ref: React.RefObject<T> };

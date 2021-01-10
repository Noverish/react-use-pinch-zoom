import { default as usePinchZoom } from './use-pinch-zoom';
import * as types from './types';

export namespace PinchZoomTypes {
  export type Options = types.Options;
  export type Transform = types.Transform;
  export type ContainerProps<T extends HTMLElement> = types.ContainerProps<T>;
  export type ContentProps<T extends HTMLElement> = types.ContentProps<T>;
  export type ContainerStyle = types.ContainerStyle;
  export type ContentStyle = types.ContentStyle;
}

export default usePinchZoom;

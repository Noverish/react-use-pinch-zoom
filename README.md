
![license](https://img.shields.io/github/license/Noverish/react-use-pinch-zoom?style=flat-square)
![npm](https://img.shields.io/npm/v/react-use-pinch-zoom?style=flat-square)

Most of the code is from [react-pinch-and-zoom](https://github.com/conradlo/react-pinch-and-zoom)

# React-Use-Pinch-Zoom

A react hook for pinch-to-zoom gesture interaction.

## Demo

![Demo Webp](https://raw.githubusercontent.com/Noverish/react-use-pinch-zoom/master/static/demo.webp)

[Demo Webpage](https://noverish.github.io/react-use-pinch-zoom/)

## Usage

1. Install this package as dependency

```shell
$ npm install react-use-pinch-zoom
```

2. Import the hook, get container and content props from hook, and use them to whatever you want to pinch zoom

```tsx
import usePinchZoom from 'react-use-pinch-zoom';

function App() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  return (
    <>
      <h1>Pinch Zoom</h1>
      <div {...containerProps}>
        <img src="/image.jpg" {...contentProps} />
      </div>
    </>
  );
}
```

3. [Optional] You can customize style of element.

```tsx
import usePinchZoom, { PinchZoomTypes } from 'react-use-pinch-zoom';

function App() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  const { style: containerStyle, ...restContainerProps } = containerProps;

  const newStyle = {
    display: 'inline-block',
    ...containerStyle,
  }

  return (
    <>
      <h1>Pinch Zoom</h1>
      <div style={newStyle} {...restContainerProps}>
        <img src="/image.jpg" {...contentProps} />
      </div>
    </>
  );
}
```

## How it works

`containerProps` and `contentProps` consist of below these.

```typescript
const containerProps = {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  style: {
    overflow: 'hidden',
    touchAction: 'none',
  }
  ref,
}

const contentProps = {
  style: {
    willChange: 'transform',
    transition: 'transform',

    transform: `scale(${zoomScale}) translate(${x}px, ${y}px)`,
    webkitTransform: `scale(${zoomScale}) translate(${x}px, ${y}px)`,
  }
  ref,
}
```

`react-use-pinch-zoom` takes control of touch event and modifies `zoomScale`, `x` and `y` values in transform style string.

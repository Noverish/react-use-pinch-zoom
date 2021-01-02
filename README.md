
![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)

Most of the code is from [react-pinch-and-zoom](https://github.com/conradlo/react-pinch-and-zoom)

# React Pinch Zoom Hook

A react hook for pinch-to-zoom gesture interaction.

## Demo

<!-- ![demo video](/static/demo1.mp4) -->
<p align="center">
  <video src="/static/demo1.mp4" autoplay><video>
</p>

## Usage

1. Install this package as dependency

```shell
$ npm install react-use-pinch-zoom
```

2. Import the hook

```jsx
import usePinchZoom from 'react-use-pinch-zoom';
```

3. Get container and content props and use them

```tsx
function App() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  return (
    <>
      <h1>Pinch Zoom</h1>
      <div {...containerProps}>
        <img
          src="/image.jpg"
          {...contentProps}
        />
      </div>
    </>
  );
}
```
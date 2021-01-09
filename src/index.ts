import { useCallback, useRef } from 'react';
import * as Point from './Point';

enum GUESTURE_TYPE {
  UNSET,
  PAN,
  PINCH,
}

export interface Transform {
  zoomFactor: number;
  translate: Point.Point;
}

interface Props {
  minZoomScale: number
  maxZoomScale: number
  onTransform?: (transform: Transform) => void
}

type HTMLElementProps<T extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
export type ContainerStyle = Required<Pick<React.CSSProperties, 'overflow' | 'touchAction'>>;
export type ContentStyle = Required<Pick<React.CSSProperties, 'willChange' | 'transition' | 'transitionTimingFunction' | 'transitionDuration'>>;
export type ContainerProps<T extends HTMLElement> = Required<Pick<HTMLElementProps<T>, 'onTouchStart' | 'onTouchEnd' | 'onTouchMove'>> & { style: ContainerStyle, ref: React.RefObject<T> };
export type ContentProps<T extends HTMLElement> = { style: ContentStyle, ref: React.RefObject<T> };

function usePinchToZoom<Container extends HTMLElement, Content extends HTMLElement>({
  minZoomScale = 1.0,
  maxZoomScale = 4.0,
  onTransform,
}: Partial<Props> = {}): [ContainerProps<Container>, ContentProps<Content>] {
  const containerRef = useRef<Container>(null);
  const contentRef = useRef<Content>(null);
  const valuesRef = useRef({
    transform: {
      zoomFactor: 1.0,
      translate: Point.newOriginPoint(),
    },

    currentGesture: GUESTURE_TYPE.UNSET,

    pinchStartZoomFactor: 1.0,
    pinchStartTouchPointDist: 0,

    panStartPoint: Point.newOriginPoint(),
    panStartTranslate: Point.newOriginPoint(),
  })

  const setTransform = useCallback(
    ({
      zoomFactor = valuesRef.current.transform.zoomFactor,
      translate = {
        x: valuesRef.current.transform.translate.x,
        y: valuesRef.current.transform.translate.y,
      },
    }: Partial<Transform> = {}) => {
      const container = containerRef.current;
      const content = contentRef.current;
      const values = valuesRef.current;
      if (!container || !content) {
        return
      }
      const roundTransalteX = Math.round(translate.x * 10) / 10
      const roundTransalteY = Math.round(translate.y * 10) / 10

      if (zoomFactor < minZoomScale * 0.8 || zoomFactor > maxZoomScale * 1.5) {
        return
      }

      values.transform.zoomFactor = zoomFactor
      values.transform.translate.x = roundTransalteX
      values.transform.translate.y = roundTransalteY

      if (onTransform) {
        onTransform({ 
          zoomFactor: values.transform.zoomFactor,
          translate: {
            x: values.transform.translate.x,
            y: values.transform.translate.y,
          }
        })
      }

      const styleString = `
        scale(${zoomFactor})
        translate(${roundTransalteX}px, ${roundTransalteY}px)
      `

      content.style.transform = styleString
      content.style.webkitTransform = styleString
    },
    [onTransform, minZoomScale, maxZoomScale],
  )

  const guardZoomAreaScale = useCallback(
    () => {
      const { zoomFactor } = valuesRef.current.transform;
      if (zoomFactor > maxZoomScale) {
        setTransform({ zoomFactor: maxZoomScale })
      } else if (zoomFactor < minZoomScale) {
        setTransform({ zoomFactor: minZoomScale })
      }
    },
    [setTransform, minZoomScale, maxZoomScale],
  )

  const guardZoomAreaTranslate = useCallback(
    () => {
      const container = containerRef.current;
      const content = contentRef.current;
      const values = valuesRef.current;
      if (!container || !content) {
        return
      }
      const { zoomFactor, translate } = values.transform
      if (zoomFactor < minZoomScale || zoomFactor > maxZoomScale) {
        return
      }

      const newTranslate = { ...translate };

      const containerRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      if (contentRect.height >= containerRect.height) {
        if (contentRect.top > containerRect.top) {
          newTranslate.y -= (contentRect.top - containerRect.top) / zoomFactor;
        }
        if (contentRect.bottom < containerRect.bottom) {
          newTranslate.y -= (contentRect.bottom - containerRect.bottom) / zoomFactor;
        }
      } else {
        newTranslate.y = 0;
        // if (contentRect.top < containerRect.top) {
        //   newTranslate.y -= (contentRect.top - containerRect.top) / zoomFactor;
        // }
        // if (contentRect.bottom > containerRect.bottom) {
        //   newTranslate.y -= (contentRect.bottom - containerRect.bottom) / zoomFactor;
        // }
      }

      if (contentRect.width >= containerRect.width) {
        if (contentRect.left > containerRect.left) {
          newTranslate.x -= (contentRect.left - containerRect.left) / zoomFactor;
        }
        if (contentRect.right < containerRect.right) {
          newTranslate.x -= (contentRect.right - containerRect.right) / zoomFactor;
        }
      } else {
        newTranslate.x = 0;
        // if (contentRect.left < containerRect.left) {
        //   newTranslate.x -= (contentRect.left - containerRect.left) / zoomFactor;
        // }
        // if (contentRect.right > containerRect.right) {
        //   newTranslate.x -= (contentRect.right - containerRect.right) / zoomFactor;
        // }
      }

      if (newTranslate.x !== translate.x || newTranslate.y !== translate.y) {
        setTransform({ translate: newTranslate });
      }
    },
    [setTransform, minZoomScale, maxZoomScale],
  )

  const onPinchStart = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const values = valuesRef.current;
      const [p1, p2] = Point.getTouchesCoordinate(syntheticEvent)

      values.pinchStartTouchPointDist = Point.distance(p1, p2)
      values.pinchStartZoomFactor = values.transform.zoomFactor
    },
    [],
  )

  const onPinchMove = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const values = valuesRef.current;
      const [p1, p2] = Point.getTouchesCoordinate(syntheticEvent)

      const pinchCurrentTouchPointDist = Point.distance(p1, p2)
      const ratioTouchPointDist = pinchCurrentTouchPointDist / values.pinchStartTouchPointDist
      const newZoomFactor = values.pinchStartZoomFactor * ratioTouchPointDist
      setTransform({ zoomFactor: newZoomFactor })
    },
    [setTransform],
  )

  const onPinchEnd = useCallback(
    () => {
      guardZoomAreaScale()
      guardZoomAreaTranslate()
    },
    [guardZoomAreaScale, guardZoomAreaTranslate],
  )

  const onPanStart = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const values = valuesRef.current;
      const [p1] = Point.getTouchesCoordinate(syntheticEvent)
      const currentTranslate = { ...values.transform.translate };

      values.panStartPoint = p1
      values.panStartTranslate = currentTranslate
    },
    [],
  )

  const onPanMove = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const values = valuesRef.current;
      const [dragPoint] = Point.getTouchesCoordinate(syntheticEvent)
      const { zoomFactor } = values.transform;
      const origin = values.panStartPoint
      const prevTranslate = values.panStartTranslate

      const dragOffset = Point.offset(dragPoint, origin)
      const adjustedZoomOffset = Point.scale(dragOffset, 1 / zoomFactor)
      const nextTranslate = Point.sum(adjustedZoomOffset, prevTranslate)
      setTransform({ translate: nextTranslate })
    },
    [setTransform],
  )

  const onPanEnd = useCallback(
    () => {
      guardZoomAreaTranslate()
    },
    [guardZoomAreaTranslate],
  )

  const onTouchStart = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const container = containerRef.current;
      const content = contentRef.current;
      const values = valuesRef.current;
      if (!container || !content) {
        return
      }
      const { nativeEvent } = syntheticEvent
      if (!(nativeEvent instanceof TouchEvent)) {
        return
      }
      content.style.transitionDuration = '0.0s'
      switch (nativeEvent.touches.length) {
        case 2:
          values.currentGesture = GUESTURE_TYPE.PINCH
          onPinchStart(syntheticEvent)
          break
        default: {
          values.currentGesture = GUESTURE_TYPE.PAN
          onPanStart(syntheticEvent)
        }
      }
    },
    [onPinchStart, onPanStart],
  )

  const onTouchMove = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const values = valuesRef.current;
      const { nativeEvent } = syntheticEvent
      if (!(nativeEvent instanceof TouchEvent)) {
        return
      }
      switch (nativeEvent.touches.length) {
        case 2:
          if (values.currentGesture === GUESTURE_TYPE.PINCH) {
            onPinchMove(syntheticEvent)
          }
          break
        default:
          if (values.currentGesture === GUESTURE_TYPE.PAN) {
            onPanMove(syntheticEvent)
          }
      }
    },
    [onPinchMove, onPanMove],
  )

  const onTouchEnd = useCallback(
    (syntheticEvent: React.SyntheticEvent) => {
      const container = containerRef.current;
      const content = contentRef.current;
      const values = valuesRef.current;
      if (!container || !content) {
        return
      }
      content.style.transitionDuration = '0.3s'
      if (values.currentGesture === GUESTURE_TYPE.PINCH) {
        onPinchEnd()
      }
      if (values.currentGesture === GUESTURE_TYPE.PAN) {
        onPanEnd()
      }
      values.currentGesture = GUESTURE_TYPE.UNSET
    },
    [onPinchEnd, onPanEnd],
  )

  const containerStyle: ContainerStyle = {
    overflow: 'hidden',
    touchAction: 'none',
  }

  const contentStyle: ContentStyle = {
    willChange: 'transform',
    transition: 'transform',
    transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
    transitionDuration: '0.0s',
  }

  const containerProps = {
    style: containerStyle,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ref: containerRef
  }

  const contentProps = {
    style: contentStyle,
    ref: contentRef
  }

  return [containerProps, contentProps];
}

export default usePinchToZoom;

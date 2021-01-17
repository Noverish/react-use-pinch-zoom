import { Point, Transform } from './types';

function newOriginPoint(): Point {
  return {
    x: 0,
    y: 0
  }
}

function distance(p1: Point, p2: Point): number {
  const { x: x1, y: y1 } = p1
  const { x: x2, y: y2 } = p2
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function offset(p: Point, origin: Point): Point {
  return {
    x: p.x - origin.x,
    y: p.y - origin.y,
  }
}

function map(p: Point, f: (n: number) => number): Point {
  return {
    x: f(p.x),
    y: f(p.y),
  }
}

function scale(p: Point, s: number): Point {
  return map(p, v => v * s)
}

function sum(p1: Point, p2: Point): Point {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  }
}

function getTouchesCoordinate(syntheticEvent: React.SyntheticEvent): Point[] {
  const {
    currentTarget: { parentNode },
    nativeEvent,
  } = syntheticEvent
  if (
    !(parentNode instanceof HTMLElement) ||
    !(nativeEvent instanceof TouchEvent)
  ) {
    return []
  }
  const containerRect = parentNode.getBoundingClientRect()
  const containerOrigin = { x: containerRect.left, y: containerRect.top };

  return Array.from(nativeEvent.touches).map((touch) => ({
    x: touch.clientX - containerOrigin.x,
    y: touch.clientY - containerOrigin.y,
  }));
}

function transformDOMRect(rect: DOMRect, transform: Transform): DOMRect {
  const { zoomFactor, translate } = transform;
  const r = (zoomFactor - 1) / 2

  const width = rect.width * zoomFactor;
  const height = rect.height * zoomFactor;
  const top = rect.top + translate.y - r * rect.height;
  const bottom = rect.bottom + translate.y + r * rect.height;
  const left = rect.left + translate.x - r * rect.width;
  const right = rect.right + translate.x + r * rect.width;

  return {
    ...rect,
    width,
    height,
    top,
    bottom,
    left,
    right,
    x: left,
    y: top,
  }
}

export {
  newOriginPoint,
  distance,
  offset,
  sum,
  map,
  scale,
  getTouchesCoordinate,
  transformDOMRect,
}
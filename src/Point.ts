export interface Point {
  x: number
  y: number
}

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

export {
  newOriginPoint,
  distance,
  offset,
  sum,
  map,
  scale,
  getTouchesCoordinate,
}
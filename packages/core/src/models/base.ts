import type { Brush, Point } from '../types'
import type { DrauuIt } from '../drauu-it'
import { D } from '../utils'

export abstract class BaseModel<T extends SVGElement> {
  event: PointerEvent = undefined!
  point: Point = undefined!
  start: Point = undefined!
  el: T | null = null

  constructor(protected drauuIt: DrauuIt) {}

  onSelected(_el: SVGSVGElement | null): void {
  }

  onUnselected(): void {
  }

  onStart(_point: Point): SVGElement | undefined {
    return undefined
  }

  onMove(_point: Point): boolean {
    return false
  }

  onEnd(_point: Point): SVGElement | boolean | undefined {
    return undefined
  }

  get brush() {
    return this.drauuIt.brush
  }

  get shiftPressed() {
    return this.drauuIt.shiftPressed
  }

  get altPressed() {
    return this.drauuIt.altPressed
  }

  get svgElement() {
    return this.drauuIt.el
  }

  getMousePosition(event: PointerEvent): Point {
    const el = this.drauuIt.el!
    const scale = this.drauuIt.options.coordinateScale ?? 1

    if (this.drauuIt.options.coordinateTransform === false) {
      const rect = this.drauuIt.el!.getBoundingClientRect()
      return {
        x: (event.pageX - rect.left) * scale,
        y: (event.pageY - rect.top) * scale,
        pressure: event.pressure,
      }
    }
    else {
      const point = this.drauuIt.svgPoint!
      point.x = event.clientX
      point.y = event.clientY
      const loc = point.matrixTransform(el.getScreenCTM()?.inverse())
      return {
        x: loc.x * scale,
        y: loc.y * scale,
        pressure: event.pressure,
      }
    }
  }

  protected createElement<K extends keyof SVGElementTagNameMap>(name: K, overrides?: Partial<Brush>): SVGElementTagNameMap[K] {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name)
    const brush = overrides
      ? {
          ...this.brush,
          ...overrides,
        }
      : this.brush

    el.setAttribute('fill', brush.fill ?? 'transparent')
    el.setAttribute('stroke', brush.color)
    el.setAttribute('stroke-width', brush.size.toString())
    el.setAttribute('stroke-linecap', 'round')

    if (brush.dasharray)
      el.setAttribute('stroke-dasharray', brush.dasharray)

    return el
  }

  protected attr(name: string, value: string | number) {
    this.el!.setAttribute(name, typeof value === 'string' ? value : value.toFixed(D))
  }

  private _setEvent(event: PointerEvent) {
    this.event = event
    this.point = this.getMousePosition(event)
  }

  /**
   * @internal
   */
  _eventDown(event: PointerEvent) {
    this._setEvent(event)
    this.start = this.point
    return this.onStart(this.point)
  }

  /**
   * @internal
   */
  _eventMove(event: PointerEvent) {
    this._setEvent(event)
    return this.onMove(this.point)
  }

  /**
   * @internal
   */
  _eventUp(event: PointerEvent) {
    this._setEvent(event)
    return this.onEnd(this.point)
  }
}

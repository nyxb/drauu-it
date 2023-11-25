import 'virtual:windi.css'
import type { Brush, DrawingMode } from 'drauu-it'
import { createDrauuIt } from 'drauu-it'
import './style.css'

const drauuIt = createDrauuIt({
  el: '#svg',
  brush: {
    color: '#000',
    size: 3,
  },
  // acceptsInputTypes: ['pen'],
})

const sizeEl = document.getElementById('size')! as HTMLInputElement
sizeEl.addEventListener('input', () => drauuIt.brush.size = +sizeEl.value)

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
    if (e.shiftKey)
      drauuIt.redo()
    else
      drauuIt.undo()
    return
  }

  if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)
    return

  if (e.code === 'KeyL') {
    drauuIt.mode = 'line'
  }
  else if (e.code === 'KeyD') {
    drauuIt.mode = 'draw'
  }
  else if (e.code === 'KeyS') {
    drauuIt.mode = 'stylus'
  }
  else if (e.code === 'KeyR') {
    drauuIt.mode = 'rectangle'
  }
  else if (e.code === 'KeyE') {
    drauuIt.mode = 'ellipse'
  }
  else if (e.code === 'KeyC') {
    drauuIt.clear()
  }
  else if (e.code === 'Equal') {
    drauuIt.brush.size = Math.min(10, drauuIt.brush.size + 0.5)
    sizeEl.value = `${drauuIt.brush.size}`
  }
  else if (e.code === 'Minus') {
    drauuIt.brush.size = Math.max(1, drauuIt.brush.size - 0.5)
    sizeEl.value = `${drauuIt.brush.size}`
  }
})

document.getElementById('undo')?.addEventListener('click', () => drauuIt.undo())
document.getElementById('redo')?.addEventListener('click', () => drauuIt.redo())
document.getElementById('clear')?.addEventListener('click', () => drauuIt.clear())
document.getElementById('download')?.addEventListener('click', () => {
  drauuIt.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const data = drauuIt.el!.outerHTML || ''
  const blob = new Blob([data], { type: 'image/svg+xml' })
  const elem = window.document.createElement('a')
  elem.href = window.URL.createObjectURL(blob)
  elem.download = 'drauuIt.svg'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
})

const modes: { el: HTMLElement; brush: Partial<Brush> }[] = [
  { el: document.getElementById('m-stylus')!, brush: { mode: 'stylus', arrowEnd: false } },
  { el: document.getElementById('m-eraser')!, brush: { mode: 'eraseLine', arrowEnd: false } },
  { el: document.getElementById('m-draw')!, brush: { mode: 'draw', arrowEnd: false } },
  { el: document.getElementById('m-line')!, brush: { mode: 'line', arrowEnd: false } },
  { el: document.getElementById('m-arrow')!, brush: { mode: 'line', arrowEnd: true } },
  { el: document.getElementById('m-rect')!, brush: { mode: 'rectangle', arrowEnd: false } },
  { el: document.getElementById('m-ellipse')!, brush: { mode: 'ellipse', arrowEnd: false } },
]
modes.forEach(({ el, brush }) => {
  el.addEventListener('click', () => {
    modes.forEach(({ el }) => el.classList.remove('active'))
    el.classList.add('active')
    drauuIt.brush.arrowEnd = brush.arrowEnd
    drauuIt.mode = brush.mode as DrawingMode
  })
})

const lines: { el: HTMLElement; value: string | undefined }[] = [
  { el: document.getElementById('l-solid')!, value: undefined },
  { el: document.getElementById('l-dashed')!, value: '4' },
  { el: document.getElementById('l-dotted')!, value: '1 7' },
]

lines.forEach(({ el, value }) => {
  el.addEventListener('click', () => {
    lines.forEach(({ el }) => el.classList.remove('active'))
    el.classList.add('active')
    drauuIt.brush.dasharray = value
  })
})

const colors = Array.from(document.querySelectorAll('[data-color]'))
colors
  .forEach((i) => {
    i.addEventListener('click', () => {
      colors.forEach(i => i.classList.remove('active'))
      i.classList.add('active')
      drauuIt.brush.color = (i as HTMLElement).dataset.color!
    })
  })

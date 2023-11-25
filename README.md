# drauu-it

[![NPM version](https://img.shields.io/npm/v/drauu-it?color=9945FF&label=)](https://www.npmjs.com/package/drauu-it)

SVG-based drawing tool in browser. Built for [EnigmaSlidev](https://github.com/nyxb/enigmaslidev).

[Live Demo](http://drauu-it.netlify.app/) (built with Vanilla JavaScript!)

## Features

- Vanilla JavaScript - integrate into any framework you like
- SVG-based - scalable, transparent, and serializable
- Stylus / Touch pressure support 
- Headless (unstyled) - style it as you want
- Undo / Redo stacks

## Install

```bash
npm i drauu-it
```

```html
<svg id="svg"></svg>
```

```js
import { createDrauuIt } from 'drauu-it'

const drauuIt = createDrauuIt({
  el: '#svg',
  brush: {
    mode: 'stylus', // 'line', 'rectangle', 'ellipse'
    color: 'skyblue',
    size: 5,
  }
})

// change brush color
drauuIt.options.brush.color = 'red'
```

## Credits

Inspired by

- [scribby](https://github.com/naknomum/scribby) by [naknomum](https://github.com/naknomum)
- [excalidraw](https://github.com/excalidraw/excalidraw)
- [draw](https://github.com/amoshydra/draw) by [amoshydra](https://github.com/amoshydra)
- [live-draw](https://github.com/antfu/live-draw) by [antfu](https://github.com/antfu)
- [drauu](https://github.com/antfu/drauu) by [antfu](https://github.com/antfu)

Thanks!

## License

MIT

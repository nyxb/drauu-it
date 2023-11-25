import type { DrauuIt } from '../drauu-it'
import type { DrawingMode } from '../types'

import { StylusModel } from './stylus'
import { EllipseModel } from './ellipse'
import { LineModel } from './line'
import { RectModel } from './rect'
import { DrawModel } from './draw'
import { EraserModel } from './eraser'

export function createModels(drauuIt: DrauuIt): Record<DrawingMode, DrawModel | StylusModel | LineModel | RectModel | EllipseModel | EraserModel> {
  return {
    draw: new DrawModel(drauuIt),
    stylus: new StylusModel(drauuIt),
    line: new LineModel(drauuIt),
    rectangle: new RectModel(drauuIt),
    ellipse: new EllipseModel(drauuIt),
    eraseLine: new EraserModel(drauuIt),
  }
}

export { StylusModel, EllipseModel, LineModel, RectModel, DrawModel, EraserModel }

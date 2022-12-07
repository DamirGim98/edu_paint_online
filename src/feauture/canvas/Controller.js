import toolState from './toolState'
import WebSocketApi from '../../api/WebSocketApi'
import canvasState from './canvasState'
import UserStore from '../chat/UserStore'
import Brush from './tools/Brush'
import Rectangle from './tools/Rectangle'
import Eraser from './tools/Eraser'
import Circle from './tools/Circle'
import LineTo from './tools/LineTo'

class Controller {
  constructor(toolStore, canvasStore, api) {
    this._toolStore = toolStore
    this._api = api
    this._canvasStore = canvasStore
  }

  get Tools() {
    return this._toolStore
  }

  get Canvas() {
    return this._canvasStore
  }

  get api() {
    return this._api
  }

  initializeCanvas(reference) {
    this.Canvas.setCanvas = reference
    this.Tools.setTool(new Brush(reference))
  }

  pushToUndo() {
    this.Canvas.pushToUndo(this.Canvas.getCanvas.toDataURL())
  }

  undoAction() {
    const msg = JSON.stringify({
      method: 'draw',
      figure: {
        type: 'undo',
      },
      id: UserStore.getSessionId,
    })
    this.api.sendMessage(msg)
  }

  redoAction() {
    const msg = JSON.stringify({
      method: 'draw',
      figure: {
        type: 'redo',
      },
      id: UserStore.getSessionId,
    })
    this.api.sendMessage(msg)
  }

  setDrawingTool(tool) {
    switch (tool) {
      case 'Brush':
        this.Tools.setTool(new Brush(this.Canvas.getCanvas))
        break
      case 'Rectangle':
        this.Tools.setTool(new Rectangle(this.Canvas.getCanvas))
        break
      case 'LineTo':
        this.Tools.setTool(new LineTo(this.Canvas.getCanvas))
        break
      case 'Circle':
        this.Tools.setTool(new Circle(this.Canvas.getCanvas))
        break
      case 'Eraser':
        this.Tools.setTool(new Eraser(this.Canvas.getCanvas))
        break
      default:
        break
    }
  }

  setDrawingColors(color) {
    this.Tools.setFillColor(color)
    this.Tools.setStrokeColor(color)
  }

  setDrawingWidth(width) {
    this.Tools.setLineWidth(width)
  }

  subscribeForMessages() {
    return this.api.subscribe(this.drawHandler.bind(this))
  }

  drawHandler = (event) => {
    const ctx = this.Canvas.CanvasContext
    const msg = JSON.parse(event.data)
    if (msg.method !== 'draw') return
    const { figure } = msg
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'finish':
        this.pushToUndo()
        ctx.beginPath()
        break
      case 'rectangle':
        Rectangle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        )
        break
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'circle':
        Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
        break
      case 'line':
        LineTo.staticDraw(
          ctx,
          figure.startX,
          figure.startY,
          figure.x,
          figure.y,
          figure.color,
          figure.width
        )
        break
      case 'undo':
        this.Canvas.undo()
        break
      case 'redo':
        this.Canvas.redo()
        break
      default:
        break
    }
  }
}

export default new Controller(toolState, canvasState, WebSocketApi)

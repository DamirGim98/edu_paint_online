import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'
import Rectangle from '../tools/Rectangle'
import LineTo from '../tools/LineTo'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'

const ToolCreators = [
  () => toolState.setTool(new Brush(canvasState.canvas)),
  () => toolState.setTool(new Rectangle(canvasState.canvas)),
  () => toolState.setTool(new LineTo(canvasState.canvas)),
  () => toolState.setTool(new Circle(canvasState.canvas)),
  () => toolState.setTool(new Eraser(canvasState.canvas)),
]

export default ToolCreators

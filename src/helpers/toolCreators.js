import toolState from '../feauture/canvas/toolState'
import Brush from '../feauture/canvas/tools/Brush'
import canvasState from '../feauture/canvas/canvasState'
import Rectangle from '../feauture/canvas/tools/Rectangle'
import LineTo from '../feauture/canvas/tools/LineTo'
import Circle from '../feauture/canvas/tools/Circle'
import Eraser from '../feauture/canvas/tools/Eraser'

const ToolCreators = [
  () => toolState.setTool(new Brush(canvasState.canvas)),
  () => toolState.setTool(new Rectangle(canvasState.canvas)),
  () => toolState.setTool(new LineTo(canvasState.canvas)),
  () => toolState.setTool(new Circle(canvasState.canvas)),
  () => toolState.setTool(new Eraser(canvasState.canvas)),
]

export default ToolCreators

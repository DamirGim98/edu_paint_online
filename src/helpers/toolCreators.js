import Controller from '../feauture/canvas/Controller'

const ToolCreators = [
  () => Controller.setDrawingTool('Brush'),
  () => Controller.setDrawingTool('Rectangle'),
  () => Controller.setDrawingTool('LineTo'),
  () => Controller.setDrawingTool('Circle'),
  () => Controller.setDrawingTool('Eraser'),
]

export default ToolCreators

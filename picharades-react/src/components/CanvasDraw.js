import CanvasDraw from "react-canvas-draw";

class CanvasDraw2 extends CanvasDraw {
    constructor(props) {
        super(props);
    }

    saveLine(brushColor, brushRadius) {
        console.log('aaaa')
        CanvasDraw.prototype.saveLine.call(this, brushColor, brushRadius);
        console.log('saving....')
    }

}

export default CanvasDraw2
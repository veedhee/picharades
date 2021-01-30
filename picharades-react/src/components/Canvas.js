import React, { Component } from 'react';

class Canvas extends Component {
    componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
    }

    startPaint() {

    }

    endPaint(){

    }


    render() {
    return(
        <canvas id="drawing-board" ref="canvas"
            onMouseDown={this.startPaint}
            onTouchStart={this.startPaint}
            onMouseMove={this.endPaint}
            onTouchMove={this.endPaint}>   
        </canvas>
    )
    }

}

export default Canvas
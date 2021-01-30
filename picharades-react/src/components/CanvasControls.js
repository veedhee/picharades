import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class BrushSizes extends Component {
    handleSizeChange(size, e) {
        this.props.sizeChangeHandler(size);
    }

    render(){
        return (
            <div className="brush-sizes d-flex justify-content-around">
                <span style={{
                    color:"white",
                    width:"30px",
                    height:"15px",
                    borderRadius:"50px",
                    borderBottom:"2px solid white"
                }}
                onClick={this.handleSizeChange.bind(this, 5)}></span>
                <span style={{
                    color:"white",
                    width:"30px",
                    height:"15px",
                    borderRadius:"50px",
                    borderBottom:"4px solid white"
                }}
                onClick={this.handleSizeChange.bind(this, 10)}></span>
                <span style={{
                    color:"white",
                    width:"30px",
                    height:"15px",
                    borderRadius:"50px",
                    borderBottom:"6px solid white"
                }}
                onClick={this.handleSizeChange.bind(this, 15)}></span>
            </div>
        )
    }
}

class EraserOptions extends Component {
    handleUndo() {
        this.props.undoHandler()
    }

    handleEraseAll() {
        this.props.eraseAllHandler()
    }

    handleCanvasData() {
        this.props.getCanvasData()
    }

    render() {
        return (
            <div className="eraser-options d-flex justify-content-around mt-1"
                style={{color:"white", fontSize:"14px"}}>
                <span onClick={this.handleUndo.bind(this)}>Undo</span>
                <span onClick={this.handleEraseAll.bind(this)}>Erase All</span>
                <span onClick={this.handleCanvasData.bind(this)}>Show data</span>
            </div>
        )
    }
}

class BrushColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showColorPopup: false,
            color: props.brushColor || "#800000"
        }
    }

    handleChangeComplete(color) {
        this.props.colorChangeHandler(color.hex)
    }

    handleChange(color, e) {
        this.setState({ color: color.hex })
    }

    _renderColorPopup() {
        return (
            <div className="color-picker-popup" style={{
                position: "absolute",
                bottom: "100%",
                zIndex: "25"
                }}>
                <SketchPicker
                color={this.state.color}
                onChangeComplete={this.handleChangeComplete.bind(this)}
                onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
    
    render() {
        return (
            <div className="color-picker mt-2" style={{position:"relative"}}>
                <div style={{
                        width: "100%",
                        height: "20px",
                        background: this.props.brushColor,
                        border: "5px solid white"
                        }}
                        onClick={() => this.setState({ showColorPopup: !this.state.showColorPopup })}>
                </div>
                { this.state.showColorPopup ? this._renderColorPopup() : null }
            </div>

        )
    }
}


class CanvasControls extends Component {
    render() {
        return(
            <div className="canvas-controls">
                <p style={{ color:"white" }}>BRUSH OPTIONS</p>
                <BrushSizes
                    sizeChangeHandler={this.props.sizeChangeHandler} />
                <BrushColor 
                    colorChangeHandler={this.props.colorChangeHandler}
                    brushColor={this.props.brushColor} />
                <EraserOptions
                    undoHandler={this.props.undoHandler}
                    eraseAllHandler={this.props.eraseAllHandler}
                    getCanvasData={this.props.getCanvasData} />
            </div>
        )
    }

}

export default CanvasControls
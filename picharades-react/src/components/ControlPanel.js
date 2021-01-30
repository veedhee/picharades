import React, { Component } from 'react';

import MovieGenerator from './MovieGenerator';
import MovieGuesser from './MovieGuesser';
import CanvasControls from './CanvasControls';
import RoomStats from './RoomStats';

class ControlPanel extends Component {
    render() {
        return(
            <div className="control-panel d-flex justify-content-between p-2">
                <MovieGenerator />
                <MovieGuesser />
                <CanvasControls 
                    colorChangeHandler={this.props.colorChangeHandler}
                    brushColor={this.props.brushColor}
                    undoHandler={this.props.undoHandler}
                    eraseAllHandler={this.props.eraseAllHandler}
                    sizeChangeHandler={this.props.sizeChangeHandler}
                    getCanvasData={this.props.getCanvasData} />
                <RoomStats />
            </div>
        )
    }

}

export default ControlPanel
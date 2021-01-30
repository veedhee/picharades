import React, { Component } from 'react';

import ControlPanel from './components/ControlPanel';
import JoinRoom from './components/JoinRoom';
import CanvasDraw from "react-canvas-draw";

import io from "socket.io-client";

import './App.css';

let socket = io.connect('http://localhost:5000');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "#800000",
      brushRadius: 5,
      undo: false,
      connected: false,
      hasJoinedRoom: false,
      roomExists: true
    }
  }

  componentWillMount() {
    socket.on('receiveCanvasState', data => {
      console.log('data received...')
      let initData = JSON.parse(data);
      let canvasData = JSON.parse(initData['canvas']);
      this.loadCanvasData(JSON.stringify(canvasData));
    });

    socket.on('connected', data => {
      console.log('connected...');
      this.setState({connected: true});
    });
    
    socket.on('room-created', data => {
      this.setState({hasJoinedRoom: true});
      console.log("Room created...");
      console.log(data['room_name']);
    });

    socket.on('room-joined', data => {
      this.setState({hasJoinedRoom: true});
      if (data['status'] == 404) {
          this.setState({hasJoinedRoom: false});
          this.setState({roomExists: false})
          console.log('Room does not exist. Please try again...')
      }
      else if (data['status'] == 200) {
        this.setState({hasJoinedRoom: true});
        console.log('You have now joined the room.')
      }
    });
  }

  colorChangeHandler(updatedcolor) {
    this.setState({
      color: updatedcolor
    })
  }

  undoHandler() {
    this.saveableCanvas.undo();
    this.sendCanvasData();
  }

  eraseAllHandler() {
    this.saveableCanvas.clear();
    this.sendCanvasData();
  }

  sizeChangeHandler(size) {
    this.setState({brushRadius: size})
  }

  getCanvasData() {
    let data = this.saveableCanvas.getSaveData();
    return data;
  }

  loadCanvasData(data) {
    this.saveableCanvas.loadSaveData(data, true);
  }

  sendCanvasData() {
    let currentCanvasState = this.getCanvasData();
    console.log('sending data...')
    socket.emit("forwardCanvasState", {"canvas": currentCanvasState});
  }

  createRoom(nickname) {
    socket.emit('create-room', {username: nickname});
  }

  joinRoom(nickname, room_name) {
    socket.emit('join-room', {username: nickname, room_name: room_name});
  }

  render() {
    if (this.state.connected === false) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>)
    }

    if (this.state.connected === true && this.state.hasJoinedRoom === false) {
      return <JoinRoom createRoom={this.createRoom.bind(this)}
                      joinRoom={this.joinRoom.bind(this)}
                      roomExists={this.state.roomExists} />
    }

    return (
    <div className="picharades-main">
      <CanvasDraw brushColor={this.state.color}
                  canvasWidth="100%"
                  canvasHeight="78vh"
                  brushRadius={this.state.brushRadius}
                  undo = {this.state.undo}
                  onChange={this.sendCanvasData.bind(this)}
                  ref={CanvasDraw => (this.saveableCanvas = CanvasDraw)}
                  />
      <ControlPanel 
        colorChangeHandler={this.colorChangeHandler.bind(this)}
        brushColor={this.state.color}
        undoHandler={this.undoHandler.bind(this)}
        eraseAllHandler={this.eraseAllHandler.bind(this)}
        sizeChangeHandler={this.sizeChangeHandler.bind(this)}
        getCanvasData={this.getCanvasData.bind(this)} />
    </div>)
  }
}

export default App;

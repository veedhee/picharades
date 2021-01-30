import json

from flask import Flask, request
from flask_socketio import SocketIO, send, emit

from utils import generate_unique_room_name
from db import create_room, RoomAlreadyExists, add_sid_to_room, room_exists

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'

PAINTER = ''


### WEB SOCKET ENDPOINTS ###

@socketio.on('connect')
def connect():
    print('someone connected to websocket')
    emit('connected')

@socketio.on('disconnect')
def disconnect():
    print('someone disconnected')
    global PAINTER
    PAINTER = ''

@socketio.on('create-room')
def create_room_action(data):
    while True:
        room_name = generate_unique_room_name()
        try:
            create_room(room_name)
        except RoomAlreadyExists:
            pass
        else:
            break
    print(f"Room Created: {room_name}")
    username = data['username']
    sid = request.sid
    add_sid_to_room(room_name, sid, username)
    emit('room-created', {'room_name': room_name})

@socketio.on('join-room')
def join_room(data):
    username = data['username']
    room_name = data['room_name']
    sid = request.sid
    if not room_exists(room_name):
        emit('room-joined', {'status': 404})
    add_sid_to_room(room_name, sid, username)
    emit('room-joined', {'status': 200})

@socketio.on('forwardCanvasState')
def forward_canvas_state(canvasData):
    print(request.sid)
    global PAINTER
    print("painter", PAINTER)
    if not PAINTER:
        PAINTER = request.sid
    if request.sid == PAINTER:
        print('forwarding...')
        str_canvas_data = json.dumps(canvasData)
        emit('receiveCanvasState', str_canvas_data, broadcast=True, include_self=False)



if __name__ == '__main__':
    socketio.run(app, debug=True)
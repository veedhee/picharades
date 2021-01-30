import React, { Component } from 'react';

class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create__nickname: '',
            join__nickname: '',
            join__roomname: ''
        }
    }

    handleCreateRoomFormSubmit(event) {
        event.preventDefault();
        this.props.createRoom(this.state.create__nickname);
    }

    handleJoinRoomFormSubmit(event) {
        event.preventDefault();
        this.props.joinRoom(this.state.join__nickname, this.state.join__roomname);
    }

    handleNickNameChangeCreate(event) {
        const target = event.target;
        let val = target.value;
        this.setState({create__nickname: val});
    }

    handleNickNameChangeJoin(event) {
        const target = event.target;
        let val = target.value;
        this.setState({join__nickname: val});
    }

    handleRoomNameChangeJoin(event) {
        const target = event.target;
        let val = target.value;
        this.setState({join__roomname: val});
    }

    render() {
        return(
            <div className="overlay">
                <div className="form-container">
                    <div className="form-head">
                    PIC-CHARADES 🌻
                    </div>
                    <form method="POST" className="entry-form" onSubmit={this.handleCreateRoomFormSubmit.bind(this)}>
                        <div className="form-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label for="username">Nickname:</label>
                                    <input type="text" className="form-control" id="username" placeholder="Your Nickname" required 
                                            onChange={this.handleNickNameChangeCreate.bind(this)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="submit" id="create-room-submit" className="btn btn-primary w-100 text-center">CREATE ROOM</button>
                            </div>
                        </div>
                    </form>

                    <form method="POST" className="entry-form" onSubmit={this.handleJoinRoomFormSubmit.bind(this)}>
                        <div className="form-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label for="username">Nickname:</label>
                                    <input type="text" className="form-control" id="username" placeholder="Your Nickname" required
                                            onChange={this.handleNickNameChangeJoin.bind(this)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label for="username">Room Code:</label>
                                    <input type="text" className="form-control" id="roomname" placeholder="Room Code" required
                                            onChange={this.handleRoomNameChangeJoin.bind(this)} />
                                </div>
                            </div>
                            {this.props.roomExists === false && <p className="small text-danger">The room does not exist</p>}
                            <div className="form-row">
                                <button type="submit" id="create-room-submit" className="btn btn-primary w-100 text-center">JOIN ROOM</button>
                            </div>
                        </div>
                    </form>
                </div>        
		    </div>
        )
    }
}

export default JoinRoom
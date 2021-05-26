import { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import { socketService } from '../services/socket.service';

export class Chat extends Component {

    state = {
        chat: ['Hi!, how can i help you?'],
        isChatOpen:false,
        inputMsg:'',
        msg: { 
            txt:''
        }
    }
    componentDidMount() {
        socketService.setup();
        socketService.emit('chat topic',this.props.toyId)
        socketService.on('chat addMsg',this.addMsg)
    }


    toggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen })
    }

    handleChange = ({ target }) => {
        console.log(target.value)
        this.setState({ ...this.state, msg: {...this.state.msg,txt:target.value} })
    }
    
    addMsg = newMsg => {
        console.log('!!!!!');
        this.setState(prevState => ({ chat: [...prevState.chat, {...newMsg}] }))
        // if (this.state.isBotMode) this.sendBotResponse();
    }
    onSendMsg= async(ev)=>{
        ev.preventDefault()
        if(!this.state.msg.txt) return
        console.log(ev.target)
        const from = 'Me'
        await socketService.emit('chat newMsg',{ from, txt: this.state.msg.txt })
        this.setState({ msg: { from: 'Me', txt: '' } })
        // this.state.chat.push(this.state.inputMsg)
        // this.setState({chat:this.state.chat, msg:{txt:''} })
    }

    render() {
        const { isChatOpen, msg } = this.state
        return <div className={`chat  ${isChatOpen ? 'open':''} `}>
          {isChatOpen&&  <div className="chat-window">
              <div className="chat-header">
                  <h2>Chat Toy</h2>
              </div>
              <div className="chat-msgs">
                {this.state.chat.map((msg,idx) => <div className="chat-message" key={idx}>{msg.txt}</div>)}
              </div>
                <form className="input" onSubmit={this.onSendMsg}>
                    <input type="text" value={msg.txt} placeholder="Start typing" onChange={this.handleChange} />
                </form>
            </div>}
            <div className="chat-btn">
                <Fab color="primary" aria-label="add" onClick={this.toggleChat}>
                    <ChatIcon />
                </Fab>
            </div>
        </div>
    }
}
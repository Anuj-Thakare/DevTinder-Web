import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        try{
            const chat = await axios.get(BASE_URL + "/chat/" + targetUserId,
                { withCredentials: true }
            );

            const chatMessages = chat?.data?.data?.messages?.map((msg) => {
                const { senderId, text } = msg;
                return { firstName: senderId.firstName, lastName: senderId.lastName, text: text };
            });
            setMessages(chatMessages);

        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchChatMessages();;
    }, []);


    useEffect(() => {
        if(!userId){
            return;
        }
        const socket = createSocketConnection();
        //As soon as the page loads, the socket connecting is made and joinChat event is emitted
        socket.emit("joinChat",{firstName: user.firstName, userId, targetUserId});

        socket.on("messageReceived", ({firstName, lastName, text}) => {
            console.log(firstName + " : " + text);
            setMessages((messages) => [...messages, {firstName, lastName, text}]);
        })

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage",{
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };


    return (
        <div className="w-3/4 mx-auto border border-grey-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-100">Chat</h1>
            <div className="flex-1 overflow-y-scroll p-5">
                {messages.map((message, index) => {
                    return (
                        <div key={index} className={"chat " + (user.firstName === message.firstName ? "chat-end" : "chat-start")}>
                            
                            <div className="chat-header">
                                {`${message.firstName} ${message.lastName}`}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">{message.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                })}
            </div>
            <div className="p-5 border-t border-grey-600 flex items-center gap-2">
                <input 
                    className="flex-1 border border-grey-500 text-white rounded p-2" 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="btn btn-primary">Send</button>
            </div>
        </div>
    )
}

export default Chat
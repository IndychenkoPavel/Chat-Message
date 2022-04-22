import React, { useState } from "react";

const MessageBlock = ({ setUsers, users, userName, userImg, historyChat, setHistoryChat }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [interval, setInterval] = useState("");

  
  const onSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleString();
    if (!interval) {
      setInterval(now)
    } else if (interval !== now) {
      setInterval(now)
    } else {
      return
    }
    const newMessage = {
      keyMessage: "send",
      textMessage: chatMessage,
      dateMessage: now,
    };

    setHistoryChat((historyChat) => { 
      const newChat = [...historyChat, newMessage];
      localStorage.setItem(userName, JSON.stringify(newChat));
      return newChat;
    });

    setTimeout(() => apiRequest(), 5000);

    reverseUsers();
  };

  const apiRequest = async () => {
    const url = "https://api.chucknorris.io/jokes/random";
    const response = await fetch(url);
    const dataItem = await response.json();
    const now = new Date().toLocaleString();

    const newMessage = {
      textMessage: dataItem.value,
      dateMessage: now,
      keyMessage: "received",
    };
    setHistoryChat((historyChat) => {
      const newChat = [...historyChat, newMessage];
      localStorage.setItem(userName, JSON.stringify(newChat));
      return newChat;
    });
    reverseUsers();
  };

  const reverseUsers = () => {
    const filterUser = users.filter(item => item.name !== userName);
    const upUser = users.filter(item => item.name === userName);
    const ttt = [upUser[0], ...filterUser]
    setUsers(ttt);
  }

  return (
    <div className="message-block">
      <div className="chat-user-name"><img className="chat-img" src={!userImg ? '' : require(`${userImg}`)} alt="1" />{userName}</div>
      <div className="block-chat">
      {historyChat.map((message) => (
          <div
            key={message.dateMessage}
            className={
              message.keyMessage === "send" ? "message-send" : "message-received"
            }
          >
            <p className="message-text">{message.textMessage}</p>
            <p className="message-date">{message.dateMessage}</p>
          </div>
        ))}
      </div>
      <div className="form-message">
        <form onSubmit={onSubmit} action="">
          <input
            type="text"
            className="input-message"
            value={chatMessage}
            placeholder='Type your message'
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default MessageBlock;

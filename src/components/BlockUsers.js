// import React, {useState, useEffect} from 'react';



const BlockUsers = ({ users, openHistory, search }) => {
 
    let LSusers = JSON.parse(localStorage.getItem("users"));
    const usersInner = LSusers === null ? users : search ? users : LSusers;

  return (
    <div className='users-block'>
        <div className="users-title">Chats</div>
        <ul className="users-list">
            {usersInner.map((user) => 
                <li key={user.id} className="user-list" onClick={() => openHistory(user.id)}>
                    <div className="user-img"><img src={require(`${user.img}`)} alt={user.id} /></div> 
                    <div className="user-center">
                        <p className="user-name">{user.name}</p>
                        <p className="user-text">{`${user.history.slice(-1)[0].textMessage.slice(0, 25)} ...`}</p>
                    </div>
                    <div className="user-data">{user.date}</div>
                </li>
            )}
        </ul>
        

    </div>
  )
}

export default BlockUsers
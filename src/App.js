import React, { useState, useEffect } from "react";
import SearchBlock from "./components/SearchBlock";
import BlockUsers from "./components/BlockUsers";
import MessageBlock from "./components/MessageBlock";
import logo from "./components/img/logo.jpg";

function App() {
  const usersMass = [
    {
      id: 1,
      name: "Alice Freeman",
      date: "Jun 12 2017",
      img: "./img/1.jpg",
      history: [
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet.",
          dateMessage: "7/15/2017",
        },
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet.",
          dateMessage: "4/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 3",
          dateMessage: "5/15/2017",
        },
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 4",
          dateMessage: "3/15/2017",
        },
      ],
    },
    {
      id: 2,
      name: "Josefina",
      date: "Feb 18 2017",
      img: "./img/2.jpg",
      history: [
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 1",
          dateMessage: "2/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 2",
          dateMessage: "4/15/2017",
        },
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 3",
          dateMessage: "3/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 4",
          dateMessage: "5/15/2017",
        },
      ],
    },
    {
      id: 3,
      name: "Barrera",
      date: "Mar 17 2017",
      img: "./img/3.jpg",
      history: [
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 1",
          dateMessage: "4/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 2",
          dateMessage: "1/15/2017",
        },
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 3",
          dateMessage: "3/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 4",
          dateMessage: "7/15/2017",
        },
      ],
    },
    {
      id: 4,
      name: "Velazquez",
      date: "Mar 15 2017",
      img: "./img/4.jpg",
      history: [
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 1",
          dateMessage: "9/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 2",
          dateMessage: "8/15/2017",
        },
        {
          keyMessage: "send",
          textMessage: "Lorem ipsum dolor sit amet. 3",
          dateMessage: "7/15/2017",
        },
        {
          keyMessage: "received",
          textMessage: "Lorem ipsum dolor sit amet. 4",
          dateMessage: "4/15/2017",
        },
      ],
    },
  ];

  const [users, setUsers] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [userImg, setUserImg] = useState("");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [classAdd, setClassAdd] = useState("add-class");

  useEffect(() => {
    // const loading = () => {
      setUsers(usersMass);
      let LSinfo = JSON.parse(localStorage.getItem("users"));
      console.log(LSinfo)
      if (LSinfo === null) {
        setHistoryChat(usersMass[0].history);
        setUserName(usersMass[0].name);
        setUserImg(usersMass[0].img);
        localStorage.setItem("users", JSON.stringify(usersMass));
      } else {
        setHistoryChat(LSinfo[0].history);
        setUserName(LSinfo[0].name);
        setUserImg(LSinfo[0].img);
      }
    // };
    // loading();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openHistory = (userId) => {
    const userObj = users.filter((user) => user.id === userId);
    const userName = userObj[0].name;
    setUserName(userName);
    setUserImg(userObj[0].img);

    let dataLS = JSON.parse(localStorage.getItem(userName));
    if (dataLS === null) {
      localStorage.setItem(userName, JSON.stringify(userObj[0].history));
      setHistoryChat(userObj[0].history);
    } else {
      setHistoryChat(dataLS);
    }
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setLeftOpen(false);
      setRightOpen(true);
      setClassAdd("");
    } else {
      setLeftOpen(true);
      setRightOpen(true);
    }
  };

  const hideBlock = () => {
    setLeftOpen(true);
    setRightOpen(false);
  };

  return (
    <div className="App">
      <div className={leftOpen === true ? "left-block" : "left-block hide"}>
        <div className="left-block-top">
          <div className="login-user">
            <img src={logo} alt="" />
          </div>
          <SearchBlock search={search} setSearch={setSearch} />
        </div>
        <BlockUsers
          users={
            !search
              ? users
              : users.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
                )
          }
          openHistory={openHistory}
          search={search}
        />
      </div>

      <div
        className={
          rightOpen === true ? `right-block ${classAdd}` : "right-block hide"
        }
      >
        <MessageBlock
          setUsers={setUsers}
          users={users}
          userName={userName}
          userImg={userImg}
          historyChat={historyChat}
          setHistoryChat={setHistoryChat}
          hideBlock={hideBlock}
        />
      </div>
    </div>
  );
}

export default App;

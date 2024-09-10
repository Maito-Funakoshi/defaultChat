import React from 'react';
import { useEffect, useRef } from 'react';
import A from "../images/A.png";
import system from "../images/system.png";

const ChatBox = ({ names, namesEng, messages, error }) => {
  const getName = (nameEng) => {
    switch (nameEng) {
      case namesEng[0]:
        return names[0];
      default:
        return '';
    }
  };

  const getImageSrc = (nameEng) => {
    switch (nameEng) {
      case namesEng[0]:
        return A;
      case 'system':
        return system;
      default:
        return '';
    }
  };
  
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      var element = document.documentElement;
      var bottom = element.scrollHeight - element.clientHeight;
      if (chatBoxRef.current.clientHeight < 718) {// body.height(=778px) - h1.height(60px)
        bottom = 0;
      }
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  }, [messages]);


  return (
    <>
    <div className="chat-box"　ref={chatBoxRef}>
      {messages.map((msg, index) => {
        const name = getName(msg.name);
        const imageSrc = getImageSrc(msg.name);
        return (
          <div className={msg.name} key={index}>
            {imageSrc && <img src={imageSrc} alt={msg.name} />}
            <div className="message">
              {name && <p className="recipient">{name}</p>}
              <p className={`${msg.role} ${msg.mode}`}>
                {msg.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </>
  );
};

export default ChatBox;
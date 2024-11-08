import React from 'react';
import { useEffect, useRef } from 'react';
import A from "../images/A.png";
import system from "../images/system.png";
import { marked } from 'marked';

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
      if (chatBoxRef.current.clientHeight < document.body.scrollHeight - document.querySelector('h1').clientHeight) {
        bottom = 0;
      }
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => {
          const name = getName(msg.name);
          const imageSrc = getImageSrc(msg.name);
          return (
            <div className={msg.name} key={index}>
              {imageSrc && <img src={imageSrc} alt={msg.name} />}
              <div className="message">
                {name && <p className="recipient">{name}</p>}
                <div
                  className={`${msg.role} ${msg.mode}`}
                  dangerouslySetInnerHTML={{ __html: marked(msg.content) }} // markedを使用してHTMLに変換
                ></div>
                {/* 変更点(変更前は)               
                  <p className={`${msg.role} ${msg.mode}`}>
                    {msg.content}
                  </p> 
                */}
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
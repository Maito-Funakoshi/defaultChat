// import React from 'react';
// import { useEffect, useRef } from 'react';
// import A from "../images/A.png";
// import system from "../images/system.png";

// const ChatBox = ({ names, namesEng, messages, error }) => {
//   const getName = (nameEng) => {
//     switch (nameEng) {
//       case namesEng[0]:
//         return names[0];
//       default:
//         return '';
//     }
//   };

//   const getImageSrc = (nameEng) => {
//     switch (nameEng) {
//       case namesEng[0]:
//         return A;
//       case 'system':
//         return system;
//       default:
//         return '';
//     }
//   };
  
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       var element = document.documentElement;
//       var bottom = element.scrollHeight - element.clientHeight;
//       if (chatBoxRef.current.clientHeight < document.body.scrollHeight - document.querySelector('h1').clientHeight) {
//         bottom = 0;
//       }
//       window.scrollTo({ top: bottom, behavior: "smooth" });
//     }
//   }, [messages]);


//   return (
//     <>
//     <div className="chat-box"　ref={chatBoxRef}>
//       {messages.map((msg, index) => {
//         const name = getName(msg.name);
//         const imageSrc = getImageSrc(msg.name);
//         return (
//           <div className={msg.name} key={index}>
//             {imageSrc && <img src={imageSrc} alt={msg.name} />}
//             <div className="message">
//               {name && <p className="recipient">{name}</p>}
//               <p className={`${msg.role} ${msg.mode}`}>
//                 {msg.content}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//     {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//     </>
//   );
// };

// export default ChatBox;

import React, { useEffect, useRef } from 'react';
import marked from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';  // KaTeXのCSSをインポート
import A from "../images/A.png";
import system from "../images/system.png";

// カスタムレンダラーの設定
const renderer = new marked.Renderer();

// 数式（インライン）のレンダリング
renderer.inlineMath = (text) => {
  try {
    return katex.renderToString(text, { throwOnError: false });
  } catch (error) {
    console.error("KaTeX rendering error:", error);
    return text;
  }
};

// 数式（ブロック）のレンダリング
renderer.blockMath = (text) => {
  try {
    return katex.renderToString(text, { throwOnError: false, displayMode: true });
  } catch (error) {
    console.error("KaTeX rendering error:", error);
    return text;
  }
};

// markedにカスタムレンダラーを設定
marked.setOptions({
  renderer: renderer,
  breaks: true,  // マークダウンの改行をHTMLの<br>に変換
  gfm: true,     // GitHub flavored markdownを有効に
});

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
      const element = document.documentElement;
      let bottom = element.scrollHeight - element.clientHeight;
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
                {/* msg.contentをmarked.jsで変換し、dangerouslySetInnerHTMLで表示 */}
                <p
                  className={`${msg.role} ${msg.mode}`}
                  dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                />
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
import React, { useState } from 'react';
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';
import Header from './Header';
import AssistantResponses from './AssistantResponses'
import './App.css';

function App() {
  //人物設定
  const names = ["後藤"];
  const namesEng = ["Goto"];
  const characters = [

  ];

  //システムプロンプト
  const chat = [

  ]
  const reflect = [

  ]
  const common = [

  ]
  const complementChat = [

  ]
  const complementReflect = [

  ]
  const summary = [

  ]

  //最初のメッセージ
  const greetingAssistantMessages = [
    "こんにちは！後藤大輔です。じっくりとあなたのお話を聞きます。よろしくお願いします。", 
  ]
  const greetingSystemMessage = ["今日は何について話しましょうか？"]

  const [messages, setMessages] = useState([
    { role: "assistant", content: `${greetingAssistantMessages[0]}`, name: `${namesEng[0]}`, mode: "chat"},
    { role: "assistant", content: `${greetingSystemMessage}`, name: `${namesEng[0]}`, mode: "chat" }
  ]);
  //変数設定
  const [inputAble, setInputAble] = useState(true);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(0);
  const [reflectChatCount, setReflectChatCount] = useState(4);

  //HTML部分
  return (
    <div className="App">
      <Header messages = {messages} inputAble = {inputAble} setInputAble = {setInputAble} />
      <AssistantResponses　recipient = {recipient} setRecipient = {setRecipient} names = {names}　namesEng = {namesEng} messages = {messages} setMessages = {setMessages} inputAble = {inputAble} setInputAble = {setInputAble} characters = {characters} chat = {chat} reflect = {reflect} common = {common} complementChat = {complementChat} complementReflect = {complementReflect} summary = {summary} reflectChatCount = {reflectChatCount} setError = {setError} />
      <ChatBox names = {names} namesEng = {namesEng}　messages = {messages} error = {error} />
      <MessageInput setMessages = {setMessages} inputAble = {inputAble} setInputAble = {setInputAble} />
    </div>
  );
}

export default App;
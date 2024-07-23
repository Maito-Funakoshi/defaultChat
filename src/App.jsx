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
  const common = [

  ]
  const complementChat = [

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
  const [error, setError] = useState(null);
  const [reflectChatCount, setReflectChatCount] = useState(4);

  //HTML部分
  return (
    <div className="App">
      <Header messages = {messages} />
      <AssistantResponses names = {names}　namesEng = {namesEng} messages = {messages} setMessages = {setMessages} characters = {characters} chat = {chat} common = {common} complementChat = {complementChat} summary = {summary} reflectChatCount = {reflectChatCount} setError = {setError} />
      <ChatBox names = {names} namesEng = {namesEng}　messages = {messages} error = {error} />
      <MessageInput setMessages = {setMessages} />
    </div>
  );
}

export default App;
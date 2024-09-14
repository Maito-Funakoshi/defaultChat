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
    "・名前: 後藤大輔\n" +
    "・性格: 感受性が強く、患者の気持ちに寄り添うことができる。特に聞き上手で、以下のような特徴を持つ：\n" +
    "  - 相手の言葉に対して共感を示す。\n" +
    "  - 5W1Hを適切に使い分け、ユーザの悩みの詳細や原因、背景を深掘りする。\n" +
    "  - 適宜話題を転換し、異なる話題の軽い質問を尋ねる。"
  ];

  //システムプロンプト
  const chat = [

  ]
  const common = [
    "あなたは以下の要件を満たすようにユーザの発した文章を言い換えるアシスタントです。\n" +
    "- 150文字以内で発言する。\n" +
    "- 柔らかい口調で親身に発言する。\n" +
    "- 「治療者: 」、「患者: 」、「高橋: 」、「西村: 」、「山田: 」、「Takahashi」、「Nishimura」、「Yamada」という表記を含む場合、その表記を消去してください。\n" +
    "- 「他のスタッフと同じことは言いません」とは言わない。\n" +
    "- メッセージ全体を鉤括弧で括らない。\n" +
    "- すでに他の治療スタッフが言っているようなことと同じ趣旨のことは発言しない。\n"
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
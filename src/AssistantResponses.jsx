import { useEffect } from 'react';
// import os from 'os';
import OpenAI from "openai";

const AssistantResponses = ({ names, namesEng, messages, setMessages, characters, chat, common, complementChat, summary, reflectChatCount, setError }) => {
  //openaidialogue1
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  useEffect(() => {
    if (messages.length > 2　&& messages[messages.length - 1].role == "user") {
      const makeResponse = async () => {
            try {
              const chatMessages = [
                { role: "system", content: `あなたは${names[0]}という名前のアシスタントです。以下の設定をもとに返答を作成してください。${chat} あなたの特徴は以下の通りです。${characters[0]}` },
                  ...messages.map(message => ({...message, role: "user"}))
              ];
              let response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: chatMessages,
                temperature: 1.2
              })

                // 発言様式を整備する
              const commonMessages = [
                  { role: "system", content: `${common}`},
                  { role: "user", content: `${response.choices[0].message.content.trim()}`}
              ];
              response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: commonMessages,
                temperature: 1.2
              })

              if (response.choices && response.choices.length > 0) {
                const botMessage = response.choices[0].message.content.trim();
                const assistantMessage = { role: "assistant", content: `${botMessage}`, name: `${namesEng[0]}`, mode: "chat"};
                currentMessages = [...currentMessages, assistantMessage];
                setMessages(prevMessages => [...prevMessages, assistantMessage]);
              }
            } catch (err) {
              setError(err);
              console.error("The sample encountered an error:", err);
            }
      }
      makeResponse();
    }
  }, [messages]);

  return null;
};

export default AssistantResponses;
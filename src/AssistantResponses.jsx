import { useEffect } from 'react';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import os from 'os';
import OpenAI from "openai";

const AssistantResponses = ({ names, namesEng, messages, setMessages, characters, chat, common, complementChat, summary, reflectChatCount, setError }) => {
  //opendialogue1
//   const endpoint = `https://opendialogue1.openai.azure.com/`;
//   const azureApiKey = `e1a905c26e7d418bb8ce8f95518c9f45`;
//   const deploymentId = "gpt35turbo";
  //opendialogue2
//   const endpoint = `https://opendialogue2.openai.azure.com/`;
//   const azureApiKey = `5854afcc0daa4f919e0e124914a512d8`;
//   const deploymentId = "gpt4o";
  //opendialogue3
//   const endpoint = `https://opendialogue3.openai.azure.com/`;
//   const azureApiKey = `87eb9e105c3d4b7c8ba57a050f547ca8`;
//   const deploymentId = "gpt4oGS";
  // const clients = names.map(() => new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey)));

  //openaidialogue1

  const openai = new OpenAI({
    apiKey: "sk-proj-zoaaHLyoitixvwwHJmVaT3BlbkFJw9ShXV7lkl2ZhZwPAA7a",
    dangerouslyAllowBrowser: true
  })

  const maxContextMessages = 100;

  useEffect(() => {
    if (messages.length > 2　&& messages[messages.length - 1].role == "user") {
      const makeResponse = async () => {
        let currentMessages = [...messages].slice(-maxContextMessages);
            try {
              const chatMessages = [
                { role: "system", content: `あなたは${names[0]}という名前のアシスタントです。以下の設定をもとに返答を作成してください。${chat} あなたの特徴は以下の通りです。${characters[0]}` },
                  ...currentMessages.map(message => ({...message, role: "user"}))
              ];
              //AzureOpenAI
              // let response = await clients[0].getChatCompletions(deploymentId, chatMessages);
              //OpenAI
              let response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: chatMessages
              })



              // // 発言様式を整備する
              // const odMessages = [
              //     { role: "system", content: `${common}`},
              //     { role: "user", content: `${response.choices[0].message.content.trim()}`}
              // ];
              // response = await clients[0].getChatCompletions(deploymentId, odMessages);

              // // その他修正を適宜する
              // const complementMessages = [
              //     { role: "system", content: `${complementChat}`},
              //     { role: "user", content: `${response.choices[0].message.content.trim()}`}
              // ]
              // response = await clients[0].getChatCompletions(deploymentId, complementMessages);

              // // 返答を要約する
              // const summaryMessages = [
              //     { role: "system", content: `${summary}`},
              //     { role: "user", content: `${response.choices[0].message.content.trim()}`}
              // ]
              // response = await clients[0].getChatCompletions(deploymentId, summaryMessages);



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
import React from "react";
import FlashMessage from "./FlashMessage";

const FLASH_MESSAGE_TIMOUT = 5000;

export type FlashMessageType = {
  id: number;
  message: string;
  type: "error" | "success" | "info";
};


export type FlashMessageContextType = {
  messages: FlashMessageType[];
  addMessage: (message: string, type: "error" | "success" | "info") => void;
}

export type FlashMessageProviderProps = {
  children: React.ReactNode;
};


export const FlashMessageContext = React.createContext<FlashMessageContextType>(null!);

export const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({children}) => {
  const [messages, setMessages] = React.useState<FlashMessageType[]>([]);

  const addMessage = (message: string, type: "error" | "success" | "info") => {
    const id = Math.random();
    setMessages((messages) => [...messages, { id, message, type }]);

    setTimeout(() => {
      setMessages((messages) => messages.filter((m) => m.id !== id));
    }, FLASH_MESSAGE_TIMOUT);
  };

  return (
    <FlashMessageContext.Provider value={{ messages, addMessage }}>
      <div className={"absolute left-1/2 -translate-x-1/2 top-10"}>
        {messages.map((message) => (
          <FlashMessage id={message.id} message={message.message} type={message.type} />
        ))}
      </div>
      {children}
    </FlashMessageContext.Provider>
  );
};
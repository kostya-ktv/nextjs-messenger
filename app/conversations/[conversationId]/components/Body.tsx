"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface IBody {
  initialMessages: FullMessageType[];
}

const Body: React.FC<IBody> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();
    const messageHandler = (message: FullMessageType) => {
      setMessages((prev) => {
        if (find(prev, { id: message.id })) return prev;
        return [...prev, message];
      });
      bottomRef.current?.scrollIntoView();
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === newMessage.id) return newMessage;
          return msg;
        })
      );
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;

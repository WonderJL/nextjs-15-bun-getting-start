import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId, chatWith } = useParams({ from: '/chat' });
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", userId, chatWith],
    queryFn: async () => {
      const res = await fetch(
        `/api/messages?fromId=${userId}&toId=${chatWith}`
      );
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    }
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async () => {
      await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromId: userId,
          toId: chatWith,
          content: newMessage,
        }),
      });
    }
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage.mutateAsync();
    setNewMessage("");
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2">
            <strong>
              {msg.from_id === userId ? "You" : msg.senderUsername}:
            </strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex p-2">
        <input
          className="flex-1 border"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

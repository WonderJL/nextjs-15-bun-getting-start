import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Button,
  Label,
} from "react-aria-components";


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState("");
  const [chatWith, setChatWith] = useState<number | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [] } = useQuery({ queryKey: ["users"], queryFn: async () => {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }});

  // Create user mutation
  const createUser = useMutation({
    mutationFn: async (username: string) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = async () => {
    if (!username) return alert("Enter a username");
    if (!chatWith) return alert("Select a chat partner");

    let currentUser = users.find((user: { id: number; username: string }) => user.username === username);
    if (!currentUser) {
      currentUser = await createUser.mutateAsync(username);
    }
    navigate({ to: "/chat", params: { userId: currentUser.id, chatWith } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messenger App</h1>
      <Label>Your Username:</Label>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="mb-4"
      />
      <Label>Who to Chat With:</Label>
      <ComboBox
        selectedKey={chatWith?.toString()}
        onSelectionChange={(value) => setChatWith(Number(value))}
        className="mb-4"
      >
        <Input className="flex-1 p-2" placeholder="Select a user" />
        <ListBox>
          {users.map((user: { id: number; username: string }) => (
            <ListBoxItem key={user.id.toString()} value={{ id: user.id.toString() }}>
              {user.username}
            </ListBoxItem>
          ))}
        </ListBox>
      </ComboBox>
      <Button onPress={handleSubmit} className="bg-blue-500 text-white">
        Submit
      </Button>
    </div>
  );
}

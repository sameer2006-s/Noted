import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NotesForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ title, content });
    // Clear form fields after submission
    setTitle("");
    setContent("");
  };

  return (
    <Card className="w-[300px] m-10">
      <CardHeader>
        <CardTitle>Noted.</CardTitle>
        <CardDescription>Add a new note</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                placeholder="What's on your mind"
                required
                className="h-[100px] p-2 border border-gray-300 rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="submit">Post</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotesForm;

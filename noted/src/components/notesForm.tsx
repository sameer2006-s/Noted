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

    type Note = { id: number; title: string; content: string };

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [notes, setNotes] = useState<Note[]>([]);
  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ title, content });
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content,
    };
    setNotes([...notes, newNote]);
    // Clear form fields after submission

    setTitle("")
    setContent("")
 
  };

  return (
    <Card className="w-[300px] m-10">
      <CardHeader>
        <CardTitle>Noted.</CardTitle>
        <CardDescription>Add a new note</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={e=>handleSubmit(e)}>
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
          <CardFooter className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-slate-800 w-full px-6 text-white rounded-md  py-2 hover:bg-slate-600 transition-all"
            >
              Post
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotesForm;

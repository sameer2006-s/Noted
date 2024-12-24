import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteIcon } from "lucide-react";

const App: React.FC = () => {

  type Note = { id: number; title: string; content: string }
  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      const newNote = { 
        id: notes.length +1, 
        title:title,
        content
         };
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
    
  };
  const handleSelection = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  // Effect to load some initial notes (if needed)
  useEffect(() => {
    setNotes([
      { id: 1, title: "Note 1", content: "This is the content of note 1." },
      { id: 2, title: "Note 2", content: "This is the content of note 2." },
    ]);
  }, []);

  // Handler for deleting a note
  // const handleDelete = (id: number) => {
  //   setNotes(notes.filter(note => note.id !== id));
  // };

  return (
      <>
  <div className="flex gap-20 p-10">
      {/* Form for adding a new note */}
      <Card className="w-[300px] m-10 flex flex-col">
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

      {/* Display existing notes */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-xl font-bold mb-4">Your Notes</h2>
          <div className="grid gap-4 w-full  pr-5">
          {notes.map((note, index) => (
            <button onClick={()=>{handleSelection(note)}}>
                <Card key={index} className="border border-gray-300 p-4">
                    <div className="flex items-center justify-between">
                  <CardTitle>{note.title}</CardTitle>
                  <DeleteIcon className="cursor-pointer text-gray-500 hover:text-red-500"/>
                    </div>
                  <CardDescription className="text-left">{note.content}</CardDescription>
                </Card>
                </button>
              ))}
          </div>
        </div>
        </div>
        </>
  );
}


export default App;

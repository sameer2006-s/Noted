import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteIcon, Edit2Icon } from "lucide-react";

const App: React.FC = () => {

  type Note = { id: number; title: string; content: string }
  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(   null   
  );
  // { id: 1, title: "Note 1", content: "This is the content of note 1." }
  const [showPhoto, setShowPhoto] = useState<boolean>(false);


  // Handler for form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      const newNote = { 
        id: notes.length +1, 
        title:title,
        content:content
         };


         try {
          const response = await fetch('http://localhost:5000/api/notes', {
            method: 'POST',
             headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `Bearer your-anon-key` // Supabase API Key
             },
            body: JSON.stringify({ title: newNote.title, content: newNote.content })
          });
      
          if (response.ok) {
            const createdNote = await response.json();
            console.log('Note created:', createdNote,newNote);
          } else {
            console.error('Failed to create note', response.statusText);
          }
        } catch (error) {
          console.error('Error creating note:', error);
        }
      

      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");

    //   const randomIndex = Math.floor(Math.random() * images.length); // Get a random index
    // setCurrentImage(images[randomIndex]); // Set the selected random image

      setShowPhoto(true);
    setTimeout(() => {
      setShowPhoto(false);
    }, 1500);
    
  };
  const handleSelection = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    //setSelectedNote(null);
  }

  const handleCancel = ()=>{
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const handleUpdateNote = async (e:React.FormEvent)=>{
    e.preventDefault()

    if(!selectedNote) return;

    const updatedNote:Note = {
      id:selectedNote.id,
      title:title,
      content:content,
    }

    const updatedNotesList = notes.map(note=>
      note.id === selectedNote.id?updatedNote:note
    )

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${updatedNote.id}`, {
        method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
        //   'Authorization': `Bearer your-anon-key` // Supabase API Key
         },
        body: JSON.stringify(updatedNote)
      });
  
      if (response.ok) {
        const createdNote = await response.json();
        console.log('Note created:', createdNote);
      } else {
        console.error('Failed to create note', response.statusText);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }

    setNotes(updatedNotesList)
    setTitle(""); // Reset the title field
  setContent(""); // Reset the content field
  setSelectedNote(null);

  }


    const deleteNote = async (e:React.MouseEvent,noteId:number)=>{
      e.preventDefault()
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
          method: 'DELETE',
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer your-anon-key` // Supabase API Key
          // },
        });
    
        if (response.ok) {
          const deleteRes = await response.json();
          console.log('Note deleted:', deleteRes);
        } else {
          console.error('Failed to delete note', response.statusText);
        }
      } catch (error) {
        console.error('Error creating note:', error);
      }
    
      const updatedNotesList = notes.filter(note=>noteId!==note.id)
      setNotes(updatedNotesList)
    }


    const fetchNotes = async ()=>{
      const res = await fetch('http://localhost:5000/api/notes')
      const dbNotes= await res.json()
      console.log(dbNotes)
      setNotes(dbNotes);
    }


  // Effect to load some initial notes (if needed)
  useEffect(() => {
      fetchNotes()
  }, []);

  // Handler for deleting a note
  // const handleDelete = (id: number) => {
  //   setNotes(notes.filter(note => note.id !== id));
  // };

  return (
      <>
      <div className="flex flex-col lg:flex-row gap-10 p-20 place-items-start">
        {/* Form for adding a new note */}
        <div className="grid gap-4 w-full lg:w-1/2 ">
          <h1 className="text-6xl font-serif m-10">Noted..</h1>
          {/* <h3>A Safe space for your dumb ideas</h3> */}
          <Card className=" flex flex-col max-w-[400px] max-h-[350px] ">
            <CardHeader>
              <CardTitle >Noted.</CardTitle>
              <CardDescription>Add a new note</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => (selectedNote ? handleUpdateNote(e) : handleSubmit(e))}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Note Title"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="content">Content</Label>
                    <textarea
                      id="content"
                      placeholder="What's on your mind"
                      required
                      className="p-2 border border-gray-300 rounded-md"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-center mt-4">
                  {selectedNote ? (
                    <div className="flex justify-between items-center w-full px-4">
                      <Button className="bg-slate-500 rounded-2xl" type="submit">
                        Save
                      </Button>
                      <Button className="bg-red-600 rounded-2xl" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-slate-800 w-full px-6 text-white rounded-2xl py-2 hover:bg-slate-600 transition-all"
                    >
                      Post
                    </Button>
                  )}
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        {showPhoto && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <img
              src="https://media1.tenor.com/m/8oMZVK_7fEAAAAAd/spongebob-patrick.gif"
              alt="Temporary Photo"
              className="rounded-md w-80 h-80"
            />
          </div>
        )}

        {/* Display existing notes */}
        <div className="w-full lg:w-1/2 flex flex-col items-start  max-h-full overflow-auto">
          <h2 className="text-xl font-bold mb-4">Your Notes</h2>
          <div className="grid gap-4 w-full">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <Card key={index} className="border border-gray-300 p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="pb-3 lg:max-w-[500px] max-w-[180px] break-words">{note.title}</CardTitle>
                    <div className="flex flex-row gap-2">
                      <div>{note.id}</div>
                      <button onClick={() => handleSelection(note)}>
                        <Edit2Icon className="w-4 h-4 text-gray-500 hover:text-blue-500 transition-all" />
                      </button>
                      <DeleteIcon
                        onClick={(e) => deleteNote(e, note.id)}
                        className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500 transition-all"
                      />
                    </div>
                  </div>
                  <CardDescription className="text-left lg:max-w-[500px] max-w-[200px] break-words">
                    {note.content}
                  </CardDescription>
                </Card>
              ))
            ) : (
              <h2 className="text-black">Add notes to be displayed here</h2>
            )}
          </div>
        </div>
      </div>
  
        </>
  );
}


export default App;

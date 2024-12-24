import React, { useEffect, useState } from "react";
import {
  Card,
 // CardContent,
  CardDescription,
  //CardFooter,
 // CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteIcon } from "lucide-react";
//import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";

const NotesCard: React.FC = () => {

  type Note = { id:number,title: string ,content:string}

  const [data, setData] = useState<Note[]>([])

  useEffect(() => {
    setData([
      {id:1 , title: "Note 1", content: "This is the content of note 1." },
      {id:2 , title: "Note 2", content: "This is the content of note 2." },
      {id:3 , title: "Note 3", content: "This is the content of note 3." },

    ]);
  }, []);
 
  return (
    <div className="flex-1">
    <h2 className="text-xl font-bold mb-4">Your Notes</h2>
    <div className="grid gap-4">
    {data.map((note, index) => (
          <Card key={index} className="border border-gray-300 p-4">
              <div className="flex items-center justify-between">
            <CardTitle>{note.title}</CardTitle>
            <DeleteIcon className="cursor-pointer text-gray-500 hover:text-red-500"/>
              </div>
            <CardDescription>{note.content}</CardDescription>
          </Card>
        ))}
    </div>
  </div>
  );
};

export default NotesCard;

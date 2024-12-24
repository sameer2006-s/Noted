//import { useState } from 'react'

import './App.css'
import NotesCard from './components/notesCard'

import NotesForm from './components/notesForm'


const App=()=> {

  return (
    <>
    <div className="flex gap-10 p-10">

    <NotesForm/>
      
    <NotesCard/>
    </div>
    </>
  )
}

export default App

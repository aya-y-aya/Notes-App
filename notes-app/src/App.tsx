
import { useState } from 'react';
import { Search, ChevronDown, Plus  } from 'lucide-react';
import { Button } from "@/components/ui/button";
import notepadImage from './assets/notepad.png';
import AddNewNotePopUp from './pop-ups/add-new-note';
import NoteCard from './pop-ups/note-card';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export interface NoteData {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function App(){
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => setIsOpen(!isOpen);
  
  const [buttonText, setButtonText] = useState("All Notes");
  const categories = ['All Notes','Work', 'Personal', 'Ideas', 'Reminders'];
  const handleCategoryClick = (category: string) => {
    setButtonText(category);
    setIsOpen(false);
  };
  
  const [showPopUp, setShowPopUp] = useState(false); 
  const addNewNoteIsOpen = () => setShowPopUp(!showPopUp);

  // Store the list of notes here
  const [notes, setNotes] = useState<Array<{ title: string; content: string; category: string }>>([]);

  // Function to add a new note
  const saveNewNote = (newNote: { title: string; content: string; category: string }) => {
    setNotes([...notes, newNote]); // Add new note to the list
    setShowPopUp(false); // Close the popup
  };

  return (
    <>
      <div className='flex flex-col h-screen overflow-hidden'>

        {/* Header: Logo, Subheading */}
        <header className="flex flex-col mt-4 shrink-0">
          <h1 className="flex justify-center font-anonymous-pro font-bold text-sky-aqua-500 text-3xl">SCRIBBLE</h1>
          <p className="flex justify-center text-center font-anonymous-pro font-bold text-black text-sm p-1">a collection of reminders and miscellaneous notes </p>
        </header>

        {/* Main Function: Search, Category, Add */}
        <section className="mainFunction flex flex-col m-5 p-2 shadow-md shrink-0">

          {/* Search */}
          <div className="max-w-auto h-min flex flex-col p-2">   
              <div className="flex flex-row justify-self-start items-center w-auto p-2 space-x-2 bg-light-cyan-100 rounded-lg">
                <Search className='w-5 h-5'/>
                <input type="search" id="search" className="" placeholder="Search notes..." required />
              </div>
          </div>

          <div className='grid grid-cols-6 gap-2 p-2 w-full'>
            {/* Category Dropdown */}
            <div className='all-notes-dropdown grid col-start-1 col-end-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button onClick={toggleDropDown} className='bg-light-cyan-100 text-black w-32.5'>
                    {buttonText}
                    <ChevronDown></ChevronDown>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-full'>
                  <DropdownMenuGroup>
                    {!isOpen && (
                      // TO DO: Filter notes based on chosen category
                      <DropdownMenuRadioGroup value={buttonText} onValueChange={setButtonText} className='w-full'>
                        {categories.map((category) =>(
                          <DropdownMenuRadioItem 
                            key={category}
                            value={category}
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Add New Note Button */}
            <div className='rounded-xl grid col-span-2 col-start-5'>
              <Button className='flex flex-row bg-sky-aqua-500 text-black shadow-gray-400 shadow-sm 
               hover:bg-sky-aqua-600 active:bg-sky-aqua-700 ring-0 focus:ring-1 focus:ring-black'
                onClick={addNewNoteIsOpen}
              >
                <Plus></Plus>
                Add
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content: Notes */}
        <section className='main-content flex flex-1 flex-col m-5 mt-0 p-2 shadow-md overflow-y-auto'>
          {showPopUp ? (
            <AddNewNotePopUp onClose={addNewNoteIsOpen} onSave={saveNewNote}></AddNewNotePopUp>
          ): (
            notes.length > 0 ? (
              <div className=''>
                {notes.map((note) => (
                  <NoteCard
                  key={note.title} 
                  title={note.title}
                  content={note.content}
                  category={note.category}
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                <img src={notepadImage} className='h-40 w-44'></img>
                <p className='font-inter text-[15px] font-bold text-[#5F5E5E] text-center'>No Notes</p>
                <p className='font-inter text-[15px] text-[#5F5E5E] text-center'>Add your first note by clicking the “Add” button.</p>
              </div>
            )
          )}
        </section>
      </div>
    </>
  );
}
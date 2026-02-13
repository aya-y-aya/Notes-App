import { X, Luggage, User, Lightbulb, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

interface AddNewNoteProps {
  onClose: () => void;
  onSave: (note: {title: string; content: string; category: string;}) => void;
}

export default function AddNewNote({ onClose, onSave }: AddNewNoteProps){
    
    // 1. Create state to hold user input
    const [title, setTitle] = useState(() => {
        const savedTitle = localStorage.getItem('title');
        return savedTitle ? JSON.parse(savedTitle) : '';
    });
    useEffect(() => {
        localStorage.setItem('title', JSON.stringify(title));
    }, [title]);

    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Personal"); // Default category

    // 2. Handle the save action
    const handleSave = () => {
        if (!title || !content) return; // Prevent empty notes
        
        // Send data back to App.tsx
        onSave({ title, content, category });
    };

    return(
        <>
        <div className='flex flex-col'>
                {/* Header */}
                <div className='flex flex-row justify-between mx-4 mb-4 mt-1'>
                    <div className='font-inter font-bold text-sm'>New Note</div>
                    <X onClick={onClose}></X>
                </div>
                <div className='bg-[#F5F5F5] w-full h-full'>
                    <div className='flex flex-col m-2'>
                        {/* Title Input */}
                        <div className='my-1'>
                            <div className='font-inter text-[11px] mb-1'>Title</div>
                            <input type="text" name="title" id=""
                            onChange={(e) => setTitle(e.target.value)}
                            className='border bg-white border-gray-400 rounded-md w-full p-2'/>
                        </div>
                        {/* Content Input */}
                        <div className='my-2'>
                            <div className='font-inter text-[11px] mb-1'>Content</div>
                            <textarea name="content" id="" rows={3} cols={50} 
                            onChange={(e) => setContent(e.target.value)}
                            className='border bg-white border-gray-400 rounded-md w-full p-2'/>
                        </div>
                        {/* Category Buttons */}
                        <div className='flex flex-col my-2'> 
                            <div className='font-inter text-[11px] mb-1'>Tags</div>
                            <div className='grid grid-cols-2 grid-rows-2 gap-2 bg-white rounded-md p-2'>
                                <Button onClick={() => setCategory("Work")} className='w-auto max-h-min rounded-xl bg-dark-teal-600 text-white
                                hover:bg-dark-teal-700 active:bg-dark-teal-800 ring-0 focus:ring-2 focus:ring-dark-teal-800'>
                                <Luggage></Luggage>
                                Work
                                </Button>
                                <Button onClick={() => setCategory("Personal")} className='w-auto max-h-min rounded-xl bg-taupe-600 text-white
                                hover:bg-taupe-700 active:bg-taupe-800 ring-0 focus:ring-2 focus:ring-taupe-800'>
                                    <User></User>
                                    Personal
                                </Button>
                                <Button onClick={() => setCategory("Ideas")} className='w-auto max-h-min rounded-xl bg-aquamarine-600 text-white
                                hover:bg-aquamarine-700 active:bg-aquamarine-800 ring-0 focus:ring-2 focus:ring-aquamarine-800'>
                                    <Lightbulb></Lightbulb>
                                    Ideas
                                </Button>
                                <Button onClick={() => setCategory("Reminder")} className='w-auto max-h-min rounded-xl bg-yellow-300 text-white
                                hover:bg-yellow-400 active:bg-yellow-500 ring-0 focus:ring-2 focus:ring-yellow-500'>
                                    <Bell></Bell>
                                    Reminder
                                </Button>
                            </div>
                        </div>
                        {/* Save Button */}
                        <Button
                        // Include saveNote method
                        onClick={handleSave} 
                        className='bg-sky-aqua-500 text-white hover:bg-sky-aqua-700'>
                            Save note
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// function useLocalStorage (noteData, initialValue){

//     const [note, setNote] = useState(() => {
//         try{
//             const note = window.localStorage.getItem(noteData);
//             return note ? JSON.parse(note) : initialValue
//         } catch (error) {
//             console.log(error);
//             return initialValue;
//         }
//     });

//     useEffect(() => {
//         try {
//             window.localStorage.setItem(noteData, JSON.stringify(setNote));
//         } catch (error) {
//             console.log(error);
//         }
//     }, [note, setNote]);

//     return [note, setNote];
// }
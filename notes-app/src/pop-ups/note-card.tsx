import { Tag } from 'lucide-react';

// 1. Define what data the card accepts
interface NoteCardProps {
  title: string;
  content: string;
  category: string;
}

export default function NoteCard({ title, content, category }: NoteCardProps) {
  // 2. Define colors for categories (Optional, but looks nice)
  const categoryColor = () => {
    switch (category) {
      case 'Work': return 'bg-dark-teal-600 text-black';
      case 'Personal': return 'bg-taupe-600 text-black';
      case 'Ideas': return 'bg-aquamarine-600 text-black';
      case 'Reminder': return 'bg-yellow-300 text-black';
      default: return 'bg-gray-400 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-auto min-h-35 mb-4">
      {/* Header: Title and Category Badge */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-900 leading-tight w-3/4 wrap-break-word">
          {title}
        </h3>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${categoryColor()}`}>
          {category}
        </span>
      </div>

      {/* Content Area */}
      <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
        {content}
      </p>

      {/* Footer: Simple Icon */}
      <div className="mt-auto pt-4 flex items-center text-gray-400">
        <Tag className="w-3 h-3 mr-1" />
        <span className="text-xs">Category: {category}</span>
      </div>
    </div>
  );
}
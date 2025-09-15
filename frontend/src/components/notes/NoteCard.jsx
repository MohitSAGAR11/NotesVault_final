const NoteCard = ({ note, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onClick(note)}
      className="card hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {note.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {note.content}
        </p>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          {formatDate(note.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
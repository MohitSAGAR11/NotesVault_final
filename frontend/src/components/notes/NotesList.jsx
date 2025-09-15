import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../store/slices/notesSlice';
import { fetchTags } from '../../store/slices/tagsSlice';
import NoteCard from './NoteCard';
import SearchBar from './SearchBar';

const NotesList = ({ onNoteSelect, onNewNote }) => {
  const dispatch = useDispatch();
  const { notes, loading, error, searchTerm, selectedTag } = useSelector((state) => state.notes);

  useEffect(() => {
    const params = {};
    if (selectedTag) params.tag = selectedTag;
    if (searchTerm) params.search = searchTerm;
    
    dispatch(fetchNotes(params));
  }, [dispatch, searchTerm, selectedTag]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Notes</h1>
      </div>

      <SearchBar />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedTag 
              ? 'Try adjusting your search or filter' 
              : 'Create your first note to get started!'
            }
          </p>
          <button
            onClick={onNewNote}
            className="btn btn-primary"
          >
            Create Note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onClick={onNoteSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
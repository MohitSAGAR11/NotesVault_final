import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from './components/common/Layout';
import LoginForm from './components/auth/LoginForm';
import NotesList from './components/notes/NotesList';
import NoteEditor from './components/notes/NoteEditor';
import TagCloud from './components/tags/TagCloud';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentView, setCurrentView] = useState('notes');
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setCurrentView('editor');
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setCurrentView('editor');
  };

  const handleNoteSaved = () => {
    setCurrentView('notes');
    setSelectedNote(null);
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Layout
      currentView={currentView}
      setCurrentView={setCurrentView}
      onNewNote={handleNewNote}
    >
      {currentView === 'notes' && (
        <NotesList 
          onNoteSelect={handleNoteSelect}
          onNewNote={handleNewNote}
        />
      )}
      {currentView === 'tags' && (
        <TagCloud 
          onTagClick={(tag) => {
            setCurrentView('notes');
            // Tag filtering will be handled by NotesList component
          }} 
        />
      )}
      {currentView === 'editor' && (
        <NoteEditor 
          note={selectedNote}
          onSave={handleNoteSaved}
          onCancel={() => setCurrentView('notes')}
        />
      )}
    </Layout>
  );
}

export default App;
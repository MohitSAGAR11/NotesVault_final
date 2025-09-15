import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = ({ currentView, setCurrentView, onNewNote }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              📝 NotesVault
            </h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('notes')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'notes'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Notes
            </button>
            
            <button
              onClick={() => setCurrentView('tags')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'tags'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tags
            </button>
            
            <button
              onClick={onNewNote}
              className="btn btn-primary"
            >
              + New Note
            </button>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                Welcome, {user?.username || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-sm"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
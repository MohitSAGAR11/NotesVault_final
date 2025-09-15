import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSelectedTag } from '../../store/slices/notesSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedTag } = useSelector((state) => state.notes);
  const { tags } = useSelector((state) => state.tags);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [localSearchTerm, dispatch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search notes..."
          className="input"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="sm:w-48">
        <select
          value={selectedTag}
          onChange={(e) => dispatch(setSelectedTag(e.target.value))}
          className="input"
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.tag} value={tag.tag}>
              {tag.tag} ({tag.count})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
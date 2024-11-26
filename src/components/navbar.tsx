import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

 

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="w-full top-0 relative navbar  " 
    style={{ 
      width: "100%",  
      top: "1rem", 
      left: 0,
      margin: 0, 
      zIndex: 1000, }}>
     <div className="flex-grow">
          <SearchBar />
        </div>

</nav>
                            
                       
 
  );
};

export default Navbar;
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
      zIndex: 1000,
      display: "flex",  // Utilisation de flexbox pour aligner les éléments horizontalement
      justifyContent: "flex-start",  // Aligner à gauche
      padding: "0 1rem",  // Ajoute un peu de marge sur les côtés 
       }}> 
     <div className="flex-grow">
          <SearchBar />
            {/* Partie gauche : bouton Sign Up */}
      </div>
      <div>
        <Link to="/connexion">
          <button className="bg-blue-950 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900 transition duration-300 mt-1 top-1 text-sm">
            Sign Up
          </button>
        </Link>
      </div>
        

</nav>
                            
                       
 
  );
};

export default Navbar;
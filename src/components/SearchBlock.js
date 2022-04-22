import React from 'react';

const SearchBlock = ({search, setSearch}) => {

  return (
    <div className='search-block'>
        <form action="" className="search-form">
            <input type="search" 
              className='input-search' 
              placeholder='Search or start new chat'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    </div>
  )
}

export default SearchBlock;

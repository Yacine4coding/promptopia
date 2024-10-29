"use client";

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};



const Feed = () => {
  // Search handle
  const [searchText, setSearchText] = useState('');
  const [searchTimeout,setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const [allPosts, setAllPosts] = useState([]);


  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  }

  
  useEffect(() => {
    fetchPosts();
  },[]);


  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i') // 'i' flag for case-insensetive search 
    return allPosts.filter(post => post.prompt.match(regex) 
                        || post.tag.match(regex) 
                        || post.creator.username.match(regex)
    );
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        setSearchResult(filterPrompts(searchText));
      }, 500)
    );
  }

  const handleTagClick= (tagName) => {
    setSearchText(tagName.slice(1));
    setSearchResult(filterPrompts(tagName.slice(1)));
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText} 
          onChange={handleSearchChange}
          required={true}
          className="search_input peer"
        />
      </form>
      {searchText? (
        <PromptCardList 
          data={searchResult}
          handleTagClick={handleTagClick}
        />
      ):(
        <PromptCardList 
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}
      
      
    </section>
  )
}

export default Feed
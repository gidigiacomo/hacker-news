import React, {useState,useEffect} from 'react';
import Article from './Article';
const base_url="http://hn.algolia.com/api/v1/search?query="


function Search() {
  const searchTerm = document.getElementById("input")
  const [story, setStory] = useState([])

  const fetchData = () => {
    fetch(`${base_url}${searchTerm}&tags=story`)
      .then((res) => res.json())
      .then((json) => setStory(json.hits))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData()
  }, [])

  console.log(story);
  return (
    <div className="App">
      <form>
        <input type="text" id="input" />
        <button onClick={fetchData}>Search</button>
      </form>
      <Article />
      
    </div>
  );
}

export default Search;

import React, {useState, useEffect} from 'react';

function Article () {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const isLoading = (posts.length === 0 ? true : false);
    const postsSection = document.querySelector('.postsSection');

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleKeyPress = (e) => {
        e.preventDefault();
        if(e.key === 'Enter') handleClick();
    }

    const handleClick = async () => {
        const searchField = document.querySelector('#searchField');
        const content = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${search}`);
        const jsonDoc = await content.json();
        if(jsonDoc.hits.length === 0) {
            postsSection.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>
                <p>No results found for "${searchField.value}"</p>
            `;
        } else {
            setPosts(jsonDoc.hits);
        }
        searchField.value = '';
    }

    useEffect(() => {
        const loading = setInterval(() => {
            fetch("https://hn.algolia.com/api/v1/search_by_date?query=story")
                .then((res) => res.json())
                .then((json) => setPosts(json.hits))
                .catch((err) => console.log(err));
        }, 1200);
    }, []);


    return (
        <div className="content-container">
            <div className="Searchbar">
                <h1>Welcome to HackerNews 2.0</h1>
                <input type='text' placeholder="Your Topic" onChange={handleChange} onKeyPress={handleKeyPress} id="searchField" />
                <button onClick={handleClick}>Search</button>
            </div>
            <div className="postsSection">
                {isLoading
                ? (
                    <div className="spinner-container">
                        <div className="spinner">
                            <div></div>   
                            <div></div>    
                            <div></div>    
                            <div></div>    
                        </div>
                    </div>
                )
                : posts.map((post) => {
                    if(post.story_title === null) return false
                    return (
                        <section className='Post'>
                            <h2>{post.story_title}</h2>
                            <br />
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

export default Article;
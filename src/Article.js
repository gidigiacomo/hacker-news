import React, {useState, useEffect} from 'react';

function Article () {
    const [news, setNews] = useState([]);
    const [url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=react&tags=story")
    const searchTerm = document.getElementById("input")
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((json) => setNews(json.hits))
        .catch((err) => console.log(err));
    }, []);
    const fetchData = () => {
        setUrl(`${url}${searchTerm}&tags=story`)
        fetch(url)
          .then((res) => res.json())
          .then((json) => setNews(json.hits))
          .catch((err) => console.log(err));
      };
      useEffect(() => {
        fetchData()
      }, [])    
    console.log(news);

    return (
        <div>
            <div>
                <form>
                <input type="text" id="input" />
                <button onClick={fetchData}>Search</button>
                </form>
            </div>
                        
            {news?.map((news) => {
                return (
                    <section>
                        <div>
                            <li key={news.id}><a href={news.url}>{news.title}</a></li>
                            </div>
                        <br />
                    </section>
                );
            })}
        </div>
    );
}

export default Article;
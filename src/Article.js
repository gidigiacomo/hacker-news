import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

function Article () {
    const [currentPage, setCurrentPage] = useState(0)
    const [news, setNews] = useState([])
    const [text, setText] = useState("")
    const [query, setQuery] = useState("React")
    const [isLoading, setisLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const searchTerm = document.getElementById("input")

    const handlePageChange = event =>{
        setCurrentPage(event.selected)
        console.log(event)
    }

    useEffect(() => {
        setisLoading(true)
        const fetchNews = () =>{
        fetch(`http://hn.algolia.com/api/v1/search?query=${query}`,{
            params: {page: currentPage},
        })
        .then((res) => res.json())
        .then((json) => {setNews(json.hits);
         setTotalPages(json.nbPages)})
        .catch((err) => console.log(err));
        };
        fetchNews()
        console.log(news)
        setisLoading(false)
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!text){
            alert("Input is empty")
        }else{
            setQuery(text);
            setText("");
            
        }
        
      };
    

    return (
        <div>
            <h1>Hacker News</h1>
            <br/>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col'>
                            <input type="text" placeholder='Search for news' className='form-control' id="input" value={text} onChange={(e) => setText(e.target.value)} />
                        </div>
                        <div className='col'>
                            <button className='btn btn-dark' onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <br/><br/>
              {isLoading?<div className='spinner'></div>: <div>{news?.map((news) => {
                return (
                    <section>
                        <div className='container'>
                            <li key={news.id}>
                                <a href={news.url}>{news.title}</a>
                                <div className='d-flex'>
                                <p>{news.points}points | </p>
                                <p>By : {news.author} | </p>
                                <p>{news.num_comments} comments </p>
                                </div>
                            </li>
                        </div>
                        <br />
                    </section>
                );
            })}</div>}     

            <ReactPaginate
                nextLabel='>>'
                previousLabel='<<'
                breakLabel='...'
                forcePage={currentPage}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                onPageChange={handlePageChange}
                className="pagination"
                activeClassName='active-page'
                previousClassName='previous-page'
                nextClassName='next-page'
            />

            </div>
    );
}

export default Article;
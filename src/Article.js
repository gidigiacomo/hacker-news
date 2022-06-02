import React, {useState, useEffect} from 'react';

function Article () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://hn.algolia.com/api/v1/search_by_date?query=story")
        .then((res) => res.json())
        .then((json) => setPosts(json.hits))
        .catch((err) => console.log(err));
    }, []);

    console.log(posts);

    return (
        <div>
            {posts?.map((post) => {
                return (
                    <section>
                        <div>{post.story_title}</div>
                        <div>{post.comment_text}</div>
                        <br />
                    </section>
                );
            })}
        </div>
    );
}

export default Article;
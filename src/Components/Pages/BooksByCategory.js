import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const BooksByCategory = () => {
    const [books, setBooks] = useState([]);
    const { Id } = useParams();
    let apiUrl = ""
    if (Id && Id != null) {
        apiUrl = `http://localhost:4000/books/categories/${Id}`;
    } else {
        apiUrl = 'http://localhost:4000/books';
    }

    const getBooks = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBooks(data.allBook);
        console.log(data.allBook);
    };
    useEffect(() => {
        getBooks();
    }, [apiUrl]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    {
                        books.map((book, index) => (
                            <div key={index} className="col-sm-4 my-4">
                                <Link to={`/books/${book._id}`}>{book.name},<br></br> Writer - {book.writer}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default BooksByCategory
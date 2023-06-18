import { Link } from "react-router-dom";
const Home = (props)=>{
    
    return (
        <div>
            <ul>
                {
                    props.Books.map((book, index)=>(
                        <li key={index} className="my-3"><Link to={`/books/${book._id}`}>{book.name},<br></br> Writer - {book.writer}.</Link></li>
                    ))
                }
            </ul>
        </div>
    )
};

export default Home;
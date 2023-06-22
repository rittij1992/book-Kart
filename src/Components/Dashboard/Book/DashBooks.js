import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RedirectToBookListContext } from "../../../ContextApi/RedirectBookListContext";
import FilterBook from "./FilterBook";
import noImage from "./dummy-image-square.jpg";


const DashBooks = () => {

    const { allBookLink, setAllBookLink } = useContext(RedirectToBookListContext);
    const [dashBooks, setDashBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchCat, setSearchCat] = useState('');
    const [searchWriter, setSearchWriter] = useState('');
    console.log(process.env.PUBLIC_URL, "env123");


    // console.log(allBookLink, "Context123");

    let bookListUrl = `http://localhost:4000/books?page=${currentPageId}`;



    if (allBookLink) {
        bookListUrl = `http://localhost:4000/books?page=${currentPageId}`;

    } else if (searchText && searchText !== "" && searchCat && searchCat !== "" && searchWriter && searchWriter !== "") {
        bookListUrl = `http://localhost:4000/books?page=${currentPageId}&searchText=${searchText}&searchCat=${searchCat}&searchWriter=${searchWriter}`;

    } else if (searchText && searchText !== "") {
        bookListUrl = `http://localhost:4000/books?page=${currentPageId}&searchText=${searchText}`;

    } else if (searchCat && searchCat !== "") {
        bookListUrl = `http://localhost:4000/books?page=${currentPageId}&searchCat=${searchCat}`;

    } else if (searchWriter && searchWriter !== "") {
        bookListUrl = `http://localhost:4000/books?page=${currentPageId}&searchWriter=${searchWriter}`;

    }


    const getDashBooks = async () => {
        const response = await fetch(bookListUrl);
        const data = await response.json();
        console.log(data.allBooks);
        setDashBooks(data.allBooks);
        setTotalPages(data.totalPages);
    }

    useEffect(() => {
        getDashBooks();
    }, [bookListUrl]);

    const deleteBook = async (id) => {
        if (window.confirm("Delete this book?")) {
            const response = await fetch(`http://localhost:4000/books/deletebook/${id}`,
                { method: 'DELETE' });
            const data = await response.json();
            console.log(data);
            navigate('/dashboard/books');
        } else {
            navigate('/dashboard/books');
        };
    };

    const getPageID = (pageID) => {
        console.log(pageID);
        setCurrentPageId(pageID);
    }
    const searchCatData = (data) => {
        setAllBookLink(false);
        console.log(data);
        if (data.searchText != "") setCurrentPageId(1)
        setSearchText(data.searchText);
        setSearchCat(data.searchCat);
        setSearchWriter(data.searchWriter);
        console.log(data.searchCat);
    }


    return (
        <div>
            <FilterBook getFilterData={searchCatData} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Book Cover Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Writer</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dashBooks?.map((book, index) => (

                            <tr key={index}>

                                <th scope="row">
                                    {(book.coverImage) ?
                                        <img
                                            height={100}
                                            width={70}
                                            src={`http://localhost:4000/${book.coverImage.replace('public', '')}`} /> :

                                        /* <img
                                         height={100}
                                         width={70}
                                          src={`http://localhost:3000/dummy-image-square.jpg`}/>
                                            */
                                        /*<img
                                            height={100}
                                            width={70}
                                            src={noImage} />*/

                                            <img
                                            height={100}
                                            width={70}
                                            src={`/logo512.png`} />
                                    }

                                </th>
                                <td>{book.name}</td>
                                <td>{book.release}</td>
                                <td>{book.writer}</td>
                                <td>{book.category?.categoryName}</td>
                                <td>
                                    <Link to={`/dashboard/books/edit/${book._id}`}>Edit</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link onClick={() => deleteBook(book._id)}
                                        className="text-danger">Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ul className="pagination">
                {
                    pages?.map((page, index) => (
                        <li onClick={() => getPageID(page)} key={index}><Link>{page}</Link></li>
                    ))
                }
            </ul>
        </div>

    )
};

export default DashBooks;
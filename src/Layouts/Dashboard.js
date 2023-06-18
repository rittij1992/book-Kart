import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../ContextApi/UserContext";
import { RedirectToBookListContext } from "../ContextApi/RedirectBookListContext";

const DashboardLayout = () => {
    const { setUserToken } = useContext(UserContext);
    const {setAllBookLink, setSearchText, setSearchCat} = useContext(RedirectToBookListContext);
    
    const resetSerachParams = ()=>{
        setSearchText(null);
        setSearchCat(null);
        setAllBookLink(true);
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <ul>
                            <li><Link to={'/dashboard'}>Home</Link></li>
                            <li><Link to={`/dashboard/books`}>Books</Link>
                                <ul>
                                    <li
                                        onClick={(e) => resetSerachParams()}>
                                        <Link
                                            to='/dashboard/books'>All Books
                                        </Link>
                                    </li>
                                    <li><Link to='/dashboard/books/add'>Add Book</Link></li>
                                </ul>
                            </li>
                            <li><Link to='/dashboard/categories'>Categories</Link>
                                <ul>
                                    <li><Link to='/dashboard/categories'>All Categories</Link></li>
                                    <li><Link to='/dashboard/categories/add'>Add Category</Link></li>
                                </ul>
                            </li>
                            <li>Users</li>
                            <li><Link onClick={() => setUserToken(null)}>Log Out</Link></li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default DashboardLayout;
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="mx-3 fs-4 fw-bold">
                            <Link to="/">Book Kart</Link>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-3">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/books">Books</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link to="/contact">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                                <button type="button" className="btn btn-outline-primary btn-sm mx-3">Login</button>
                                <button type="button" className="btn btn-outline-primary btn-sm">Register</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
};

export default Header;
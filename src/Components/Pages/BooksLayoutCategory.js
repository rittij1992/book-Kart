import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const BooksLayoutCategory = ()=>{
    const [categories, setCategories] = useState([]);
    const getCategories = async ()=>{
        const response = await fetch('http://localhost:4000/categories');
        const data = await response.json();
        setCategories(data.allData);
        console.log(data.allData);
    };
    useEffect(()=>{
        getCategories();
    },[]);
    return(
        <div className="container">
            <div className="row">
                <div className="bg-light col-sm-2 my-4">
                    <h5>Categories</h5>
                    <ul>
                        {
                            categories.map((category, index)=>(
                                <li key={index}>
                                    <Link to={`/books/categories/${category._id}`}>{category.categoryName}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-sm-10">
                        <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
};

export default BooksLayoutCategory
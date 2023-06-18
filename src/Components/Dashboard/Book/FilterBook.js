import { useEffect, useState } from "react";

const FilterBook = ({ getFilterData }) => {


    const [searchText, setSearchText] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [searchCat, setSearchCat] = useState("");
    const [writers, setWriters] = useState([]);

    const getCategories = async () => {
        const response = await fetch('http://localhost:4000/categories');
        const result = await response.json();
        setAllCategories(result.allData);
    }

    const getWriters = async ()=>{
        const response = await fetch('http://localhost:4000/books/writers');
        const result = await response.json();
        setWriters(result.allWriter);
    }

    useEffect(() => {
        getCategories();
        getWriters();
    }, []);


    const submitFilter = (e) => {
        e.preventDefault();
        let filterData = {
            searchText,
            searchCat
        }
        getFilterData(filterData)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="filter-area">
                    <form onSubmit={submitFilter} className="d-flex">
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <select onChange={(e)=>setSearchCat(e.target.value)}>
                            <option>Select Category</option>
                            {
                                allCategories.map((category, index) => (
                                    <option value={category._id} key={index}>{category.categoryName}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e)=>setSearchCat(e.target.value)}>
                            <option>Select Writer</option>
                            {
                                writers.map((writer, index) => (
                                    <option value={writer} key={index}>{writer}</option>
                                ))
                            }
                        </select>
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FilterBook;
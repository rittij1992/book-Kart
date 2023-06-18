import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterCategory from "./FilterCategory";

const AllCategory = () => {
    const navigate = useNavigate();
    const [allCategories, setAllCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const pages = Array.from({length:totalPages},(_,index)=> index + 1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const [searchText, setSearchText] = useState("");
    

    let catUrl = `http://localhost:4000/categories?page=${currentPageId}`

    if(searchText && searchText != ""){
        catUrl = `http://localhost:4000/categories?page=${currentPageId}&catSearchData=${searchText}`
    }

    const getAllCategories = async () => {
        const response = await fetch(catUrl);
        const result = await response.json();
        console.log(result.data, 'this is category');
        setAllCategories(result.data);
        setTotalPages(result.totalPages);
    }
    useEffect(() => {
        getAllCategories();
    }, [currentPageId, catUrl]);

    const deleteCategory = async (id) => {
        if (window.confirm('Delete this category?')) {
            const response = await fetch(`http://localhost:4000/categories/deletecategory/${id}`,
                { method: 'DELETE' });
            const result = await response.json();
            console.log(result)
            navigate('/dashboard/categories');
        } else {
            navigate('/dashboard/categories');
        }
    }

        const getPageId = (pageId)=>{
            console.log(pageId);
            setCurrentPageId(pageId);
        }


            const searchCat = (data)=>{
                console.log(data);
                if(data.catSearchData != "") setCurrentPageId(1);
                setSearchText(data.catSearchData);
            };

    return (
        <div>
            <FilterCategory getFilterCat={searchCat}/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Category Name1</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCategories.map((category, index) => (
                            <tr key={index}>
                                <th scope="row">{category.categoryName}</th>
                                <td><Link to={`/dashboard/categories/edit/${category._id}`}>Edit</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link className="text-danger" onClick={() => deleteCategory(category._id)}>Delete</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ul className="pagination">
                {
                    pages?.map((page, index)=>(
                        <li onClick={()=>getPageId(page)} key={index}><Link>{page}</Link></li>
                    ))
                }
            </ul>
        </div>
    )
};

export default AllCategory;
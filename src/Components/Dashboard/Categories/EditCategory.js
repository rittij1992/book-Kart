import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [categoryName, setCategoryName] = useState([]);
    const getCategory = async()=>{
        const response  = await fetch(`http://localhost:4000/categories/${id}`);
        const result = await response.json();
        setCategoryName(result.data.categoryName);
        // console.log(result.data.categoryName);
    };
    useEffect(()=>{
        getCategory();
    },[]);

    const updateCategory = async (e) => {
        e.preventDefault();
        const catData = {categoryName};
        // console.log(catData);
        const response = await fetch(`http://localhost:4000/categories/updatecategory/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catData)
        });
        const result = await response.json();
        navigate('/dashboard/categories');
    };
    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <form onSubmit={updateCategory}>
                            <div className="my-2 form-group">
                                <label>New Category Name:</label>
                                <input value={categoryName} className="form-control my-1" name="categoryName" onChange={(e)=>setCategoryName(e.target.value)}></input>
                            </div>
                            <div className="my-2 form-group">
                                <button className="btn btn-primary" type="submit">UPDATE CATEGORY</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditCategory;
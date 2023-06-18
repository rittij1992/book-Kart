import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState([]);
    

    const newCategory = async(e)=>{
        e.preventDefault();
        const newCatData = {categoryName};
        console.log(newCatData)
        const response = await fetch('http://localhost:4000/categories/addcategory',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newCatData)
        });
        const result = await response.json();
        console.log(result)
        navigate('/dashboard/categories');
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <form onSubmit={newCategory}>
                            <div className="my-2 form-group">
                                <label>New Category Name:</label>
                                <input className="form-control my-1" name="categoryName" onChange={(e)=>setCategoryName(e.target.value)}></input>
                            </div>
                            <div className="my-2 form-group">
                                <button className="btn btn-primary" type="submit">ADD CATEGORY</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddCategory;
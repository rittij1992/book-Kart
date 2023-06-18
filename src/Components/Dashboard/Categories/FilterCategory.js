import { useState } from "react";

const FilterCategory = ({getFilterCat})=>{
    const [catSearchData, setCatSearchData] = useState("");
    
    
    
    const SubmitData =(e)=>{
        e.preventDefault();
        let filterData = {catSearchData};
        getFilterCat(filterData);
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="filter-area">
                    <form onSubmit={SubmitData} className="d-flex">
                        <input
                        onChange={(e)=>setCatSearchData(e.target.value)}
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        />

                        <button type="submit" className="btn btn-success" >Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FilterCategory;
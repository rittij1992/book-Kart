import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [bookName, setBookName] = useState("");
    const [bookRelease, setBookRelease] = useState("");
    const [bookWriter, setBookWriter] = useState("");
    const [category, setCategory] = useState("");
    const [selectCoverImg, setSelectCoverImg] = useState(null);

    const getCategories = async () => {
        const response = await fetch(`http://localhost:4000/categories`);
        const result = await response.json();
        // console.log(result.data, "for category");
        setCategories(result.allData);
    }

    useEffect(() => {
        getCategories();
    }, [])

    const addBook = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", bookName)
        // formData.append("writer", bookWriter);
        // formData.append("release", bookRelease);
        // formData.append("category", category);
        // formData.append("coverImage", selectCoverImg);
        // const newBookData = {name:bookName, writer:bookWriter, release:bookRelease, category}
        // console.log(newBookData);
        const response = await fetch('http://localhost:4000/books/addbook',
            {
                method: 'POST',
                
                body: formData
            });
        const data = await response.json();
        console.log(data);
        // navigate('/dashboard/books');
    };

    const changeUploadImageFile = (e) => {
        setSelectCoverImg(e.target.files[0]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9">
                    <form onSubmit={addBook}>
                        <div>
                            <input onChange={changeUploadImageFile} type="file" className="form-control"></input>
                        </div>
                        <div className="my-1 form-group">
                            <label>Name:</label>
                            <input onChange={(e) => setBookName(e.target.value)} className="form-control" name="bookName"></input>
                        </div>

                        <div className="my-2 form-group">
                            <label>Writer:</label>
                            <input onChange={(e) => setBookWriter(e.target.value)} className="form-control" name="bookWrite"></input>
                        </div>

                        <div className="my-2 form-group">
                            <label>Release Date:</label>
                            <input onChange={(e) => setBookRelease(e.target.value)} className="form-control" name="bookRelease"></input>
                        </div>

                        <div>
                            <label className="my-1">Category:</label>
                            <select className="form-control"
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {
                                    categories.map((cat, index) => (
                                        <option key={index} value={cat._id}>{cat.categoryName}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="my-2 form-group">
                            <button className="btn btn-primary" type="submit">ADD BOOK</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default AddBook
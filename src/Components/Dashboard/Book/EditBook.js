import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [bookName, setBookName] = useState("");
    const [bookRelease, setBookRelease] = useState("");
    const [bookWriter, setBookWriter] = useState("");
    const [category, setCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);

    const getCategories = async () => {
        const response = await fetch(`http://localhost:4000/categories`);
        const result = await response.json();
        console.log(result.data, "for category");
        setAllCategories(result.allData);
    }

    const getBook = async () => {
        const response = await fetch(`http://localhost:4000/books/${id}`);
        const data = await response.json();
        console.log(data, "this is edit book data");
        setBookName(data.bookData.name);
        setBookRelease(data.bookData.release);
        setBookWriter(data.bookData.writer);
        setCategory(data.bookData.category);
        setBook(data.bookData);
    }
    useEffect(() => {
        getBook()
        getCategories()
    }, [])

    const updateBook = async (e) => {
        e.preventDefault();
        const bookData = { name: bookName, writer: bookWriter, release: bookRelease, category };
        console.log(bookData);
        const response = await fetch(`http://localhost:4000/books/updatebook/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });
        const data = await response.json();
        console.log(data);
        navigate('/dashboard/books');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9">

                    <form onSubmit={updateBook}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                className="form-control"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                name="bookName">
                            </input>
                        </div>

                        <div className="my-2">
                            <label >Writer:</label>
                            <input className="form-control" value={bookWriter} onChange={(e) => setBookWriter(e.target.value)} name="bookWrite"></input>
                        </div>

                        <div className="my-2">
                            <label >Release:</label>
                            <input className="form-control" value={bookRelease} onChange={(e) => setBookRelease(e.target.value)} name="bookRelease"></input>
                        </div>

                        <div>
                            <label>category</label>
                            <select className="form-control"
                                defaultValue={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {
                                    allCategories.length > 0 && allCategories.map((cat, index) => (
                                        <option key={index} value={cat._id}>{cat.categoryName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="my-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBook
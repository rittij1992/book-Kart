import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './ContextApi/UserContext';
import { BooksLinkProvider } from './ContextApi/RedirectBookListContext';
// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import BooksLayoutCategory from './Components/Pages/BooksLayoutCategory';
import BooksByCategory from './Components/Pages/BooksByCategory';
import NotFound from './Components/Pages/NotFound';
import FrontendLayout from './Layouts/Frontend';
import DashboardLayout from './Layouts/Dashboard';
import Dashboard from './Components/Dashboard/Index';
import Auth from './Layouts/Auth';
import Login from './Components/Auth/Login';
import AuthGuard from './Guard/Index';
import DashBooks from './Components/Dashboard/Book/DashBooks';
import AddBook from './Components/Dashboard/Book/AddBook';
import EditBook from './Components/Dashboard/Book/EditBook';
import AllCategory from './Components/Dashboard/Categories/AllCategory';
import AddCategory from './Components/Dashboard/Categories/AddCategory';
import EditCategory from './Components/Dashboard/Categories/EditCategory';



function App() {

  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const response = await fetch('http://localhost:4000/books');
    const data = await response.json();
    // console.log(data.allBooks);
    setBooks(data.allBook);
  }
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <BooksLinkProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/auth' element={<Auth></Auth>}>
                <Route path='login' element={<Login />}></Route>
              </Route>

              <Route element={<AuthGuard />}>
                <Route path='/dashboard' element={<DashboardLayout />}>
                  <Route index element={<Dashboard />}></Route>
                  <Route path='books'>
                    <Route index element={<DashBooks />}></Route>
                    <Route path='add' element={<AddBook />}></Route>
                    <Route path='edit/:id' element={<EditBook />}></Route>
                  </Route>
                  <Route path='categories'>
                    <Route index element={<AllCategory />}></Route>
                    <Route path='add' element={<AddCategory />}></Route>
                    <Route path='edit/:id' element={<EditCategory />}></Route>
                  </Route>
                </Route>
              </Route>

              <Route path='/' element={<FrontendLayout />}>
                <Route index element={<Home Books={books} />}></Route>
                <Route path='about' element={<About />}></Route>
                <Route path='contact' element={<Contact />}></Route>
                <Route path='books' element={<BooksLayoutCategory />}>
                  <Route index element={<BooksByCategory />}></Route>
                  <Route path='categories/:Id' element={<BooksByCategory />}></Route>
                </Route>
              </Route>

              <Route path='/*' element={<NotFound />}></Route>

            </Routes>
          </BrowserRouter>
        </BooksLinkProvider>
      </UserProvider>
    </div>
  );
}

export default App;

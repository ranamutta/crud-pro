import { useState } from "react";
import Header from "./components/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./components/BookCard/BookCard";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import EditModal from "./components/EditModal/EditModal";






function App() {




  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editItem, setEditItem] = useState({})



  const handleChange = (e) => {
    setBookName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn("Lütfen Kitap İsmi Giriniz", { autoClose: 2000 });
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    setBooks([...books, newBook]);
    toast.success("Kitap Başarıyla Eklendi", { autoClose: 2000 })
    setBookName("");
  };


  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId)
    setDeleteTitle(deleteBookTitle)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId)
    setBooks(filteredBooks)
    setShowDeleteModal(false)

    toast.error("Kitap Başarıyla Silindi", { autoClose: 2000 });
  }

  const handleEditModal = (editBook) => {
    setEditItem(editBook)
    setShowEditModal(true)
  }

  const handleEditBook=()=>{
    const editIndex = books.findIndex((book) => book.id === editItem.id)

    const cloneBooks = [...books]

    cloneBooks.splice(editIndex, 1, editItem)
    setBooks(cloneBooks)
    setShowEditModal(false)
    toast.info("Kitap Başarıyla Güncellendi", { autoClose: 2000 })
  }

  const handleRead = (readBook) => {
    const updatedBook = { ...readBook, isRead: !readBook.isRead }
    const index = books.findIndex((book) => book.id === readBook.id)
    const cloneBooks = [...books]
    
    cloneBooks[index] = updatedBook
    setBooks(cloneBooks)
  };

  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            placeholder="Bir Kitap İsmi Giriniz..."
            type="text"
            className="form-control shadow"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {books.length === 0 ? (
          <h4>Henüz Herhangi Bir Kitap Eklenmedi</h4>
        ) : (
          books.map((book) => <BookCard handleEditModal={handleEditModal} handleModal={handleModal} bookInfo={book}
            key={book.id} handleRead={handleRead} />)
        )}
      </div>

      {showDeleteModal && <DeleteModal bookTitle={deleteTitle} handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal} />}
      {showEditModal && <EditModal handleEditBook={handleEditBook} editItem={editItem} setEditItem={setEditItem} setShowEditModal={setShowEditModal} />}
    </div>
  );
}

export default App;

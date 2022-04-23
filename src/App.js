import { useState } from "react";

import styles from "./App.module.css";

import AddBookForm from "./Components/AddBook/AddBookForm";
import Library from "./Components/Library/Library";
import UserBooks from "./Components/UserBooks/UserBooks";

function App() {
  //-------------------------------------------------------BOOKS IN MEMORY
  const [booksInLibrary, setBooksInLibrary] = useState({
    "111-111-111-111-1": {
      count: 0,
      name: "test",
      price: 100,
      ISBN: "111-111-111-111-1",
    },
  });

  const [userBooks, setUserBooks] = useState({
    "111-111-111-111-1": {
      count: 1,
      name: "test",
      price: 100,
      ISBN: "111-111-111-111-1",
      borrowDate: [new Date("01/Apr/2022 03:00")],
    },
  });

  //-------------------------------------------------------RENDER LOGIC
  const [formOn, setFormOn] = useState(false);
  const [onDisplay, setOnDisplay] = useState("Library");

  //-------------------------------------------------------HANDLER FUNCTIONS
  function submitHandler(book) {
    setBooksInLibrary((prevBooksInLibrary) => {
      if (prevBooksInLibrary[book.ISBN]) {
        prevBooksInLibrary[book.ISBN].name = book.name;
        prevBooksInLibrary[book.ISBN].price = book.price;
        prevBooksInLibrary[book.ISBN].ISBN = book.ISBN;
        prevBooksInLibrary[book.ISBN].count++;
      } else {
        prevBooksInLibrary[book.ISBN] = {
          name: book.name,
          price: book.price,
          ISBN: book.ISBN,
          count: 1,
        };
      }

      return prevBooksInLibrary;
    });
    setFormOn(false);
  }

  function cancelHandler() {
    setFormOn(false);
  }

  function borrowHandler(book) {
    if (booksInLibrary[book.ISBN].count < 1) {
      alert("This book is unavailable right now");
      return;
    }

    setBooksInLibrary((prevState) => {
      const newState = { ...prevState };
      newState[book.ISBN].count--;
      return newState;
    });

    setUserBooks((prevState) => {
      const newState = { ...prevState };

      if (newState[book.ISBN]) {
        newState[book.ISBN].count++;
        newState[book.ISBN].borrowDate.push(new Date());
      } else {
        newState[book.ISBN] = { ...book };
        newState[book.ISBN].count = 1;
        newState[book.ISBN].borrowDate = [new Date()];
      }
      return newState;
    });
  }

  function returnHandler(book) {
    setBooksInLibrary((prevState) => {
      const newState = { ...prevState };
      newState[book.ISBN].count++;
      return newState;
    });

    setUserBooks((prevState) => {
      const newState = { ...prevState };

      const todayDate = new Date();

      let daysBorrowed =
        parseInt((todayDate - newState[book.ISBN].borrowDate[0]) / (1000 * 60 * 60 * 24));

      if (daysBorrowed < 15) {
        alert(`You have to pay ${newState[book.ISBN].price}€`);
      } else {
        alert(
          `You surpassed the standard borrow period of two weeks by ${
            daysBorrowed - 14
          } days, you have to pay ${
            Number(newState[book.ISBN].price) +
            0.01 * (daysBorrowed - 14) * Number(newState[book.ISBN].price)
          }€`
        );
      }

      if (newState[book.ISBN].count === 1) {
        delete newState[book.ISBN];
      } else {
        newState[book.ISBN].count--;
        newState[book.ISBN].borrowDate.shift();
      }

      return newState;
    });
  }

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <button
          id="add-book__btn"
          onClick={() => {
            setFormOn(true);
          }}
        >
          Add Book
        </button>
        <button
          id="library__btn"
          onClick={() => {
            setOnDisplay("Library");
          }}
        >
          Library
        </button>
        <button
          id="user-books__btn"
          onClick={() => {
            setOnDisplay("User");
          }}
        >
          User books
        </button>
      </nav>

      {formOn ? (
        <AddBookForm
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        />
      ) : (
        <></>
      )}
      {onDisplay === "Library" ? (
        <Library books={booksInLibrary} borrowHandler={borrowHandler} />
      ) : (
        <UserBooks books={userBooks} returnHandler={returnHandler} />
      )}
    </div>
  );
}

export default App;

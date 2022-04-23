import { useState } from "react";

import styles from "./AddBookForm.module.css";

function AddBookForm(params) {
  const [name, setName] = useState("");
  const [ISBN, setISBN] = useState("");
  const [price, setPrice] = useState("");

  function submitLogic(event) {
    event.preventDefault();

    const book = {};

    book.name = name.trim();
    book.ISBN = ISBN.trim();
    book.price = price.trim();

    if (!ISBN.match(/\d+(-\d+){4}/g) || ISBN.length !== 17) {
      alert(
        "ISBN invalid!\nISBN must have 13 numbers, separated in 5 sets of numbers each one separated by -"
      );
      return;
    }

    params.submitHandler(book);

    setName("");
    setISBN("");
    setPrice("");
  }

  return (
    <>
    <div className={styles.backdrop} onClick={params.cancelHandler}/>
    <form onSubmit={submitLogic} className={styles.form}>
      <h2>Add a new book</h2>
      <div>
        <label>Name</label>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
          required
        />
      </div>
      <div>
        <label>ISBN</label>
        <input
          onChange={(event) => {
            setISBN(event.target.value);
          }}
          value={ISBN}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}
          required
        />
      </div>
      <div className={styles.buttons_container}>
        <button type="button" onClick={params.cancelHandler}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
    </>
  );
}

export default AddBookForm;

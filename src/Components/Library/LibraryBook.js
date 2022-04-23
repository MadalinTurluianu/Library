import styles from "./LibraryBook.module.css";

function LibraryBook(params) {
  function borrowHandler() {
    params.borrowHandler(params.book);
  }

  return (
    <div className={styles.book}>
      <p><span>Title:</span> {params.book.name}</p>
      <p><span>ISBN:</span> {params.book.ISBN}</p>
      <p><span>Price:</span> {params.book.price}</p>
      <p className={styles.count}>{params.book.count}</p>
      <button onClick={borrowHandler}>Borrow Now</button>
    </div>
  );
}

export default LibraryBook;

import styles from "./UserBook.module.css";

function LibraryBook(params) {
  function returnHandler() {
    params.returnHandler(params.book);
  }

  const borrowDay = params.book.borrowDate[0].toLocaleString("en-US", { day: "2-digit" });
  const borrowMonth = params.book.borrowDate[0].toLocaleString("en-US", { month: "long" });
  const borrowYear = params.book.borrowDate[0].getFullYear();

  return (
    <div className={styles.book}>
      <p><span>Title:</span> {params.book.name}</p>
      <p><span>ISBN:</span> {params.book.ISBN}</p>
      <p><span>Price:</span> {params.book.price}€</p>
      <p><span>Borrow date:</span> {`${borrowDay} ${borrowMonth} ${borrowYear}`}</p>
      <p className={styles.count}>{params.book.count}</p>
      <button onClick={returnHandler}>Return Book</button>
    </div>
  );
}

export default LibraryBook;

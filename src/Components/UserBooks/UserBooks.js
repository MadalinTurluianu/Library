import styles from "./UserBooks.module.css";

import UserBook from "./UserBook";

function UserBooks(params) {
  const ISBNs = Object.keys(params.books);

  function returnHandler(book) {
    params.returnHandler(book);
  }

  return (
    <main className={styles.main}>
      <h1>User Books</h1>
      {ISBNs.map((ISBN) => (
        <UserBook
          key={ISBN}
          book={params.books[ISBN]}
          returnHandler={returnHandler}
        />
      ))}
    </main>
  );
}

export default UserBooks;

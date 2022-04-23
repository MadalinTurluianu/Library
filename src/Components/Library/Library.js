import styles from "./Library.module.css";

import LibraryBook from "./LibraryBook";

function Library(params) {
  const ISBNs = Object.keys(params.books);

  function borrowHandler(book) {
    params.borrowHandler(book);
  }

  return (
    <main className={styles.main}>
      <h1>Library</h1>
      {ISBNs.map((ISBN) => (
        <LibraryBook
          key={ISBN}
          book={params.books[ISBN]}
          borrowHandler={borrowHandler}
        />
      ))}
    </main>
  );
}

export default Library;

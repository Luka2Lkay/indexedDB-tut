const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;
const openRequest = window.indexedDB.open("notes_db", 1);

openRequest.addEventListener("error", () =>
    console.error("Database failed to open"),
  );

  openRequest.addEventListener("success", () => {
    console.log("Database opened successfully");
  
    db = openRequest.result;

    displayData();
  });

  openRequest.addEventListener("upgradeneeded", (e) => {
 
    db = e.target.result;
  
    const objectStore = db.createObjectStore("notes_os", {
      keyPath: "id",
      autoIncrement: true,
    });
  
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("body", "body", { unique: false });
  
    console.log("Database setup complete");
  });
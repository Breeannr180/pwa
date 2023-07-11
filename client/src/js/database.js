import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {console.log('putDb implemented');
  const jatedb = await openDB('jate', 1);//creates connection to database and proper version
  const tx = jatedb.transaction('jate', 'readwrite');//creates transaction
  const store = tx.objectStore('jate');//opens object store
  await store.put({id:1,value:content});//adds content to object store
  await tx.done;//closes transaction
  console.log('Data added to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.log('getDb implemented');
  const jatedb = await openDB('jate', 1);//creates connection to database and proper version
  const tx = jatedb.transaction('jate', 'readonly');//creates transaction
  const store = tx.objectStore('jate');//opens object store
  const content = await store.getAll();//gets all content from object store
  await tx.done;//closes transaction
  return content.value;//returns content
};
initdb();

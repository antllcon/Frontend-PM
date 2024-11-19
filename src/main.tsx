import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {getEditor, setEditorChangeHandler} from "./storage/editor.ts";
import {IndexedDB} from "./db/indexedDB.ts";

const db = new IndexedDB("PMDatabase", 3);
const root = createRoot(document.getElementById('root')!);

function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()}/>
        </StrictMode>
    );
}

db.init([{name: "editor", keyPath: "id"}])
    .then(() => {
        console.log("База данных готова");
        setEditorChangeHandler(render);
        render();
    })

    .catch((error) => {
        console.log("Ошибка: инициализация базы данных: ", error);
    });

export default db;
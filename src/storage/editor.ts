import {EditorType} from "./types.ts";
import {BASE_PRESENTATION} from "../commons/prsentation.ts";
import {BASE_SLIDE} from "../commons/slide.ts";

let editor: EditorType = (() => {
    const saved = localStorage.getItem("editor");
    return saved ? JSON.parse(saved) : {
        presentation: BASE_PRESENTATION,
        selection: {
            selectedSlidesId: [BASE_SLIDE.id],
            selectedObjectsId: []
        }
    };
})();

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let editorChangeHandler: Function | undefined;

function getEditor() {
    return editor;
}

function setEditor(newEditor: EditorType) {
    editor = newEditor;
    localStorage.setItem("editor", JSON.stringify(editor)); // Сохраняем в localStorage
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function setEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function dispatch(modFunction: Function, args: object) {
    const newEditor = modFunction(editor, args);
    setEditor(newEditor);
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

export {
    getEditor,
    setEditor,
    setEditorChangeHandler,
    dispatch
}


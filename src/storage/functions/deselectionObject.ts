import {EditorType} from "../types.ts";

function deselectionObject(editor: EditorType): EditorType {

    const updatedSelection = {
        ...editor.selection,
        selectedObjectsId: []
    };

    return {
        ...editor,
        selection: updatedSelection
    };
}

export {deselectionObject}
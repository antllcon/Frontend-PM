import {EditorType} from "../types.ts";

function selectObject(editor: EditorType, {id}: {id: string}): EditorType {

    const selectedObjectId = editor.selection.selectedObjectsId[0];

    if (selectedObjectId == id) {

        const updatedSelection = {
            ...editor.selection,
            selectedObjectsId: []
        };

        return {
            ...editor,
            selection: updatedSelection
        };

    } else {

        const updatedSelection = {
            ...editor.selection,
            selectedObjectsId: [id]
        };

        return {
            ...editor,
            selection: updatedSelection
        };

    }
}

export {selectObject}
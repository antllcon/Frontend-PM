import {EditorType} from "../types.ts";

function renamePresentation(editor: EditorType, {newName}: {newName: string}): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newName,
        }
    };
}

export {renamePresentation};
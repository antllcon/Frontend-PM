import {EditorType} from "../types.ts";

function selectSlide(editor: EditorType, {slideId}: {slideId: string}): EditorType {

    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlidesId: [slideId],
            selectedObjectsId: []
        }
    }
}

export {selectSlide};
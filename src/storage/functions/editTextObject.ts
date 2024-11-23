import {EditorType} from "../types.ts";

function editTextObject(editor: EditorType, {newText, id}: {newText: string; id: string}): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => ({
                ...slide,
                objects: slide.objects.map(obj =>
                    obj.id === id && obj.type === 'text'
                        ? {...obj, value: newText}
                        : obj
                ),
            })),
        },
    };
}

export {editTextObject};

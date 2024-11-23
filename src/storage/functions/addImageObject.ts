import {EditorType} from "../types.ts";
import {uuidv4} from "./uuidv4.ts";
import {BASE_IMAGE_OBJECT} from "../../commons/imageObject.ts";

function addImageObject(editor: EditorType, { src }: {src: string}): EditorType {

    if (editor.presentation.slides.length === 0) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlidesId[0];
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);

    const newImageObject = {
        ...BASE_IMAGE_OBJECT,
        id: uuidv4(),
        src: src
    }

    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === slideIndex) {
            return {
                ...slide,
                objects: [...slide.objects, newImageObject]
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        },
        selection: {
            ...editor.selection,
            selectedObjectsId: [newImageObject.id]
        }
    };
}

export {addImageObject}

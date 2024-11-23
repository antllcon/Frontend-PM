import {EditorType} from "../types.ts";
import {BASE_FIGURE_OBJECT} from "../../commons/figureObject.ts";
import {uuidv4} from "./uuidv4.ts";

function addFigureObject(editor: EditorType): EditorType {

    if (editor.presentation.slides.length === 0) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlidesId[0];
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);

    const newImageObject = {
        ...BASE_FIGURE_OBJECT,
        id: uuidv4(),
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

export {addFigureObject}
import {EditorType, SlideType} from "../types.ts";
import {BASE_SLIDE} from "../../commons/slide.ts";
import {deepClone} from "./deepCopy.ts";
import {uuidv4} from "./uuidv4.ts";

function addSlide(editor: EditorType): EditorType {
    const newSlide: SlideType = deepClone(BASE_SLIDE);
    newSlide.id = uuidv4();
    newSlide.objects.forEach(object => {
        object.id = uuidv4();
    });

    const slides = editor.presentation.slides;

    const selectionSlides =editor.selection.selectedSlidesId;

    const selectedSlideIndex = selectionSlides.length > 0
        ? slides.findIndex(slide => slide.id === selectionSlides[selectionSlides.length - 1])
        : slides.length - 1;

    const slidesBefore = slides.slice(0, selectedSlideIndex + 1);
    const slidesAfter = slides.slice(selectedSlideIndex + 1);
    const newSlides = [...slidesBefore, newSlide, ...slidesAfter];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: {
            ...editor.selection,
            selectedObjectsId: [],
            selectedSlidesId: [newSlide.id],
        }
    };
}

export {addSlide}
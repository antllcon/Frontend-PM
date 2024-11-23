import {EditorType} from "../types.ts";

function removeSlides(editor: EditorType): EditorType {


    if (editor.presentation.slides.length === 0) {
        return editor;
    }

    const selectionSlides = editor.selection.selectedSlidesId;

    // Удаляем выбранные слайды
    const newSlides = editor.presentation.slides.filter(slide => selectionSlides.indexOf(slide.id) === -1);

    // Находим индекс последнего выбранного слайда
    const lastSelectedSlideId = selectionSlides[selectionSlides.length - 1];
    const lastSelectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === lastSelectedSlideId);

    // Определяем следующий слайд для выбора
    let newSelectedSlideId = '';
    if (newSlides.length > 0) {
        if (lastSelectedSlideIndex >= newSlides.length) {
            newSelectedSlideId = newSlides[newSlides.length - 1].id;
        } else {
            newSelectedSlideId = newSlides[lastSelectedSlideIndex]?.id || newSlides[0].id;
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            selectedSlidesId: newSelectedSlideId ? [newSelectedSlideId] : [],
            selectedObjectsId: []
        }
    };
}

export {removeSlides};

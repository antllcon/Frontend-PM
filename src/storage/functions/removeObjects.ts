import {EditorType} from "../types.ts";

function removeObjects(editor: EditorType): EditorType {

    // Проверяем, есть ли слайды
    if (editor.presentation.slides.length === 0) {
        return editor;
    }

    // Определяем активный слайд
    const selectedSlideId = editor.selection.selectedSlidesId[0];
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);

    if (slideIndex === -1) {
        return editor;
    }

    const selectedObjectsId: string[] = editor.selection.selectedObjectsId;

    const newSlideObjects = [...editor.presentation.slides[slideIndex].objects];

    for (let i = 0; i < newSlideObjects.length; i++) {
        for (let j = 0; j < selectedObjectsId.length; j++) {
            if (newSlideObjects[i].id === selectedObjectsId[j]) {
                newSlideObjects.splice(i, 1);
                i--;
                break;
            }
        }
    }

    // Создаем новое состояние редактора с обновленным слайдом и пустым selectedObjectsId
    const updatedSlides = editor.presentation.slides.map((slide, index) =>
        index === slideIndex ? { ...slide, objects: newSlideObjects } : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        },
        selection: {
            ...editor.selection,
            selectedObjectsId: []
        },
    };
}

export { removeObjects };

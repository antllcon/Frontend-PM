import {EditorType, PresentationType, SelectionType, SlideObjectType, SlideType} from './src/storage/types';
import {deepClone} from "./src/storage/functions/deepCopy";
import {BASE_SLIDE} from "./src/commons/slide";
import {uuidv4} from "./src/storage/functions/uuidv4";

// Переименование презентации
function renamePresentation(editor: EditorType, newName: string): EditorType {
    const newPresentation: PresentationType = {
        ...editor.presentation,
        title: newName
    };

    return {
        ...editor,
        presentation: newPresentation
    };
}

// Добавление слайда
function addSlide(editor: EditorType): EditorType {
    const newSlide: SlideType = deepClone(BASE_SLIDE);
    newSlide.id = uuidv4();
    newSlide.objects.forEach(object => {
        object.id = uuidv4();
    });

    const slides = editor.presentation.slides;

    const selectionSlides = editor.selection.selectedSlidesId;

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

// Удаление слайдов
function removeSlides(editor: EditorType): EditorType {
    const selectionSlides = editor.selection.selectedSlidesId;

    const newSlides = editor.presentation.slides.filter(slide => selectionSlides.indexOf(slide.id) === -1);

    const lastSelectedSlideId = selectionSlides[selectionSlides.length - 1];
    const lastSelectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === lastSelectedSlideId);

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

// Перемещение слайдов
function moveSlides(editor: EditorType, direction: 'up' | 'down'): EditorType {
    const selectionSlides = editor.selection.selectedSlidesId;

    if (selectionSlides.length === 0) {
        return editor;
    }

    const slides = editor.presentation.slides;
    const newSlides = [...slides];

    selectionSlides.forEach(slideId => {
        const currentIndex = newSlides.findIndex(slide => slide.id === slideId);

        if (currentIndex === -1) {
            return;
        }

        if (direction === 'up' && currentIndex > 0) {
            const slideToMove = newSlides[currentIndex];
            newSlides.splice(currentIndex, 1);
            newSlides.splice(currentIndex - 1, 0, slideToMove);
        } else if (direction === 'down' && currentIndex < newSlides.length - 1) {
            // Перемещаем слайд вниз
            const slideToMove = newSlides[currentIndex];
            newSlides.splice(currentIndex, 1);
            newSlides.splice(currentIndex + 1, 0, slideToMove);
        }
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            selectedSlidesId: selectionSlides,
            selectedObjectsId: []
        }
    };
}

// Добавление объекта на слайд
function addObject(editor: EditorType, newObject: SlideObjectType): EditorType {
    const selectionSlides = editor.selection.selectedSlidesId;

    if (selectionSlides.length === 0) {
        return editor;
    }

    const newSlides = [...editor.presentation.slides];

    const lastSelectedSlideId = selectionSlides[selectionSlides.length - 1];
    const slideIndex = newSlides.findIndex(slide => slide.id === lastSelectedSlideId);

    if (slideIndex !== -1) {
        const slide = newSlides[slideIndex];

        const updatedObjects = [...slide.objects, { ...newObject, id: uuidv4() }];

        newSlides[slideIndex] = {
            ...slide,
            objects: updatedObjects
        };

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides,
            },
            selection: {
                selectedSlidesId: [lastSelectedSlideId],
                selectedObjectsId: [updatedObjects[updatedObjects.length - 1].id],
            }
        };
    }

    return editor;
}

// Удаление объектов со слайда
function removeObjects(editor: EditorType): EditorType {
    const selectionSlides = editor.selection.selectedSlidesId;
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionSlides.length === 0 || selectionObjects.length === 0) {
        return editor;
    }

    const newSlides = editor.presentation.slides.map(slide => {
        if (selectionSlides.includes(slide.id)) {
            const updatedObjects = slide.objects.filter(object => !selectionObjects.includes(object.id));
            return {
                ...slide,
                objects: updatedObjects
            };
        }
        return slide;
    });

    const remainingSlides = newSlides.filter(slide => slide.objects.length > 0);
    const newSelectedSlidesId = remainingSlides.length > 0 ? [remainingSlides[remainingSlides.length - 1].id] : [];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlidesId: newSelectedSlidesId,
            selectedObjectsId: []
        }
    };
}

// Перемещение объектов на слайде
function moveObjects(slide: SlideType, selection: SelectionType, x: number, y: number): { newSlide: SlideType } {
    const newObjects = slide.objects.map(object => {
        if (selection.selectedObjectsId.includes(object.id)) {
            return {
                ...object,
                position: {
                    x: object.position.x + x,
                    y: object.position.y + y
                }
            };
        }
        return object;
    });
    const newSlide: SlideType = {
        ...slide,
        objects: newObjects
    };
    return {newSlide};
}

// Изменение размера объекта
function resizeObject(editor: EditorType, newSize: { width: number; height: number }): EditorType {
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionObjects.length !== 1) {
        return editor;
    }

    const objectId = selectionObjects[0];

    const newSlides = editor.presentation.slides.map(slide => {
        const updatedObjects = slide.objects.map(object => {
            if (object.id === objectId) {
                return {
                    ...object,
                    size: {
                        width: newSize.width,
                        height: newSize.height,
                    }
                };
            }
            return object;
        });

        return {
            ...slide,
            objects: updatedObjects
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: editor.selection
    };
}

// Изменение текста текстового объекта
function moveObject(editor: EditorType, newPosition: { x: number; y: number }): EditorType {
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionObjects.length !== 1) {
        return editor;
    }

    const objectId = selectionObjects[0];

    const newSlides = editor.presentation.slides.map(slide => {
        const updatedObjects = slide.objects.map(object => {
            if (object.id === objectId) {
                return {
                    ...object,
                    position: {
                        x: newPosition.x,
                        y: newPosition.y,
                    }
                };
            }
            return object;
        });

        return {
            ...slide,
            objects: updatedObjects
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: editor.selection
    };
}

// Изменение текста
function changeValueText(editor: EditorType, newText: string): EditorType {
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionObjects.length !== 1) {
        return editor;
    }

    const objectId = selectionObjects[0];

    const newSlides = editor.presentation.slides.map(slide => {
        const updatedObjects = slide.objects.map(object => {
            if (object.id === objectId && object.type === 'text') {
                return {
                    ...object,
                    value: newText,
                };
            }
            return object;
        });

        return {
            ...slide,
            objects: updatedObjects
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: editor.selection
    };
}

// Изменение размера текста
function changeTextSize(editor: EditorType, newFontSize: number): EditorType {
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionObjects.length !== 1) {
        return editor;
    }

    const objectId = selectionObjects[0];

    const newSlides = editor.presentation.slides.map(slide => {
        const updatedObjects = slide.objects.map(object => {
            if (object.id === objectId && object.type === 'text') {
                return {
                    ...object,
                    fontSize: newFontSize
                };
            }
            return object;
        });

        return {
            ...slide,
            objects: updatedObjects
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: editor.selection
    };
}

// Изменение семейства шрифтов у текстового объекта
function changeTextFont(editor: EditorType, newFontFamily: 'Arial' | 'Inter' | 'TimesNewRoman'): EditorType {
    const selectionObjects = editor.selection.selectedObjectsId;

    if (selectionObjects.length !== 1) {
        return editor;
    }

    const objectId = selectionObjects[0];

    const newSlides = editor.presentation.slides.map(slide => {
        const updatedObjects = slide.objects.map(object => {
            if (object.id === objectId && object.type === 'text') {
                return {
                    ...object,
                    fontFamily: newFontFamily
                };
            }
            return object;
        });

        return {
            ...slide,
            objects: updatedObjects
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: editor.selection
    };
}

export {
    renamePresentation,
    addSlide,
    removeSlides,
    moveSlides,
    addObject,
    removeObjects,
    moveObjects,
    resizeObject,
    moveObject,
    changeValueText,
    changeTextSize,
    changeTextFont
};

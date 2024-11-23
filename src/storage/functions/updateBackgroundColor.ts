import {BackgroundSolidType, EditorType, SlideType} from "../types.ts";

function updateBackgroundColor(editor: EditorType, {slideId, color}: { slideId: string; color: string }): EditorType {

    const updatedSlides = editor.presentation.slides.map((slide: SlideType) => {
        if (slide.id === slideId) {
            if (slide.background.type === 'solid') {
                return {
                    ...slide,
                    background: {...slide.background, color}
                };
            }

            if (slide.background.type === 'image' || slide.background.type === 'gradient') {
                const newSolidBackground: BackgroundSolidType = {
                    type: 'solid',
                    color: color
                };

                return {
                    ...slide,
                    background: newSolidBackground
                };
            }
            return slide;
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

export {updateBackgroundColor};

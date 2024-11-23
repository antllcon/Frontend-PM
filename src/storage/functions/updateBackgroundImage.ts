import {BackgroundImageType, EditorType, SlideType} from "../types.ts";

function updateBackgroundImage(editor: EditorType, { slideId, src }: { slideId: string; src: string }): EditorType {
    const updatedSlides = editor.presentation.slides.map((slide: SlideType) => {
        if (slide.id === slideId) {
            if (slide.background.type === "image") {
                return {
                    ...slide,
                    background: { ...slide.background, src },
                };
            }

            if (slide.background.type === "solid" || slide.background.type === "gradient") {
                const newSolidBackground: BackgroundImageType = {
                    type: "image",
                    src: src,
                };

                return {
                    ...slide,
                    background: newSolidBackground,
                };
            }
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

export {updateBackgroundImage};

import styles from './MainPanel.module.css';
import Slide from "../../components/Slide/Slide.tsx";
import {SelectionType, SlideType} from "../../storage/types.ts";
import {dispatch} from "../../storage/editor.ts";
import {renamePresentation} from "../../storage/functions/renamePresentation.ts";
import React, {ChangeEventHandler} from "react";
import SmallButton from "../../components/SmallButton/SmallButton.tsx";
import {addTextObject} from "../../storage/functions/addTextObject.ts";
import {removeObjects} from "../../storage/functions/removeObjects.ts";
import {addImageObject} from "../../storage/functions/addImageObject.ts";

import {useRef} from "react";
import {addFigureObject} from "../../storage/functions/addFigureObject.ts";
import {updateBackgroundColor} from "../../storage/functions/updateBackgroundColor.ts";
import {updateBackgroundImage} from "../../storage/functions/updateBackgroundImage.ts";

type MainPanelProps = {
    slide?: SlideType;
    title: string;
    selection: SelectionType;
};

function MainPanel({slide, title, selection}: MainPanelProps): JSX.Element {

    // Константы
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Функции обработки событий
    const onTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch(renamePresentation, {newName: event.target.value});
    };

    // Добавление текста
    const onAddText = () => {
        dispatch(addTextObject, {})
    };

    // Добавление картинки
    const onAddImage = (src: string) => {
        dispatch(addImageObject, {src})
    };

    // Добавление фигуры
    const onAddCircle = () => {
        dispatch(addFigureObject, {})
    };

    // Изменение фона
    const onChangeBackgroundColor = ({newColor}: { newColor: string }) => {
        if (slide?.id) {
            dispatch(updateBackgroundColor, { slideId: slide.id, color: newColor });
        } else {
            console.error("Не найден slideId");
        }
    };

    // Изменение фона на картинку
    const onChangeBackgroundImage = (newSrc: string) => {
        if (slide?.id) {
            dispatch(updateBackgroundImage, { slideId: slide.id, src: newSrc });
        } else {
            console.error("Не найден slideId");
        }
    };

    // Удаление со слайда
    const onRemove = () => {
        dispatch(removeObjects, {})
    };

    // Функции работы с button и input
    const handleButtonClick = (index: number) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index]?.click();
        }
    };

    // Обработчик для изменения фона
    const handleChangeBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        onChangeBackgroundColor({newColor});
    };

    // Функция получения и отправки изображения с изменением в Base64
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageSrc = e.target?.result as string;
                onAddImage(imageSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    // Функция получения и отправки изображения с изменением в Base64
    const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageSrc = e.target?.result as string;
                onChangeBackgroundImage(imageSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.mainPanel}>
            {/*Заголовок*/}
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>

            {/*Отображение текущего слайда*/}
            {slide
                ? (<Slide slide={slide} index={-1} showIndex={false} selection={selection}/>)
                : (<div className={styles.text}>Choose slide</div>)}

            {/*Панель инструментов*/}
            <div className={styles.toolbar}>

                {/*Скрытые input*/}
                <div className={styles.input}>
                    <input
                        type="file"
                        accept="image/*"
                        ref={(el) => inputRefs.current[0] = el}
                        onChange={handleImageUpload}
                    />

                    {/* Color Picker */}
                    <input
                        type="color"
                        ref={(el) => inputRefs.current[1] = el}
                        onChange={handleChangeBackgroundColor}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={(el) => inputRefs.current[2] = el}
                        onChange={handleBackgroundUpload}
                    />
                </div>

                {/*Добавление элементов на слайд*/}
                <div className={styles.buttonPanel}>
                    <SmallButton icon={"/../src/assets/icons/addText.svg"} onClick={onAddText}/>
                    <SmallButton icon={"/../src/assets/icons/addImage.svg"} onClick={() => handleButtonClick(0)}/>
                    <SmallButton icon={"/../src/assets/icons/addFigure.svg"} onClick={onAddCircle}/>
                </div>

                {/*Редактирование фона слайда*/}
                <div className={styles.buttonPanel}>
                    <SmallButton icon={"/../src/assets/icons/colorEdit.svg"} onClick={() => handleButtonClick(1)}/>
                    <SmallButton icon={"/../src/assets/icons/addImage.svg"} onClick={() => handleButtonClick(2)}/>
                </div>

                {/*Отмена и возврат действий, удаление */}
                <div className={styles.buttonPanel}>
                    <SmallButton icon={"/../src/assets/icons/arrowLeft.svg"}/>
                    <SmallButton icon={"/../src/assets/icons/arrowRight.svg"}/>
                    <SmallButton icon={"/../src/assets/icons/recycle.svg"} onClick={onRemove}/>
                </div>

            </div>
        </div>
    );
}

export default MainPanel;
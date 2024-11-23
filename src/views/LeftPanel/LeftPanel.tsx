import styles from './LeftPanel.module.css';

import Button from '../../components/Button/Button.tsx';
import Slide from "../../components/Slide/Slide.tsx";

import {dispatch} from "../../storage/editor.ts";
import {addSlide} from "../../storage/functions/addSlide.ts";
import {removeSlides} from "../../storage/functions/removeSlides.ts";
import {selectSlide} from "../../storage/functions/selectSlide.ts"

import {SlideType, SelectionType} from "../../storage/types.ts";


type LeftPanelProps = {
    slides: SlideType[];
    selection: SelectionType;
}

function LeftPanel({slides, selection}: LeftPanelProps): JSX.Element {
    const onAddSlide = () => {
        dispatch(addSlide, {})
    }

    const onRemoveSlide = () => {
        dispatch(removeSlides, {})
    }

    const handleClick = (slideId: string) => {
        dispatch(selectSlide, {slideId})
    }

    return (
        <div className={styles.LeftPanel}>

            {/* список кнопок */}
            <ul className={styles.ListButtons}>
                <li>
                    <Button icon={'/../src/assets/icons/addSlide.svg'} text={'Create slide'}
                            onClick={onAddSlide}></Button>
                </li>
                <li>
                    <Button icon={'/../src/assets/icons/deleteSlide.svg'} text={'Delete slide'}
                            onClick={onRemoveSlide}></Button>
                </li>
            </ul>

            {/*Список слайдов*/}
            <div className={styles.SlidesContainer}>
                {slides.length === 0 && <div className={styles.text}>Create the first slide</div>}
                {slides.map((slide, index) => (
                    <Slide
                        key={slide.id}
                        index={index}
                        showIndex={true}
                        slide={slide}
                        selection={selection}
                        onClick={() => handleClick(slide.id)}
                    />
                ))}
            </div>

        </div>
    );
}


export default LeftPanel;
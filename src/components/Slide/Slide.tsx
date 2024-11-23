import styles from './Slide.module.css';

import TextObject from '../TextObject/TextObject.tsx';
import ImageObject from '../ImageObject/ImageObject.tsx';
import FigureObject from "../FigureObject/FigureObject.tsx";

import {SlideType, SelectionType, BackgroundGradientType} from '../../storage/types.ts';
import {dispatch} from "../../storage/editor.ts";
import {deselectionObject} from "../../storage/functions/deselectionObject.ts";

type SlideProps = {
    slide: SlideType;
    index: number;
    showIndex: boolean;
    selection: SelectionType;
    onClick?: () => void;
};

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;
const DEFAULT_COLOR = 'white';


function Slide({slide, index, showIndex, selection, onClick}: SlideProps): JSX.Element {

    // Нажатие
    const handleClick = () => {
        dispatch(deselectionObject, {})
    }

    const renderBackground = () => {
        switch (slide.background.type) {
            case 'solid':
                return <rect onClick={() => handleClick()} width={SLIDE_WIDTH} height={SLIDE_HEIGHT} fill={slide.background.color}/>;
            case 'gradient': {
                const gradientBackground = slide.background as BackgroundGradientType;
                const colors = gradientBackground.colors.length > 0
                    ? gradientBackground.colors
                    : [{offset: "0%", color: "white"}, {offset: "100%", color: "black"}];

                return (
                    <g onClick={() => handleClick()}>
                        <defs>
                            <linearGradient
                                id={`gradient-${slide.id}`}
                                x1={gradientBackground.x1 || "0%"}
                                y1={gradientBackground.y1 || "0%"}
                                x2={gradientBackground.x2 || "100%"}
                                y2={gradientBackground.y2 || "100%"}
                            >
                                {colors.map((colorStop, idx) => (
                                    <stop
                                        key={idx}
                                        offset={colorStop.offset}
                                        stopColor={colorStop.color}
                                        stopOpacity={colorStop.stopOpacity ?? 1}
                                    />
                                ))}
                            </linearGradient>
                        </defs>
                        <rect width={SLIDE_WIDTH} height={SLIDE_HEIGHT} fill={`url(#gradient-${slide.id})`}
                        />
                    </g>
                )
            }
            case 'image':
                return (<image
                        onClick={() => handleClick()}
                        href={slide.background.src}
                        width={SLIDE_WIDTH}
                        height={SLIDE_HEIGHT}
                        preserveAspectRatio="xMidYMid slice"
                    />
                );
            default:
                return <rect width={SLIDE_WIDTH} height={SLIDE_HEIGHT} fill={DEFAULT_COLOR}/>;
        }
    };

    const isSelected = selection.selectedSlidesId.includes(slide.id)

    return (
        <>

            {/*Обертка для слайда (индекс в массиве) - div*/}
            <div
                className={styles.Slide}
                onClick={onClick}
                style={{
                    border: isSelected && showIndex
                        ? "2px solid #4A75FF"
                        : "1.5px solid #e3e3e3",
                    borderRadius: isSelected && showIndex
                        ? "10px"
                        : "10px"
                }}
            >

                {/* Слайд как svg элемент со своим масштабированием внутри через viewBox */}
                <svg viewBox={`0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`}>
                    {renderBackground()}
                    {slide.objects?.map((object) => {
                        const isSelectedObject = selection.selectedObjectsId.includes(object.id);

                        switch (object.type) {
                            case 'text':
                                return <TextObject
                                    key={object.id}
                                    object={object}
                                    isSelectedObject={isSelectedObject}
                                />;
                            case 'image':
                                return <ImageObject
                                    key={object.id}
                                    object={object}
                                    isSelectedObject={isSelectedObject}
                                />;
                            case "figure":
                                return <FigureObject
                                    key={object.id}
                                    object={object}
                                    isSelectedObject={isSelectedObject}
                                />
                            default:
                                return null;
                        }
                    })}
                </svg>

                {showIndex && <div className={styles.Number}>{index + 1}</div>}
            </div>
        </>
    );
}

export default Slide;
import {FigureObjectType} from "../../storage/types.ts";
import {dispatch} from "../../storage/editor.ts";
import {selectObject} from "../../storage/functions/selectObject.ts";

type FigureObjectProps = {
    object: FigureObjectType;
    isSelectedObject: boolean;
}

function FigureObject({object, isSelectedObject}: FigureObjectProps): JSX.Element {

    // Функция обработки событий
    const handleClick = (id: string) => {
        dispatch(selectObject, {id});
    }

    // Функция создания фигуры от ее типа
    const renderShape = () => {
        switch (object.shape.type) {
            case 'rectangle':
                return (
                    <rect
                        x={object.position.x}
                        y={object.position.y}
                        width={object.size.width}
                        height={object.size.height}
                        fill={object.backgroundColor}
                        stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                        strokeWidth={isSelectedObject ? 10 : object.borderWidth}
                    />
                );
            case 'circle': {
                const radius = Math.min(object.size.width, object.size.height) / 2;
                return (
                    <circle
                        cx={object.position.x + radius}
                        cy={object.position.y + radius}
                        r={radius}
                        fill={object.backgroundColor}
                        stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                        strokeWidth={isSelectedObject ? 5 : object.borderWidth}
                    />
                );
            }
            case 'triangle': {
                const points = `
                    ${object.position.x},${object.position.y + object.size.height} 
                    ${object.position.x + object.size.width / 2},${object.position.y} 
                    ${object.position.x + object.size.width},${object.position.y + object.size.height}
                `;
                return (
                    <polygon
                        points={points}
                        fill={object.backgroundColor}
                        stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                        strokeWidth={isSelectedObject ? 10 : object.borderWidth}
                    />
                );
            }
            case 'arbitraryLine': {
                const linePoints = object.shape.points.map(point => `${point.x},${point.y}`).join(" ");
                return (
                    <polyline
                        points={linePoints}
                        fill={object.shape.isClosed ? object.backgroundColor : 'none'}
                        stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                        strokeWidth={isSelectedObject ? 10 : object.borderWidth}
                    />
                );
            }
            default:
                return null;
        }
    };

    return (
        <svg onClick={() => handleClick(object.id)}>
            {renderShape()}
        </svg>
    );
}

export default FigureObject;
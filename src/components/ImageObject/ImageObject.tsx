import {ImageObjectType} from "../../storage/types.ts";
import {dispatch} from "../../storage/editor.ts";
import {selectObject} from "../../storage/functions/selectObject.ts";

type ImageObjectProps = {
    object: ImageObjectType;
    isSelectedObject: boolean;
}

function ImageObject({object, isSelectedObject}: ImageObjectProps): JSX.Element {

    const handleClick = (id: string) => {
        dispatch(selectObject, {id});
    }

    return (
        <g onClick={() => handleClick(object.id)}>
            <rect
                x={object.position.x}
                y={object.position.y}
                width={object.size.width}
                height={object.size.height}
                stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                strokeWidth={isSelectedObject ? 10 : object.borderWidth}
                fill="none"
            />
            <image
                   id={object.id}
                   x={object.position.x}
                   y={object.position.y}
                   width={object.size.width}
                   height={object.size.height}
                   href={object.src}
                   preserveAspectRatio="none"
            />
        </g>
    );
}

export default ImageObject;
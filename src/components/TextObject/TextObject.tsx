import {TextObjectType} from "../../storage/types.ts";
import {dispatch} from "../../storage/editor.ts";
import {selectObject} from "../../storage/functions/selectObject.ts";
import {ChangeEvent, useState} from "react";
import {editTextObject} from "../../storage/functions/editTextObject.ts";
// import {Simulate} from "react-dom/test-utils";
// import doubleClick = Simulate.doubleClick;
// import {ChangeEventHandler} from "react";
// import {a} from "vite/dist/node/types.d-aGj9QkWt";

type TextObjectProps = {
    object: TextObjectType;
    isSelectedObject: boolean;
    // onTextEdit: (id: string, newText: string) => void;
}

function splitTextIntoLines(text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const width = measureTextWidth(currentLine + " " + words[i], fontSize);
        if (width <= maxWidth) {
            currentLine += " " + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines;
}

function measureTextWidth(text: string, fontSize: number): number {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.font = String(fontSize);
        return ctx.measureText(text).width;
    }
    return 0;
}

function TextObject({object, isSelectedObject}: TextObjectProps): JSX.Element {
    const [isEditing, setIsEditing] = useState(false);

    // Изменение текста
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        dispatch(editTextObject, {newText, id: object.id});
    };

    const handleClick = (id: string) => {
        if (isSelectedObject) {
            setIsEditing(true);
        } else {
            dispatch(selectObject, {id});
        }
    }

    const handleBlur = () => {
        setIsEditing(false);
    };

    const textObject = object as TextObjectType;
    const lines = splitTextIntoLines(object.value.replace(/ /g, '\u00A0'), object.size.width, object.fontSize);

    return (
        <g
            onClick={() => handleClick(object.id)}
        >
            <rect
                x={textObject.position.x}
                y={textObject.position.y}
                width={textObject.size.width}
                height={textObject.size.height}
                fill={textObject.backgroundColor}
                stroke={isSelectedObject ? "#4A75FF" : object.borderColor}
                strokeWidth={isSelectedObject ? 5 : object.borderWidth}
            >
            </rect>

            {!isEditing && <text
                id={textObject.id}
                width={textObject.size.width}
                height={textObject.size.height}
                fontSize={textObject.fontSize}
                fontWeight={textObject.fontWeight}
                fill={textObject.textColor}
                fontFamily={textObject.fontFamily}
            >
                {lines.map((line, index) => (
                    <tspan
                        key={index}
                        x={textObject.position.x}
                        y={index === 0 ? textObject.position.y + textObject.fontSize : textObject.position.y + index * textObject.fontSize}
                    >
                        {line}
                    </tspan>
                ))}
            </text>}
            {isEditing && <foreignObject
                x={textObject.position.x}
                y={textObject.position.y}
                width={textObject.size.width}
                height={textObject.size.height}>

                    <textarea
                        value={object.value}
                        onChange={handleTextChange}
                        onBlur={handleBlur}
                        style={{
                            width: '100%',
                            height: '100%',
                            fontFamily: object.fontFamily,
                            fontSize: object.fontSize,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            padding: 0,
                            whiteSpace: 'pre-wrap',
                            margin: 0
                        }}
                        autoFocus
                    />
            </foreignObject>}
        </g>
    );
}

export default TextObject;
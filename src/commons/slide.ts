import {SlideType} from "../storage/types.ts";
import {uuidv4} from "../storage/functions/uuidv4.ts";

export const BASE_SLIDE: SlideType = {
    id: uuidv4(),
    objects: [
        {
            id: uuidv4(),
            type: 'text',
            position: {x: 700, y: 500},
            size: {width: 600, height: 200},
            borderWidth: 5,
            borderColor: '#444444',
            backgroundColor: 'transparent',
            value: 'Slide Title',
            fontSize: 60,
            fontWeight: 'normal',
            textAlign: 'start',
            fontFamily: 'Inter',
            textColor: '#111111',
        },
    ],
    background: {
        type: 'solid',
        color: '#ffffff'
        }
}


import {ImageObjectType} from "../storage/types.ts";
import {uuidv4} from "../storage/functions/uuidv4.ts";

export const BASE_IMAGE_OBJECT: ImageObjectType = {
    id: uuidv4(),
    position: {
        x: 1200,
        y: 700
    },
    size: {
        width: 320,
        height: 180
    },
    borderWidth: 0,
    borderColor: '#000000',
    type: 'image',
    src: ''
}
import {TextObjectType} from "../storage/types.ts";
// import {uuidv4} from "../storage/functions/uuidv4.ts";

export const BASE_TEXT_OBJECT: TextObjectType = {
    id: '',
    type: 'text',
    value: 'Enter the text',
    position: { x: 50, y: 50 },
    size: { width: 400, height: 50 },
    fontSize: 50,
    fontWeight: 'normal',
    textAlign: 'center',
    textColor: '#000000',
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    borderWidth: 0,
    borderColor: '#000000'
}

import {FigureObjectType} from "../storage/types.ts";
import {uuidv4} from "../storage/functions/uuidv4.ts";

export const BASE_FIGURE_OBJECT: FigureObjectType = {
    id: uuidv4(),
    position: { x: 450, y: 150 },
    size: { width: 100, height: 100 },
    borderWidth: 0,
    borderColor: '#000000',
    type: 'figure',
    backgroundColor: '#c2c2c2',
    shape: {type: 'circle'}
}

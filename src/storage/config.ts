import {PresentationType, SelectionType} from './types.ts'
import {uuidv4} from './functions/uuidv4.ts';

export const testPresentation: PresentationType = {
    title: 'Test PresentationType',
    slides: [
        {
            id: uuidv4(),
            background: {
                type: 'gradient',
                x1: '100%',
                x2: '0%',
                y1: '100%',
                y2: '0%',
                colors: [
                    {color: '#5500ff', offset: '0%'},
                    {color: '#f700ff', offset: '50%'},
                    {color: '#ff0059', offset: '100%'},
                ]
            },
            objects: [
                {
                    id: uuidv4(),
                    type: 'text',
                    position: {x: 920, y: 540},
                    size: {width: 50, height: 200},
                    borderWidth: 10,
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    value: 'My first PresentationType',
                    fontSize: 100,
                    fontWeight: 'bold',
                    textAlign: 'middle',
                    fontFamily: 'Inter',
                    textColor: '#c93d3d',
                },
                {
                    id: uuidv4(),
                    type: 'image',
                    position: {x: 800, y: 140},
                    size: {width: 400, height: 200},
                    borderWidth: 2,
                    borderColor: '#111111',
                    src: 'src/storage/images/bridge.jpg'
                },
                {
                    id: uuidv4(),
                    type: "figure",
                    position: {x: 0, y: 0},
                    size: {width: 0, height: 0},
                    borderColor: '#000000',
                    borderWidth: 1,
                    shape: {
                        type: 'arbitraryLine',
                        points: [
                            {x: 100, y: 100},
                            {x: 500, y: 150},
                            {x: 250, y: 200},
                            {x: 50, y: 550}
                        ],
                        isClosed: false
                    },
                    backgroundColor: "#999999",
                },
                {
                    id: uuidv4(),
                    type: 'figure',
                    position: {x: 1250, y: 140},
                    size: {width: 200, height: 200},
                    shape: {type: 'rectangle'},
                    backgroundColor: '#333333',
                    borderColor: '#3fda21',
                    borderWidth: 5,
                },
                {
                    id: uuidv4(),
                    type: 'figure',
                    position: {x: 1250, y: 540},
                    size: {width: 500, height: 200},
                    shape: {type: 'triangle'},
                    backgroundColor: '#f4ff54',
                    borderColor: '#b8c2b5',
                    borderWidth: 50,
                },
            ]
        },
        {
            id: uuidv4(),
            background: {
                type: 'gradient',
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '0%',
                colors: [
                    {color: '#800080', offset: '0%'},
                    {color: '#FF69B4', offset: '50%'},
                    {color: '#FFA500', offset: '100%'},
                ]
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'solid',
                color: '#444444'
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'gradient',
                x1: '0%',
                y1: '0%',
                x2: '100%',
                y2: '100%',
                colors: [
                    {color: '#00FF00', offset: '0%'},
                    {color: '#FFFF00', offset: '100%'},
                ]
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'image',
                src: 'src/storage/images/sahara.jpg'
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'image',
                src: 'src/storage/images/day.jpg'
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'image',
                src: 'src/storage/images/mui.png'
            },
            objects: []
        },
        {
            id: uuidv4(),
            background: {
                type: 'image',
                src: 'src/storage/images/bridge.jpg'
            },
            objects: []
        }
    ]
};

export const testSelection: SelectionType = {
    selectedSlidesId: [testPresentation.slides[0].id],
    selectedObjectsId: [],
};

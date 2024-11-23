// Презентация
type PresentationType = {
    title: string;
    slides: SlideType[];
}

// Слайд
type SlideType = {
    id: string;
    objects: SlideObjectType[];
    background: BackgroundType;
}

// Фон
type BackgroundType = BackgroundSolidType | BackgroundImageType | BackgroundGradientType;

// Заливка цветом фон
type BackgroundSolidType = {
    type: 'solid';
    color: string;
}

// Изображение фон
type BackgroundImageType = {
    type: 'image';
    src: string;
}

// Градиентный фон
type BackgroundGradientType = {
    type: 'gradient';
    x1: string; // Начальная точка по X (например, '0%' или '10%')
    y1: string; // Начальная точка по Y (например, '0%' или '10%')
    x2: string; // Конечная точка по X (например, '100%' или '50%')
    y2: string; // Конечная точка по Y (например, '100%' или '90%')
    colors: {
        color: string;   // Цвет градиентной остановки
        offset: string;  // Позиция остановки (например, '0%', '50%', '100%')
        stopOpacity?: number; // Прозрачность остановки (опционально)
    }[];
}

// Объекты на слайде
type SlideObjectType = TextObjectType | ImageObjectType | FigureObjectType;

type CommonObjectType = {
    id: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    borderWidth: number;
    borderColor: string;
}

// Текстовый объект
type TextObjectType = CommonObjectType & {
    type: 'text';
    value: string;
    fontSize: number;
    fontWeight: string;
    textAlign: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: 'Arial' | 'Inter' | 'TimesNewRoman';
}

// Объект изображения
type ImageObjectType =  CommonObjectType & {
    type: 'image';
    src: string;
}

// Объект фигуры
type FigureObjectType = CommonObjectType & {
    type: 'figure';
    backgroundColor: string;
    shape: ShapeType;
}

// Форма фигуры
type ShapeType = RectangleType | CircleType | TriangleType | ArbitraryLineType;

// Прямоугольник
type RectangleType = {
    type: 'rectangle';
}

// Круг
type CircleType = {
    type: 'circle';
}

// Треугольник
type TriangleType = {
    type: 'triangle';
}

// Произвольная линия
type ArbitraryLineType = {
    type: 'arbitraryLine';
    points: { x: number; y: number }[];
    isClosed: boolean;
}

// Выделение
type SelectionType = {
    selectedSlidesId: string[];
    selectedObjectsId: string[];
}

type EditorType = {
    presentation: PresentationType;
    selection: SelectionType;
}

export type {
    PresentationType,
    SlideType,
    SlideObjectType,
    TextObjectType,
    BackgroundSolidType,
    BackgroundGradientType,
    BackgroundImageType,
    ImageObjectType,
    FigureObjectType,
    RectangleType,
    CircleType,
    TriangleType,
    ArbitraryLineType,
    SelectionType,
    EditorType
};

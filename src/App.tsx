import LeftPanel from "./views/LeftPanel/LeftPanel.tsx";
import MainPanel from "./views/MainPanel/MainPanel.tsx";
import RightPanel from "./views/RightPanel/RightPanel.tsx";
import styles from './App.module.css';
import {EditorType} from "./storage/types.ts";

type AppProps = {
    editor: EditorType
}

function App({editor}: AppProps): JSX.Element {
    const selectedSlide = editor.presentation.slides[editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlidesId[0])];

    return (
        <div className={styles.app}>
            <LeftPanel slides={editor.presentation.slides} selection={editor.selection}></LeftPanel>
            <MainPanel slide={selectedSlide} title={editor.presentation.title} selection={editor.selection} />
            <RightPanel />
        </div>
    )
}

export default App;





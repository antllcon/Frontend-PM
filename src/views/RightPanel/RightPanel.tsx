import './RightPanel.module.css';
import styles from "../RightPanel/RightPanel.module.css";
import Button from "../../components/Button/Button.tsx";

function RightPanel() {
    return (
        <div className={styles.RightPanel}>
            <ul className={styles.ListButtons}>
                <li>
                    <Button icon={'/../src/assets/icons/folder.svg'} text={'Open'}></Button>
                </li>
                <li>
                    <Button icon={'/../src/assets/icons/home.svg'} text={'Home'}></Button>
                </li>
            </ul>
            <div className={styles.DecoratorContainer}>
            {/*    */}
            </div>
        </div>

    );
}

export default RightPanel;
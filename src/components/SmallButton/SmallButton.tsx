import styles from './SmallButton.module.css';

type ButtonProps = {
    icon: string;
    onClick?: () => void;
}

function SmallButton({icon, onClick}: ButtonProps): JSX.Element {
    return (
        <>
            <button className={styles.smallButton} onClick={onClick}>
                <img
                    src={icon}
                    alt="icon"
                />
            </button>
        </>
    )
}

export default SmallButton;
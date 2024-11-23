import styles from './Button.module.css';

type ButtonProps = {
    icon: string;
    text: string;
    onClick?: () => void;
}

function Button({text, icon, onClick}: ButtonProps): JSX.Element {
    return (
        <>
            <button className={styles.button} onClick={onClick}>
                <img
                    src={icon}
                    alt="icon"
                />
                {text}
            </button>
        </>
    )
}

export default Button;
import { ChangeEvent, MouseEventHandler } from "react";
import styles from './InputWithButton.module.scss'

export default (
    { buttonText,  value, setValue, onClick }:
    {
        buttonText: string,
        value: string,
        setValue: (event: ChangeEvent<HTMLInputElement>) => void,
        onClick: MouseEventHandler<HTMLButtonElement>
    }
) => {
    return <div className={styles.inputWithButtonWrapper}>
        <input value={value} onChange={setValue} />
        <button onClick={onClick}>{buttonText}</button>
    </div>
}

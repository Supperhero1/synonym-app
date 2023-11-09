import { ChangeEvent, MouseEventHandler } from "react";
import styles from './InputWithButton.module.scss'

export default (
    { buttonText,  value, setValue, onClick, id }:
    {
        buttonText: string,
        value: string,
        id: string
        setValue: (event: ChangeEvent<HTMLInputElement>) => void,
        onClick: MouseEventHandler<HTMLButtonElement>
    }
) => {
    return <div className={styles.inputWithButtonWrapper}>
        <input id={id} value={value} onChange={setValue} />
        <label htmlFor={id}><button onClick={onClick}>{buttonText}</button></label>
    </div>
}

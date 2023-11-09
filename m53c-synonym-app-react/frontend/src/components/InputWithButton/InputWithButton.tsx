import { ChangeEvent, MouseEventHandler } from "react";
import styles from './InputWithButton.module.scss'

export default (
    { buttonText,  value, setValue, onClick, id, placeholder }:
    {
        buttonText: string,
        value: string,
        id: string
        setValue: (event: ChangeEvent<HTMLInputElement>) => void,
        placeholder?: string,
        onClick: MouseEventHandler<HTMLButtonElement>
    }
) => {
    return <div className={styles.inputWithButtonWrapper}>
        <input id={id} value={value} onChange={setValue} placeholder={placeholder} />
        <label htmlFor={id}><button onClick={onClick}>{buttonText}</button></label>
    </div>
}

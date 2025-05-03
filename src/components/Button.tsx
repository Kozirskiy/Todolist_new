// import styled from "styled-components";

export type ButtonPropsType = {
    title?: string
    onClick?: () => void
    disabledButton?: boolean
    style?: React.CSSProperties | undefined
    className?: string
}

export const Button = ({title, onClick, disabledButton, style, className}: ButtonPropsType) => {
    return (
        <>
            <button  className={className} disabled={disabledButton} onClick={onClick} style={style}>{title}</button>
        </>
    );
};
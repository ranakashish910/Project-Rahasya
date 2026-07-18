export const CustomButton=({text,onClick,className,disabled})=>{
    return(
        <>

            <button onClick={onClick} className={`${className||""}`} disabled={disabled}>
                {text}
            </button>
        </>
    )
}
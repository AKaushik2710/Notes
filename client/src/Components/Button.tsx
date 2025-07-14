type ButtonProps ={
    cn : string,
    onClick? : ()=> void,
    type? : "button" | "submit",
    children : React.ReactNode
}

export default function Button( props : ButtonProps){
    const {cn, onClick, type, children} = props;
    return <button className={cn} type={type} onClick={onClick}>{children}</button>
}
interface DivProps {
    children: React.ReactNode,
    cn : string,
    onClick? : (e:any)=> void
}

export default function Div( props : DivProps ) {
    const { children, cn, onClick } = props;
    return (
        <div className={cn} onClick={onClick}>
            {children}
        </div>
    );
}
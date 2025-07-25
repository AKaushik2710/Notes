interface DivProps {
    children: React.ReactNode,
    cn : string,
    onClick? : (e:any)=> void
}

export default function Div( props : DivProps ) {
    const { children, cn } = props;
    return (
        <div className={cn}>
            {children}
        </div>
    );
}
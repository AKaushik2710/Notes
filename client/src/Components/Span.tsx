interface SpanProps {
    children: React.ReactNode,
    cn: string,
    id?: string,
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export default function Span(props: SpanProps){
    const { children, cn, id, onClick } = props;
    return (
        <span className={cn} id={id} onClick={onClick}>
            {children}
        </span>
    );
}
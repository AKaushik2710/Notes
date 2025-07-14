interface InputProps {
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cn : string,
    ref : React.RefObject<HTMLInputElement>,
    holder : string
}

export default function Input( props : InputProps ){
    const { cn, ref, holder } = props;
    return (
        <input
            className={cn}
            type="text"
            ref={ref}
            placeholder={holder}
        />
    );
}
interface InputProps {
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cn : string,
    ref : React.RefObject<HTMLInputElement | null>,
    holder : string,
    required? : boolean
}

export default function Input( props : InputProps ){
    const { cn, ref, holder, required } = props;
    return (
        <input
            required={required}
            className={cn}
            type="text"
            ref={ref}
            placeholder={holder}
        />
    );
}
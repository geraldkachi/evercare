import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

const Spinner = () =>
    <div className=" flex items-center justify-center px-6 py-[0px]">
        <div className="w-3 h-3 border-2 border-dashed rounded-full animate-spin border-[#ffffff]" />
    </div>

type Props = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    icon?: string;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'secondary-outline';
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    children?: ReactNode
};

const variants = {
    primary: 'bg-[#002355] text-white hover:bg-blue-2 border-none hover:bg-[#1066bb] text-xs md:text-sm py-1 px-8 hover:bg-[#2c466c]',
    secondary: 'bg-red text-white hover:bg-red-1 bg-white !border !border-[#002355] !text-[#002355] text-xs md:text-sm py-1 px-4',
    link: 'bg-none text-blue hover:bg-white-azure border-none',
    outline:
        'bg-white text-blue hover:bg-white-azure border-blue disabled:border-grey-beau',
    "secondary-outline":
        'bg-transparent text-red hover:bg-red hover:text-white border-red disabled:border-grey-beau'
};

const sizes = {
    sm: 'text-xs md:text-sm py-3 md:py-2 px-2 md:px-6 min-w-40',
    md: 'p-2 px-10 -w-152',
    lg: 'p-3 px-10 -w-196'
};


const Button = ({
    children,
    loading,
    disabled,
    title,
    className,
    size = 'lg',
    type = 'button',
    variant = 'primary',
    prefixIcon = null,
    suffixIcon = null,
    ...rest
}: Props) => {
    return (
        <button {...rest}
            type={type}
            disabled={disabled || loading}
            className={`flex items-center justify-center text-xs md:text-sm hover:px-7 py-3 md:py-2 px-2 md:px-8 rounded-[8px] leading-6 disabled:bg-gray-300 border disabled:text-gray-50 whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className} ${(loading) && 'py-3 md:py-4 px-8 md:px-12 bg-[#002355] text-[#ffffff]'}`}>
            {prefixIcon && (<> {prefixIcon}&nbsp;&nbsp;</>)}
            {loading ? <Spinner /> : <>{title || children}</>}
            {suffixIcon && (<> &nbsp;&nbsp;{suffixIcon}</>)}
        </button>
    )
}

export default Button

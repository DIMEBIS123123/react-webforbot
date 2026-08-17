import React, { type ButtonHTMLAttributes, type FC } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
	return <button {...props}>{children}</button>
}

export default Button

import * as React from 'react'
type P = React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
const cn = (...a:(string|false|null|undefined)[])=>a.filter(Boolean).join(' ')
const Input = React.forwardRef<HTMLInputElement, P>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(
    "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
    "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20",
    "disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
))
Input.displayName = "Input"
export default Input

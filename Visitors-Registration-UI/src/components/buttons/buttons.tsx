import { useNavigate } from "react-router-dom"
// import '../index.css'
import './buttons.css'

type ButtonProps = {
  // variant?: 'primary' | 'secondary' | 'danger' | 'outline-dark'
  variant?: string
  text: string
  to?: string
  onClick?: () => void
  disabled?: boolean  
}

const Button = ({ variant = 'primary', text, onClick, to, disabled = false }: ButtonProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(to) {
            navigate(to)
        } else if (onClick) {
            onClick()
        }
    }
  return (
    <button type="button" className={`btn btn-${variant} btn-lg`} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
import { Link } from 'react-router-dom'

interface ButtonProps {
  text: string
  link: string
  reactIcon: JSX.Element | null
}

const Button = ({ text, link, reactIcon }: ButtonProps): JSX.Element => {
  return (
    <Link
      to={link}
      className="text-white bg-zinc-700 px-8 py-3 block text-center font-semibold rounded-lg hover:-translate-y-1 hover:bg-white hover:text-black focus:outline-none transition-all active:text-white active:bg-zinc-800 active:translate-y-1"
    >
      {reactIcon} {text}
    </Link>
  )
}

export default Button

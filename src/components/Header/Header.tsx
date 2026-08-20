import './Header.css'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
	const telegram = useTelegram()
	const location = useLocation()
	return (
		<div className='header'>
			<span className='username'>{telegram.user.username}</span>

			<Link
				to={location.pathname === '/form' ? '/' : '/form'}
				className='glowButton'
			>
				{location.pathname === '/form' ? 'Открыть Главную' : 'Открыть Форму'}
			</Link>
			<Button onClick={telegram.onClose} className='telegramButton'>
				Закрыть Приложение
			</Button>
		</div>
	)
}

export default Header

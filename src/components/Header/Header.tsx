import './Header.css'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'
import { Link } from 'react-router-dom'

const Header = () => {
	const telegram = useTelegram()
	return (
		<div className='header'>
			<span className='username'>{telegram.user.username}</span>
			<Link to={'/form'} className='glowButton'>
				Открыть Форму
			</Link>
			<Button onClick={telegram.onClose} className='telegramButton'>
				Закрыть????
			</Button>
		</div>
	)
}

export default Header

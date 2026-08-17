import './Header.css'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'

const Header = () => {
	const telegram = useTelegram()
	return (
		<div className='header'>
			<span>{telegram.user.username}</span>
			<Button onClick={telegram.onToggleButton} className='glowButton'>
				Переключить???
			</Button>
			<Button onClick={telegram.onClose} className='telegramButton'>
				Закрыть????
			</Button>
		</div>
	)
}

export default Header

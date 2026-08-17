import './Header.css'
import Button from '../Button/Button'

const Header = () => {
	const tg = window.Telegram.WebApp
	const onClose = () => {
		tg.close()
	}
	return (
		<div className='header'>
			<span>{tg.initDataUnsafe?.user?.username}</span>
			<Button onClick={onClose} className='telegramButton'>
				Закрыть????
			</Button>
		</div>
	)
}

export default Header

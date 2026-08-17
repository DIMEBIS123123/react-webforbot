import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'

function App() {
	const telegram = useTelegram()
	useEffect(() => {
		telegram.tg.ready()
	}, [])

	return (
		<div>
			<Header></Header>
		</div>
	)
}

export default App

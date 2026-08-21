import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'

function App() {
	const telegram = useTelegram()
	useEffect(() => {
		telegram.tg.ready()
	}, [telegram.tg])

	return (
		<div>
			<Header></Header>
			<Routes>
				<Route path='/' element={<ProductList />}></Route>
				<Route path='/form' element={<Form />}></Route>
			</Routes>
		</div>
	)
}

export default App

import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'
import { useProducts } from './hooks/useProducts'

function App() {
	const telegram = useTelegram()
	const { products, handleAddToCart } = useProducts()
	useEffect(() => {
		telegram.tg.ready()
	}, [])

	return (
		<div>
			<Header></Header>
			<Routes>
				<Route
					path='/'
					element={
						<ProductList products={products} onAddToCart={handleAddToCart} />
					}
				></Route>
				<Route path='/form' element={<Form />}></Route>
			</Routes>
		</div>
	)
}

export default App

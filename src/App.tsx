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

	const { products, handleAddToCart, productsBasket } = useProducts()
	useEffect(() => {
		if (telegram.tg) telegram.tg.ready()
	}, [telegram.tg])

	return (
		<div>
			<Header></Header>
			<h1>111</h1>
			<Routes>
				<Route
					index
					path='/'
					element={
						<ProductList
							products={products}
							onAddToCart={handleAddToCart}
							productsBasket={productsBasket}
						/>
					}
				></Route>
				<Route
					path='/form'
					element={<Form productsBasket={productsBasket} />}
				></Route>
				<Route
					path='*'
					element={
						<ProductList
							products={products}
							onAddToCart={handleAddToCart}
							productsBasket={productsBasket}
						/>
					}
				></Route>
			</Routes>
		</div>
	)
}

export default App

import { useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types/product'

import { getTotalPrice } from '../../utils/totalPrice'

interface ProductListProps {
	products: Product[]
	onAddToCart?: (product: Product) => void
	productsBasket: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onAddToCart,
	productsBasket,
}) => {
	const totalPrice = getTotalPrice(productsBasket)
	const navigate = useNavigate()
	const { tg } = useTelegram()
	useEffect(() => {
		if (productsBasket.length > 0) {
			tg.MainButton.hide()
			tg.MainButton.setText(`🛒 Купить за ${totalPrice} ₽`)
			tg.MainButton.show()

			tg.MainButton.onClick(() => {
				navigate('/form')
			})
		}

		return () => {
			tg?.MainButton.offClick()
		}
	}, [productsBasket, totalPrice, tg, navigate])

	if (products.length === 0) {
		return (
			<div className='product-list-empty'>
				<p>😕 Товаров пока нет</p>
			</div>
		)
	}

	return (
		<div className='product-list'>
			{products.map(product => (
				<ProductItem
					key={product.id}
					product={product}
					onAddToCart={onAddToCart}
				/>
			))}
		</div>
	)
}

export default ProductList

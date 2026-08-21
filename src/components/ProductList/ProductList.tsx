import { useCallback, useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types/product'

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
	const getTotalPrice = useCallback((items: Product[]) => {
		return items.reduce((acc, item) => {
			return acc + item.price
		}, 0)
	}, [])
	const navigate = useNavigate()
	const { tg } = useTelegram()
	useEffect(() => {
		if (productsBasket.length > 0) {
			tg.MainButton.show()
			tg.MainButton.setParams({
				text: `Купить за ${getTotalPrice(productsBasket)}`,
			})

			tg.MainButton.onClick(() => {
				navigate('/form')
			})
		}
		return () => {
			tg?.MainButton.offClick()
		}
	}, [productsBasket, getTotalPrice, tg, navigate])

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

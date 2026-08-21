import React from 'react'
import './ProductItem.css'
import type { Product } from '../../types/product'

interface ProductItemProps {
	product: Product
	onAddToCart?: (product: Product) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
	const handleClick = () => {
		if (onAddToCart) {
			onAddToCart(product)
		}
	}

	return (
		<div className='product-item'>
			<div className='product-image'>
				<img src={product.image} alt={product.name} />
			</div>
			<div className='product-info'>
				<h3 className='product-name'>{product.name}</h3>
				{product.description && (
					<p className='product-description'>{product.description}</p>
				)}
				<div className='product-bottom'>
					<span className='product-price'>{product.price} ₽</span>
					<button className='product-btn' onClick={handleClick}>
						🛒 В корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductItem

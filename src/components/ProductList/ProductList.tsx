import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

interface Product {
	id: number
	name: string
	price: number
	image: string
	description?: string
}

interface ProductListProps {
	products: Product[]
	onAddToCart?: (product: Product) => void
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
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

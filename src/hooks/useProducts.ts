import type { Product } from '../types/product'

export function useProducts() {
	const products = [
		{
			id: 1,
			name: 'Аниме фигурка Наруто',
			price: 2500,
			image: 'https://via.placeholder.com/300x300?text=Naruto',
			description: 'Качественная фигурка Наруто Узумаки из популярного аниме',
		},
		{
			id: 2,
			name: 'Постер "Attack on Titan"',
			price: 800,
			image: 'https://via.placeholder.com/300x300?text=AOT',
			description: 'Постер высокого качества с изображением из аниме',
		},
		{
			id: 3,
			name: 'Кружка с аниме принтом',
			price: 600,
			image: 'https://via.placeholder.com/300x300?text=Mug',
			description: 'Керамическая кружка с изображением любимого персонажа',
		},
		{
			id: 4,
			name: 'Футболка с аниме дизайном',
			price: 1200,
			image: 'https://via.placeholder.com/300x300?text=T-shirt',
			description: 'Мягкая футболка с уникальным аниме принтом',
		},
	]

	const handleAddToCart = (product: Product) => {
		alert('Добавлен товар:' + product.name)
		// Здесь будет логика добавления в корзину
	}
	return { products, handleAddToCart }
}

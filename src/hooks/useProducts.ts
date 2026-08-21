import { useState } from 'react'
import type { Product } from '../types/product'

export function useProducts() {
	const [productsBasket, setProductsBasket] = useState<Product[]>([])
	const products = [
		{
			id: 1,
			name: 'Аниме фигурка Наруто',
			price: 2500,
			image: '../assets/naruto.webp',
			description: 'Качественная фигурка Наруто Узумаки из популярного аниме',
		},
		{
			id: 2,
			name: 'Постер "Attack on Titan"',
			price: 800,
			image: '../assets/aot.jpeg',
			description: 'Постер высокого качества с изображением из аниме',
		},
		{
			id: 3,
			name: 'Кружка с аниме принтом',
			price: 600,
			image: '../assets/animecr.webp',
			description: 'Керамическая кружка с изображением любимого персонажа',
		},
		{
			id: 4,
			name: 'Футболка с аниме дизайном',
			price: 1200,
			image: '../assets/shirt.jpeg',
			description: 'Мягкая футболка с уникальным аниме принтом',
		},
	]

	const handleAddToCart = (product: Product) => {
		alert('Добавлен товар:' + product.name)
		setProductsBasket([...productsBasket, product])
	}
	return { products, handleAddToCart, productsBasket }
}

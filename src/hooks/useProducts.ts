import { useState } from 'react'
import type { Product } from '../types/product'
import narutoImg from '../assets/naruto.webp'
import aotImg from '../assets/aot.jpeg'
import animecrImg from '../assets/animecr.webp'
import shirtImg from '../assets/shirt.jpeg'

export function useProducts() {
	const [productsBasket, setProductsBasket] = useState<Product[]>([])
	const products = [
		{
			id: 1,
			name: 'Аниме фигурка Наруто',
			price: 2500,
			image: narutoImg, // ✅ Используем импортированный файл
			description: 'Качественная фигурка Наруто Узумаки из популярного аниме',
		},
		{
			id: 2,
			name: 'Постер "Attack on Titan"',
			price: 800,
			image: aotImg,
			description: 'Постер высокого качества с изображением из аниме',
		},
		{
			id: 3,
			name: 'Кружка с аниме принтом',
			price: 600,
			image: animecrImg,
			description: 'Керамическая кружка с изображением любимого персонажа',
		},
		{
			id: 4,
			name: 'Футболка с аниме дизайном',
			price: 1200,
			image: shirtImg,
			description: 'Мягкая футболка с уникальным аниме принтом',
		},
	]

	const handleAddToCart = (product: Product) => {
		alert('Добавлен товар:' + product.name)
		setProductsBasket([...productsBasket, product])
	}
	return { products, handleAddToCart, productsBasket }
}

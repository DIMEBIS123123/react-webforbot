import axios from 'axios'
import type { Product } from '../types/product'
interface OrderFormData {
	name: string
	phone: string
	email: string
	address: string
	deliveryMethod: 'courier' | 'pickup' | 'post'
	paymentMethod: 'card' | 'cash' | 'crypto'
	comment: string
}

export async function fetchData(
	products: Product[],
	totalPrice: number,
	queryId: any,
	formData: OrderFormData,
) {
	try {
		const { data } = await axios.post(
			'http://localhost:8000/web-data',
			{
				products,
				totalPrice,
				queryId,
				formData,
			},
			{
				headers: { 'Content-Type': 'application/json' },
			},
		)
		return data
	} catch (error) {
		return error
	}
}

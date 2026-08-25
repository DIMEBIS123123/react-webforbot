import { useState, type ChangeEvent, type FormEvent } from 'react'
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram'
import { fetchData } from '../../utils/axiosPost'
import type { Product } from '../../types/product'
import { getTotalPrice } from '../../utils/totalPrice'

interface OrderFormData {
	name: string
	phone: string
	email: string
	address: string
	deliveryMethod: 'courier' | 'pickup' | 'post'
	paymentMethod: 'card' | 'cash' | 'crypto'
	comment: string
}
interface FormErrors {
	[key: string]: string
}
interface FormProp {
	productsBasket: Product[]
}

const Form = ({ productsBasket }: FormProp) => {
	const [formData, setFormData] = useState<OrderFormData>({
		name: '',
		phone: '',
		email: '',
		address: '',
		deliveryMethod: 'courier',
		paymentMethod: 'card',
		comment: '',
	})
	const { tg, onClose, queryId } = useTelegram()
	const totalPrice = getTotalPrice(productsBasket)

	const [errors, setErrors] = useState<FormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
		// Очищаем ошибку при вводе
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: '',
			}))
		}
	}

	const validateForm = () => {
		const newErrors: FormErrors = {}

		if (!formData.name.trim()) {
			newErrors.name = 'Введите имя'
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Введите телефон'
		} else if (!/^[+\d\s()-]{10,}$/.test(formData.phone)) {
			newErrors.phone = 'Введите корректный телефон'
		}

		if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Введите корректный email'
		}

		if (formData.deliveryMethod === 'courier' && !formData.address.trim()) {
			newErrors.address = 'Введите адрес доставки'
		}

		return newErrors
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const newErrors = validateForm()

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setIsSubmitting(true)

		try {
			if (tg && typeof tg.sendData === 'function') {
				tg.sendData(JSON.stringify(formData))
				alert('Заказ успешно оформлен! (sd)')
			} else {
				fetchData(productsBasket, totalPrice, queryId, formData)
				alert('Заказ успешно оформлен! (fd)')
			}

			// Сброс формы
			setFormData({
				name: '',
				phone: '',
				email: '',
				address: '',
				deliveryMethod: 'courier',
				paymentMethod: 'card',
				comment: '',
			})
		} catch (error) {
			console.error('Ошибка при отправке:', error)
			alert('Произошла ошибка. Попробуйте еще раз.')
		} finally {
			setIsSubmitting(false)
			onClose()
		}
	}

	return (
		<form className='order-form' onSubmit={handleSubmit}>
			<h2 className='form-title'>Оформление заказа</h2>

			<div className='form-group'>
				<label htmlFor='name'>Имя *</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					placeholder='Введите ваше имя'
					className={errors.name ? 'error' : ''}
				/>
				{errors.name && <span className='error-message'>{errors.name}</span>}
			</div>

			<div className='form-group'>
				<label htmlFor='phone'>Телефон *</label>
				<input
					type='tel'
					id='phone'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					placeholder='+7 (999) 123-45-67'
					className={errors.phone ? 'error' : ''}
				/>
				{errors.phone && <span className='error-message'>{errors.phone}</span>}
			</div>

			<div className='form-group'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='example@mail.com'
					className={errors.email ? 'error' : ''}
				/>
				{errors.email && <span className='error-message'>{errors.email}</span>}
			</div>

			<div className='form-group'>
				<label>Способ доставки</label>
				<div className='radio-group'>
					<label className='radio-label'>
						<input
							type='radio'
							name='deliveryMethod'
							value='courier'
							checked={formData.deliveryMethod === 'courier'}
							onChange={handleChange}
						/>
						<span>Курьером</span>
					</label>
					<label className='radio-label'>
						<input
							type='radio'
							name='deliveryMethod'
							value='pickup'
							checked={formData.deliveryMethod === 'pickup'}
							onChange={handleChange}
						/>
						<span>Самовывоз</span>
					</label>
					<label className='radio-label'>
						<input
							type='radio'
							name='deliveryMethod'
							value='post'
							checked={formData.deliveryMethod === 'post'}
							onChange={handleChange}
						/>
						<span>Почта</span>
					</label>
				</div>
			</div>

			{formData.deliveryMethod === 'courier' && (
				<div className='form-group'>
					<label htmlFor='address'>Адрес доставки *</label>
					<input
						type='text'
						id='address'
						name='address'
						value={formData.address}
						onChange={handleChange}
						placeholder='Город, улица, дом, квартира'
						className={errors.address ? 'error' : ''}
					/>
					{errors.address && (
						<span className='error-message'>{errors.address}</span>
					)}
				</div>
			)}

			<div className='form-group'>
				<label>Способ оплаты</label>
				<div className='radio-group'>
					<label className='radio-label'>
						<input
							type='radio'
							name='paymentMethod'
							value='card'
							checked={formData.paymentMethod === 'card'}
							onChange={handleChange}
						/>
						<span>Банковской картой</span>
					</label>
					<label className='radio-label'>
						<input
							type='radio'
							name='paymentMethod'
							value='cash'
							checked={formData.paymentMethod === 'cash'}
							onChange={handleChange}
						/>
						<span>Наличными</span>
					</label>
					<label className='radio-label'>
						<input
							type='radio'
							name='paymentMethod'
							value='crypto'
							checked={formData.paymentMethod === 'crypto'}
							onChange={handleChange}
						/>
						<span>Криптовалютой</span>
					</label>
				</div>
			</div>

			<div className='form-group'>
				<label htmlFor='comment'>Комментарий к заказу</label>
				<textarea
					id='comment'
					name='comment'
					value={formData.comment}
					onChange={handleChange}
					placeholder='Дополнительная информация'
					rows={3}
				/>
			</div>

			<button type='submit' className='submit-button' disabled={isSubmitting}>
				{isSubmitting ? 'Отправка...' : 'Оформить заказ'}
			</button>
		</form>
	)
}

export default Form

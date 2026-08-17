export {}

declare global {
	interface Window {
		Telegram: {
			WebApp: {
				initData: string
				initDataUnsafe: TelegramInitDataUnsafe
				version: string
				platform: string
				colorScheme: string
				themeParams: object
				isExpanded: boolean
				viewportHeight: number
				viewportStableHeight: number
				MainButton: any
				BackButton: any
				HapticFeedback: any
				ready: () => void
				expand: () => void
				close: () => void
				sendData: (data: string) => void
				enableClosingConfirmation: () => void
				disableClosingConfirmation: () => void
				setHeaderColor: (color: string) => void
				setBackgroundColor: (color: string) => void
				showAlert: (message: string, callback?: () => void) => void
				showConfirm: (
					message: string,
					callback?: (confirmed: boolean) => void,
				) => void
				showPopup: (
					params: object,
					callback?: (buttonId: string) => void,
				) => void
				switchInlineQuery: (query: string, chooseChatTypes?: string[]) => void
				openLink: (url: string, options?: object) => void
				openTelegramLink: (url: string) => void
				openInvoice: (url: string, callback?: (status: string) => void) => void
				onEvent: (eventType: string, callback: () => void) => void
				offEvent: (eventType: string, callback: () => void) => void
			}
		}
	}
}

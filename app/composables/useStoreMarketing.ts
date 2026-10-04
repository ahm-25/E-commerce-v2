import type { StoreMarketing } from '~/types'

// Loaded once per visit by plugins/01.marketing.ts (on the server for the first page)
export const useStoreMarketing = () => useState<StoreMarketing | null>('store-marketing', () => null)

// wa.me link with the message already typed in
export const whatsappLink = (number: string, message: string) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`

import { create } from 'zustand';
import { fetcher } from '../utils/fetcher'

export const useUserId = create((set) => ({
  loading: null,
  getUserId: async () => {
    const res = await fetcher('get', '/product/get/oid')
    set({ username: res })
  }
}))
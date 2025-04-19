import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links'] })
      }
    }
  }
})

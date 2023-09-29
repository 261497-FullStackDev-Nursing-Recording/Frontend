import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
  const queryClient = new QueryClient()
  
  export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Myid />
      </QueryClientProvider>
    )
  }
  
  function Myid() {
    const { isLoading, error, data } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        fetch('http://localhost:5001/api/auth/me').then(
          (res) => res.json(),
        ),
    })
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error
  
    return (
      <div>
        <h1>{data.id}</h1>
        {/* <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{' '}
        <strong>✨ {data.stargazers_count}</strong>{' '}
        <strong>🍴 {data.forks_count}</strong> */}
      </div>
    )
  }
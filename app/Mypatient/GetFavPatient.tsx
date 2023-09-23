import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const user_id = "498bffa2-97ee-491c-a417-8d44a49e5660";

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:5001/api/patient/${user_id}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;

  const handleSearch = async () => {
    const patientId = data[0].patient_id;

    try {
      const response = await fetch(
        "http://localhost:5001/api/patient/getAllPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ indentification_id: patientId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send POST request");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("An error occurred while sending the POST request:", error);
    }
  };

  console.log(data);

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <p>{item.patient_id}</p>
          <button onClick={handleSearch}>Search</button>
        </div>
      ))}
    </div>
  );
}


export async function GET() {
    try {
      const response = await fetch("https://restcountries.com/v2/all?fields=name");
      const countries = await response.json();
      return new Response(JSON.stringify(countries), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch  {
      return new Response(JSON.stringify({ error: "Failed to fetch countries" }), {
        status: 500,
      });
    }
  }
  
  
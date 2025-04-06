import { useState, useEffect } from "react";

interface Country {
  name: string;
}

export function CountryDropdown({ selected, onChange }: { selected: string; onChange: (val: string) => void }) {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/countries");
        const data: Country[] = await res.json();
        const countryNames = data.map((country: Country) => country.name).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <select
      value={selected || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option className="text-black" value="">Select Country</option>
      {countries.length > 0 ? (
        countries.map((country) => (
          <option className="text-black" key={country} value={country}>
            {country}
          </option>
        ))
      ) : (
        <option className="text-black" value="">Loading...</option>
      )}
    </select>
  );
}

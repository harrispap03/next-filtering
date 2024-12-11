"use client"
import { useSearchParams, useRouter } from "next/navigation";

const items = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Carrot", category: "Vegetable" },
  { id: 3, name: "Banana", category: "Fruit" },
  { id: 4, name: "Broccoli", category: "Vegetable" },
  { id: 5, name: "Strawberry", category: "Fruit" },
  { id: 6, name: "Potato", category: "Vegetable" },
];

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";

  const updateParams = (newParams: { search?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const filteredItems = items.filter((item) => {
    // Non case sensitive: const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = item.name.includes(searchQuery);
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-8 bg-white">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Product Search</h1>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg flex-1 bg-white text-gray-800"
          />
          
          <select 
            value={selectedCategory}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800"
          >
            <option value="All">All Categories</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-800">{item.category}</td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import { React, useState } from "react";

const List = ({ contract, provider, items, setItems }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    image: "",
    cost: "",
    rating: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleList = async () => {
    const signer = await provider.getSigner();
    await contract
      .connect(signer)
      .list(
        formData.id,
        formData.name,
        formData.category,
        formData.image,
        formData.cost,
        formData.rating,
        formData.stock
      );

    const item = await contract.Items(formData);
    items.push({
      id: item.id.toString(),
      name: item.name,
      category: item.category,
      image: item.image,
      cost: item.cost.toString(),
      rating: item.rating.toString(),
      stock: item.stock.toString(),
    });

    setItems(items);
  };
  return (
    <div className="p-6 bg-green-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">List New Item</h1>
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Item ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (ETH)
            </label>
            <input
              type="number"
              step="any"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={handleList}
          >
            List Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default List;

import Amazon from "./abis/Amazon.json";
import { ethers } from "ethers";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { parseEther } from "ethers/lib/utils";
import List from "./components/List";

function App() {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const ABI = Amazon.abi;

  const [provider, setProvider] = useState(null);
  const [amazon, setAmazon] = useState(null);
  const [account, setAccount] = useState(null);
  const [items, setItems] = useState([]);
  const [owner, setOwner] = useState(null);

  const loadBlockChainData = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const signer = provider.getSigner();

        const currentNonce = await provider.getTransactionCount(
          account,
          "latest"
        );

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        setAmazon(contract);
        const items = [];

        const owner = await contract.owner();
        console.log("Owner : " + owner);
        setOwner(owner.toLowerCase());

        for (var i = 0; i < 9; i++) {
          const item = await contract.Items(i + 1);
          items.push({
            id: item.id.toString(),
            name: item.name,
            category: item.category,
            image: item.image,
            cost: item.cost.toString(),
            rating: item.rating.toString(),
            stock: item.stock.toString(),
          });
        }
        setItems(items);
        console.log(items);
      }
    } catch (e) {
      console.log("error while loading data ");
      console.error(e);
    }
  };

  useEffect(() => {
    if (account != null) {
      loadBlockChainData();
      fetchListDetails();
      fetchBuyDetails();
    }
  }, [account]);

  const handleBuy = async (id, price) => {
    try {
      const signer = provider.getSigner();
      const currentNonce = await provider.getTransactionCount(
        signer.getAddress(),
        "latest"
      );
      await amazon
        .connect(signer)
        .buy(id, { value: parseEther(price), nonce: currentNonce });
      console.log(` Item with id : ${id}  bought `);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchListDetails = async () => {
    const events = await amazon.queryFilter("List");
    console.log("List events : ");
    console.log(events);
  };

  const fetchBuyDetails = async () => {
    const events = await amazon.queryFilter("Buy");
    console.log("Buy events : ");
    console.log(events);
  };

  return (
    <>
      <div className="max-h-screen  w-full bg-gray-200 ">
        <Navbar account={account} setAccount={setAccount}></Navbar>
        {/* <div>
          {owner && account && owner.toString() === account.toString() && (
            <List
              contract={amazon}
              provider={provider}
              items={items}
              setItems={setItems}
            />
          )}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
          {items.length === 0 ? (
            <p className="text-center text-red-500 col-span-full">
              Out of Stock
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-1">
                    Category: {item.category}
                  </p>
                  <p className="text-gray-800 font-bold mb-2">
                    Price: {item.cost} ETH
                  </p>
                  <p className="text-gray-600 mb-2">Rating: {item.rating}</p>
                  <p className="text-gray-600 mb-4">Stock: {item.stock}</p>
                  <button
                    onClick={() => handleBuy(item.id, item.cost)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;

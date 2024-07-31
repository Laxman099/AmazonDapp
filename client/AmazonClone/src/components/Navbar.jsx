import { ethers } from "ethers";

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0].toString();
    console.log("Accoount :" + account);
    setAccount(account.toLowerCase());
  };

  return (
    <nav className="w-full h-20 bg-gray-600 flex items-center justify-between px-10">
      <div className="text-green-100 font-extrabold px-4 py-2 ">
        <h1 className="text-2xl">Amazon</h1>
      </div>

      <input
        type="text"
        className="w-1/3 border-solid border-2 outline-none rounded-md px-4 py-2 "
        placeholder="search Amazon.ethereum "
      />

      <ul className="flex justify-start items-center text-white ">
        <li className="mx-4">
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
        </li>
        <li className="mx-4">
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
        </li>
        <li className="mx-4">
          <a href="#Toys & Gaming">Toys & Gaming</a>
        </li>
      </ul>

      {account ? (
        <button
          type="button"
          className="text-white bg-slate-500 px-4 py-2 rounded-lg"
        >
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className="bg-[#047aed] px-4 py-2 rounded-md hover:scale-105"
          onClick={connectHandler}
        >
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navbar;

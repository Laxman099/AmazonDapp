// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8;

contract Amazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint time;
        Item item;
    }

    mapping(uint256 => Item) public Items;

    mapping(address => uint256) public orderCount;

    mapping(address => mapping(uint256 => Order)) orders;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function ");
        _;
    }

    //list products

    event List(string name, uint256 cost, uint256 quantity);

    event Buy(address buyer, uint256 orderId, uint256 itemId);

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        Items[_id] = item;
        emit List(_name, _cost, _stock);
    }

    // buy products

    function buy(uint productId) public payable {
        Item memory item = Items[productId];

        require(msg.value >= item.cost, "amount is less than the price ");

        Order memory order = Order(block.timestamp, item);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        Items[productId].stock = item.stock - 1;

        emit Buy(msg.sender, orderCount[msg.sender], productId);
    }

    // withdraw funds

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}

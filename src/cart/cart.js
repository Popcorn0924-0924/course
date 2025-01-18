import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

// 商品接口
interface CartItem {
  name: string;
  price: number;
}

// MobX Store - 購物車資料
class CartStore {
  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item: CartItem) {
    this.items.push(item);
    this.calculateTotalPrice();
  }

  removeItem(itemName: string) {
    const index = this.items.findIndex((item) => item.name === itemName);
    if (index !== -1) {
      this.items.splice(index, 1); // 移除第一個匹配的項目
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.items.reduce((total, item) => total + item.price, 0);
  }
}

// 初始化 store
const cartStore = new CartStore();

// Styled Components - 視覺效果
const CartContainer = styled.div`
  background-color: #f4f4f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
`;

const CartTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const TotalPrice = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
`;

const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
`;

// 小型購物車元件 - 顯示在首頁
const MiniCart = observer(() => {
  return (
    <CartContainer>
      <CartTitle>小型購物車</CartTitle>
      <ItemList>
        {cartStore.items.slice(0, 3).map((item, index) => (
          <Item key={`${item.name}-${index}`}>
            {item.name}: {item.price}元
          </Item>
        ))}
      </ItemList>
      <TotalPrice>總金額: {cartStore.totalPrice}元</TotalPrice>
    </CartContainer>
  );
});

// 主要購物車元件 - 顯示在結帳頁面
const FullCart = observer(() => {
  return (
    <CartContainer>
      <CartTitle>結帳購物車</CartTitle>
      <ItemList>
        {cartStore.items.map((item, index) => (
          <Item key={`${item.name}-${index}`}>
            {item.name}: {item.price}元
            <Button onClick={() => cartStore.removeItem(item.name)}>刪除</Button>
          </Item>
        ))}
      </ItemList>
      <TotalPrice>總金額: {cartStore.totalPrice}元</TotalPrice>
    </CartContainer>
  );
});

// 添加商品的元件
const AddToCart = observer(() => {
  const handleAddItem = () => {
    const item: CartItem = { name: '商品A', price: 100 };
    cartStore.addItem(item);
  };

  return (
    <div>
      <AddButton onClick={handleAddItem}>添加商品A到購物車</AddButton>
    </div>
  );
});

// 首頁元件
const HomePage = () => {
  return (
    <div>
      <h1>首頁</h1>
      <AddToCart />
      <MiniCart />
    </div>
  );
};

// 結帳頁面元件
const CheckoutPage = () => {
  return (
    <div>
      <h1>結帳頁面</h1>
      <FullCart />
    </div>
  );
};

// 父元件 - 使用 MobX Store 管理購物車狀態
const Cart = () => {
  return (
    <div>
      <HomePage />
      <CheckoutPage />
    </div>
  );
};

export default Cart;

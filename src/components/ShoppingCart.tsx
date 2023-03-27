import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppinCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppinCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  console.log(cartItems);
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              <Stack direction="horizontal" gap={3}>
                Total:
                <div>
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      console.log(cartItem);
                      const item = storeItems.find(
                        (item) => item.id === cartItem.id
                      );
                      console.log(item);
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
                </div>
              </Stack>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

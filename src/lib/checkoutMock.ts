export async function createCheckoutSessionMock(cart, customer) {
  return { url: "/order/success?session_id=mock_123" };
}

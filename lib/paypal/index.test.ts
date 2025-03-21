import { generateAccessToken, PAYPAL } from "./index";

// Test to generate access token from paypal
test("Generates a token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test("Creates a PAYPAL order", async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const orderResponse = await PAYPAL.createOrder(price);
  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

// Test to capture payment with a mock order
test("Simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(PAYPAL, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await PAYPAL.capturePayment(orderId);

  expect(captureResponse).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});

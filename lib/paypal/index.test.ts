import { generateAccessToken } from "./index";

// Test to generate access token from paypal
test("Generates a token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

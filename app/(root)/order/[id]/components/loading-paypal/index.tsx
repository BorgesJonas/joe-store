import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

export function LoadingPayPal() {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  let status = "";

  if (isPending) {
    status = "Loading PayPal...";
  } else if (isRejected) {
    status = "Error Loading PayPal";
  }
  return status;
}

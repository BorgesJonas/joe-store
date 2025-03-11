import { Order } from "@/@types";

export interface OrderDetailsTableProps {
  order: Order;
  paypalClientId: string;
  isAdmin: boolean;
}

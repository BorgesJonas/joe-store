import { Button } from "@/components/ui/button";
import { updateOrderToDelivered } from "@/lib/actions/order.actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { MarkAsDeliveredButtonProps } from "./types";

export function MarkAsDeliveredButton({ orderId }: MarkAsDeliveredButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function handleMarkAsPaid() {
    startTransition(async () => {
      const response = await updateOrderToDelivered(orderId);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    });
  }

  return (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={handleMarkAsPaid}
    >
      {isPending ? "Processing..." : "Mark as Delivered"}
    </Button>
  );
}

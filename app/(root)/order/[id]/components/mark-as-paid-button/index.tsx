import { Button } from "@/components/ui/button";
import { updateOrderToPaydCOD } from "@/lib/actions/order.actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { MarkAsPaidButtonProps } from "./types";

export function MarkAsPaidButton({ orderId }: MarkAsPaidButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function handleMarkAsPaid() {
    startTransition(async () => {
      const response = await updateOrderToPaydCOD(orderId);

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
      {isPending ? "Processing..." : "Mark as Paid"}
    </Button>
  );
}

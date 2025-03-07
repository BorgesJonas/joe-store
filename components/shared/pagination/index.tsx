"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaginationProps } from "./types";
import { Button } from "@/components/ui/button";
import { buildUrlQuery } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(type: string) {
    const pageValue = type === "next" ? Number(page) + 1 : Number(page) - 1;
    const url = buildUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(url);
  }

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
}

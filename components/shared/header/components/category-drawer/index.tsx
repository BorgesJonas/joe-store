import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/products.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export async function CategoryDrawer() {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button type="button" variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-1 mt-4">
          {categories.map((category) => (
            <Button
              asChild
              key={category.category}
              variant="ghost"
              className="w-full justify-start"
            >
              <DrawerClose asChild>
                <Link href={`/search?category=${category.category}`}>
                  {category.category} ({category._count})
                </Link>
              </DrawerClose>
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

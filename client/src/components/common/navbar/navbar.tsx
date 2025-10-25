import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { CartButton } from "@/components/display/cart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";
export function Navbar() {
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const { clear } = useCart();

  const onSignOut = () => {
    clear();
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[48px] bg-black z-30 flex items-center px-4">
      <div className="shrink-0">
        <Link href="/" className="text-white font-bold">
          HOME
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Articles</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/articles?type=News">
                        <div className="font-medium">News</div>
                        <div className="text-muted-foreground">
                          Latest album drops, singles, and tour announcements.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/articles?type=Release">
                        <div className="font-medium">Releases</div>
                        <div className="text-muted-foreground">
                          Spotlight on trending artists and must-read reviews.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/shop?type=CD">CDs</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/shop?type=Vinyl">Vinyls</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/shop?type=Merch">Merch</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about-us">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-2">
        {session ? (
          <>
            <span className="text-white text-sm">{session.user?.name}</span>

            <div className="relative overflow-visible">
              <CartButton />
            </div>

            <Button variant="outline" size="sm" onClick={onSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <CartButton />
            <Link href="/login" className="text-white text-sm hover:underline">
              Sign in / Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

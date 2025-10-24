import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full h-[48px] bg-black z-50 flex items-center px-4">
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
                      <Link href="/articles?filter=new">
                        <div className="font-medium">New</div>
                        <div className="text-muted-foreground">
                          Latest album drops, singles, and tour announcements.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/articles?filter=featured">
                        <div className="font-medium">Featured</div>
                        <div className="text-muted-foreground">
                          Spotlight on trending artists and must-read reviews.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/articles?filter=favorites">
                        <div className="font-medium">Favorites</div>
                        <div className="text-muted-foreground">
                          Curated picks from our editors and community
                          favorites.
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
                      <Link href="/shop?filter=cd">CDs</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/shop?filter=vinyl">Vinyls</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/shop?filter=merch">Merch</Link>
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
            <span className="text-white text-sm">{session.user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Link href="/login" className="text-white text-sm hover:underline">
            Sign in / Register
          </Link>
        )}
      </div>
    </header>
  );
}

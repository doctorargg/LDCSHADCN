"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { navigationItems, ctaConfig } from "@/lib/config";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-lg border-[oklch(0.62_0.18_180_/_0.1)]" 
          : "bg-background/80 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                {'subItems' in item && item.subItems ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "transition-all duration-200",
                        pathname.startsWith(item.href) && "text-[oklch(0.62_0.18_180)] font-semibold"
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.subItems.map((subItem) => (
                          <ListItem
                            key={subItem.href}
                            href={subItem.href}
                            title={subItem.title}
                            className={cn(
                              pathname === subItem.href && "bg-[oklch(0.62_0.18_180_/_0.08)] text-[oklch(0.45_0.16_180)]"
                            )}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link 
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "transition-all duration-200",
                        pathname === item.href && "text-[oklch(0.62_0.18_180)] font-semibold"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <Button
            asChild
            className="hidden lg:inline-flex"
            size="sm"
            variant="secondary"
          >
            <Link
              href={ctaConfig.secondary.href}
              target={ctaConfig.secondary.external ? "_blank" : undefined}
              rel={ctaConfig.secondary.external ? "noopener noreferrer" : undefined}
            >
              {ctaConfig.secondary.text}
              {ctaConfig.secondary.external && (
                <ExternalLink className="ml-1 h-3 w-3" />
              )}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    {'subItems' in item && item.subItems ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>{item.title}</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <div className="ml-4 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block text-sm text-muted-foreground hover:text-primary transition-colors",
                                pathname === subItem.href && "text-primary"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block text-sm font-medium hover:text-primary transition-colors",
                          pathname === item.href && "text-primary"
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full" size="sm">
                    <Link
                      href={ctaConfig.secondary.href}
                      target={ctaConfig.secondary.external ? "_blank" : undefined}
                      rel={ctaConfig.secondary.external ? "noopener noreferrer" : undefined}
                    >
                      {ctaConfig.secondary.text}
                      {ctaConfig.secondary.external && (
                        <ExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <Link
                      href={ctaConfig.primary.href}
                      target={ctaConfig.primary.external ? "_blank" : undefined}
                      rel={ctaConfig.primary.external ? "noopener noreferrer" : undefined}
                    >
                      {ctaConfig.primary.text}
                      {ctaConfig.primary.external && (
                        <ExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
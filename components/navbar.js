"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Laptop,
  User,
  BookMarked,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setLastScrollY((prevScrollY) => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > prevScrollY && currentScrollY > 10) {
          // Scrolling down, hide navbar
          setVisible(false);
        } else {
          // Scrolling up, show navbar
          setVisible(true);
        }

        setScrolled(currentScrollY > 20);

        return currentScrollY; // Update lastScrollY properly
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  // Get current time to determine theme
  const getCurrentHour = () => {
    return new Date().getHours();
  };

  // Set theme based on time of day
  const setTimeBasedTheme = () => {
    const hour = getCurrentHour();
    if (hour >= 6 && hour < 18) {
      // Daytime: 6 AM - 6 PM
      setTheme("light");
    } else {
      // Nighttime: 6 PM - 6 AM
      setTheme("dark");
    }
  };

  return (
    <header
      className={`sticky rounded-xl z-50 self-center transition-all duration-300 
      ${
        visible
          ? scrolled
            ? "bg-background/80 backdrop-blur-xs shadow-sm w-[98%] top-2"
            : "bg-background w-full top-0"
          : "-top-[100px]"
      }
    `}
    >
      <div className="container mx-auto w-full px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-8">
              BlogFolio
            </Link>

            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-32 pl-8"
              />
            </div>

            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {theme === "light" ? (
                      <Sun className="h-5 w-5" />
                    ) : theme === "dark" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Laptop className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={setTimeBasedTheme}>
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Time-based</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="ghost" size="icon" asChild>
              <Link href="/bookmarks">
                <BookMarked className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <VisuallyHidden>
                  <SheetTitle />
                </VisuallyHidden>
                <div className="grid gap-6 py-6">
                  <div className="flex relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full pl-8"
                    />
                  </div>

                  <nav className="grid gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

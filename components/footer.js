import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">BlogFolio</h3>
            <p className="text-muted-foreground mb-4">
              A feature-rich personal blog with interactive elements and a
              modern user experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/technology"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/lifestyle"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/travel"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/food"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/health"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Subscribe to Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Get the latest posts and updates delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" type="email" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlogFolio. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

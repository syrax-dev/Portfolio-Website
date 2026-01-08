import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2026 SyraxDev
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

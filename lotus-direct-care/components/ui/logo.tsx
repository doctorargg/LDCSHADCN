import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showFullLogo?: boolean;
}

export function Logo({ className, variant = "default", showFullLogo = false }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center transition-all duration-300 hover:opacity-90",
        className
      )}
    >
      {showFullLogo ? (
        <Image
          src="/images/Lotus Midjourney Flowers/lotus_logo_full.png"
          alt={SITE_NAME}
          width={200}
          height={50}
          className="h-10 w-auto"
          priority
        />
      ) : (
        <div className="flex items-center space-x-3">
          <Image
            src="/images/Lotus Midjourney Flowers/lotus_logo.png"
            alt={`${SITE_NAME} Logo`}
            width={40}
            height={40}
            className="h-9 w-auto md:h-10 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-bold leading-none bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent",
              variant === "light" && "from-white to-white/90",
              variant === "dark" && "from-gray-900 to-gray-800"
            )}>
              {SITE_NAME.split(" ")[0]}
            </span>
            <span className={cn(
              "text-sm font-medium leading-none",
              variant === "light" ? "text-white/80" : "text-muted-foreground"
            )}>
              {SITE_NAME.split(" ").slice(1).join(" ")}
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
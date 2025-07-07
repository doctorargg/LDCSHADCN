import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";
import { 
  footerLinks, 
  socialLinks,
  ctaConfig 
} from "@/lib/config";
import { 
  CONTACT_INFO, 
  BUSINESS_HOURS,
  EXTERNAL_URLS 
} from "@/lib/constants";
import { LegitScriptSeal } from "@/components/ui/legitscript-seal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-[oklch(0.62_0.18_180_/_0.03)] border-t border-[oklch(0.62_0.18_180_/_0.1)]">
      {/* CTA Section */}
      <div className="gradient-lotus-dark text-white py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ready to Experience Personalized Healthcare?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join our direct primary care practice and experience healthcare that puts you first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="shadow-xl">
              <Link
                href={ctaConfig.primary.href}
                target={ctaConfig.primary.external ? "_blank" : undefined}
                rel={ctaConfig.primary.external ? "noopener noreferrer" : undefined}
              >
                {ctaConfig.primary.text}
                {ctaConfig.primary.external && (
                  <ExternalLink className="ml-2 h-4 w-4" />
                )}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-lotus-teal font-semibold hover:bg-white/90 shadow-xl">
              <Link
                href={ctaConfig.secondary.href}
                target={ctaConfig.secondary.external ? "_blank" : undefined}
                rel={ctaConfig.secondary.external ? "noopener noreferrer" : undefined}
              >
                {ctaConfig.secondary.text}
                {ctaConfig.secondary.external && (
                  <ExternalLink className="ml-2 h-4 w-4" />
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Personalized functional medicine and direct primary care in Mequon, Wisconsin.
            </p>
            
            <div className="space-y-3">
              <a 
                href={`tel:${CONTACT_INFO.PHONE}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.PHONE}
              </a>
              <a 
                href={`mailto:${CONTACT_INFO.EMAIL}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_INFO.EMAIL}
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p>{CONTACT_INFO.ADDRESS.STREET}</p>
                  <p>{CONTACT_INFO.ADDRESS.SUITE}</p>
                  <p>{CONTACT_INFO.ADDRESS.CITY}, {CONTACT_INFO.ADDRESS.STATE} {CONTACT_INFO.ADDRESS.ZIP}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Links */}
          <div>
            <h3 className="font-semibold mb-4">Practice</h3>
            <ul className="space-y-2">
              {footerLinks.practice.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Links */}
          <div>
            <h3 className="font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2">
              {footerLinks.patients.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={'external' in link && link.external ? "_blank" : undefined}
                    rel={'external' in link && link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.title}
                    {'external' in link && link.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-semibold mb-4">Office Hours</h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {day}:
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* External Quick Links */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link
                href={EXTERNAL_URLS.PATIENT_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Patient Portal
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href={EXTERNAL_URLS.BOOK_APPOINTMENT}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href={EXTERNAL_URLS.MEMBERSHIP_SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Join Membership
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Lotus Direct Care. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {footerLinks.resources
                .filter(link => link.href.includes("privacy") || link.href.includes("terms"))
                .map((link, index) => (
                  <React.Fragment key={link.href}>
                    {index > 0 && <span className="text-muted-foreground">·</span>}
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </React.Fragment>
                ))}
            </div>
          </div>
          
          {/* LegitScript Seal */}
          <div className="flex items-center gap-4">
            <LegitScriptSeal />
          </div>

          {/* Social Media Icons (placeholder - hidden if no links) */}
          {Object.values(socialLinks).some(link => link) && (
            <div className="flex items-center gap-3">
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
              {socialLinks.twitter && (
                <Link
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              {socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
              {socialLinks.youtube && (
                <Link
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
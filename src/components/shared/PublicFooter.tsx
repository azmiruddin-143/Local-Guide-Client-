import Link from 'next/link';
import { Compass, Facebook, Instagram, Twitter, Mail, MapPin, Phone, Linkedin, Youtube } from 'lucide-react';
import { getPlatformSettings } from '@/services/settings/settings.service';
import { IPlatformSettings } from '@/types/settings.interface';

async function PublicFooter() {
  const {data: settings } = await getPlatformSettings() 
  console.log(settings);
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-white">LocalGuide</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connect with passionate local guides and discover authentic experiences around the world. Your journey starts here.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {settings?.socialLinks?.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}  
              {settings?.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}   {settings?.socialLinks?.twitter && (
                <a
                  href={settings?.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )} 
              {settings?.socialLinks?.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )} 
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-primary transition-colors flex items-center gap-2">
                  Browse Tours
                </Link>
              </li>
              <li>
                <Link href="/become-a-guide" className="hover:text-primary transition-colors flex items-center gap-2">
                  Become a Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-primary transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:support@localguidebd.com" className="hover:text-primary transition-colors">
                  {settings?.contacts?.supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a href="tel:+8801933946077" className="hover:text-primary transition-colors">
                {settings?.contacts?.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  {settings?.contacts?.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

      

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LocalGuidebd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Image as ImageIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  const getMetaTags = () => {
    const baseTitle = 'JPG Compressor - Free Online Image Compression';
    const baseDescription = 'Compress JPG images online for free. Reduce file size while maintaining quality. No signup required.';

    switch (location.pathname) {
      case '/':
        return {
          title: `${baseTitle} | Reduce Image Size Without Quality Loss`,
          description: baseDescription
        };
      case '/about':
        return {
          title: 'About Us | JPG Compressor - Image Optimization Experts',
          description: 'Learn about JPG Compressor\'s mission to provide free, high-quality image compression for everyone.'
        };
      case '/faq':
        return {
          title: 'FAQ | JPG Compressor - Common Questions Answered',
          description: 'Find answers to frequently asked questions about JPG compression, image quality, and using our free service.'
        };
      case '/contact':
        return {
          title: 'Contact Us | JPG Compressor - Get Support',
          description: 'Need help with JPG compression? Contact our support team for assistance.'
        };
      case '/privacy':
        return {
          title: 'Privacy Policy | JPG Compressor',
          description: 'Read our privacy policy to understand how we protect your data and handle image processing.'
        };
      case '/terms':
        return {
          title: 'Terms of Service | JPG Compressor',
          description: 'Review our terms of service for using JPG Compressor\'s free image compression tools.'
        };
      default:
        return {
          title: baseTitle,
          description: baseDescription
        };
    }
  };

  const { title, description } = getMetaTags();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://jpgcompressor.live${location.pathname}`} />
        <link rel="canonical" href={`https://jpgcompressor.live${location.pathname}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center text-primary-600">
                  <ImageIcon className="h-8 w-8 mr-2" />
                  <span className="text-xl font-bold">JPG Compressor</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-primary-600'
                        : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-secondary-600 hover:text-secondary-900"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main>{children}</main>

        <footer className="bg-white border-t border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
                  Company
                </h3>
                <div className="space-y-4">
                  <Link to="/about" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    About
                  </Link>
                  <Link to="/contact" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
                  Support
                </h3>
                <div className="space-y-4">
                  <Link to="/faq" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    FAQ
                  </Link>
                  <a href="mailto:support@jpgcompressor.live" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    Email Us
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <div className="space-y-4">
                  <Link to="/privacy" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    Terms
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
                  Connect
                </h3>
                <div className="space-y-4">
                  <a href="https://twitter.com/jpgcompressor" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    Twitter
                  </a>
                  <a href="https://github.com/jpgcompressor" className="text-base text-secondary-600 hover:text-secondary-900 block">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-secondary-200 text-center">
              <p className="text-base text-secondary-500">
                © {new Date().getFullYear()} JPG Compressor. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
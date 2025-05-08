import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-6">Contact Us</h1>
          <p className="text-xl text-secondary-600">
            Have questions about JPG Compressor? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-lg font-semibold text-secondary-900 mb-2">Email</h2>
            <a href="mailto:support@jpgcompressor.live" className="text-primary-600 hover:text-primary-700">
              support@jpgcompressor.live
            </a>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-lg font-semibold text-secondary-900 mb-2">Phone</h2>
            <p className="text-secondary-600">Mon-Fri, 9am-5pm EST</p>
            <a href="tel:+1-555-123-4567" className="text-primary-600 hover:text-primary-700">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-lg font-semibold text-secondary-900 mb-2">Office</h2>
            <p className="text-secondary-600">
              123 Compression Street<br />
              Suite 456<br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JPG Compressor",
            "url": "https://jpgcompressor.live",
            "email": "support@jpgcompressor.live",
            "telephone": "+1-555-123-4567",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Compression Street, Suite 456",
              "addressLocality": "New York",
              "addressRegion": "NY",
              "postalCode": "10001",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "telephone": "+1-555-123-4567",
              "email": "support@jpgcompressor.live",
              "availableLanguage": ["English"]
            }
          })}
        </script>
      </div>
    </div>
  );
};

export default Contact;
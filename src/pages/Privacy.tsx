const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none">
        <p className="text-secondary-600 mb-6">Last updated: May 8, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Introduction</h2>
          <p className="text-secondary-600 mb-4">
            At JPG Compressor, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            and protect your information when you use our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium text-secondary-800 mb-3">Automatically Collected Information:</h3>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>Usage data (pages visited, time spent on site)</li>
            <li>Device information (browser type, operating system)</li>
            <li>IP address</li>
            <li>Cookie data</li>
          </ul>

          <h3 className="text-xl font-medium text-secondary-800 mb-3">Your Images:</h3>
          <p className="text-secondary-600 mb-4">
            We do not store or collect your images. All image compression happens locally in your browser, 
            and your files never leave your device.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>To provide and improve our services</li>
            <li>To analyze website usage and performance</li>
            <li>To customize your experience</li>
            <li>To display relevant advertising</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Cookies</h2>
          <p className="text-secondary-600 mb-4">
            We use cookies to enhance your experience on our website. These include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>Essential cookies for site functionality</li>
            <li>Analytics cookies to understand usage</li>
            <li>Advertising cookies for relevant ads</li>
          </ul>
          <p className="text-secondary-600 mb-4">
            You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Third-Party Services</h2>
          <p className="text-secondary-600 mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>Google Analytics for website analytics</li>
            <li>Google AdSense for advertising</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Data Security</h2>
          <p className="text-secondary-600 mb-4">
            We implement appropriate security measures to protect your information. However, no internet 
            transmission is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Your Rights</h2>
          <p className="text-secondary-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of tracking</li>
            <li>Update your preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Contact Us</h2>
          <p className="text-secondary-600">
            For any privacy-related questions or concerns, please contact us at{' '}
            <a href="mailto:privacy@jpgcompressor.live" className="text-primary-600 hover:text-primary-700">
              privacy@jpgcompressor.live
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
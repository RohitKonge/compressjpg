const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-secondary-900 mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none">
        <p className="text-secondary-600 mb-6">Last updated: May 8, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-secondary-600 mb-4">
            By accessing and using JPG Compressor ("the Service"), you agree to be bound by these Terms of Service.
            If you disagree with any part of these terms, you may not access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Description of Service</h2>
          <p className="text-secondary-600 mb-4">
            JPG Compressor provides an online image compression service that allows users to reduce the file size
            of their JPG images. The Service processes images locally in the user's browser and does not store
            or transmit images to our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. User Obligations</h2>
          <p className="text-secondary-600 mb-4">You agree to:</p>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>Use the Service only for lawful purposes</li>
            <li>Not upload malicious files or attempt to compromise the Service</li>
            <li>Not interfere with or disrupt the Service or servers</li>
            <li>Not attempt to bypass any limitations or security measures</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Intellectual Property</h2>
          <p className="text-secondary-600 mb-4">
            You retain all rights to your images. By using the Service, you grant us the limited right to process
            your images solely for the purpose of compression. Our Service, including its original content and
            features, is owned by JPG Compressor and is protected by international copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. No Warranty</h2>
          <p className="text-secondary-600 mb-4">
            The Service is provided "as is" without warranty of any kind, either express or implied. While we
            strive to provide the best possible service, we do not guarantee that:
          </p>
          <ul className="list-disc pl-6 mb-4 text-secondary-600">
            <li>The Service will be uninterrupted or error-free</li>
            <li>Any specific level of compression will be achieved</li>
            <li>The compressed images will meet your specific requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Limitation of Liability</h2>
          <p className="text-secondary-600 mb-4">
            In no event shall JPG Compressor be liable for any indirect, incidental, special, consequential,
            or punitive damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">7. Changes to Terms</h2>
          <p className="text-secondary-600 mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material
            changes by posting the new Terms of Service on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">8. Data Processing</h2>
          <p className="text-secondary-600 mb-4">
            All image processing occurs locally in your browser. We do not store, transmit, or have access
            to your images. Usage analytics and cookies are employed as described in our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">9. Contact</h2>
          <p className="text-secondary-600">
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@jpgcompressor.live" className="text-primary-600 hover:text-primary-700">
              legal@jpgcompressor.live
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
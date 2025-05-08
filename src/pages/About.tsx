import { Award, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* SEO Meta Tags - Added via React Helmet in main layout */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary-900 mb-6">About JPG Compressor</h1>
        <p className="text-xl text-secondary-600">
          Empowering users worldwide with fast, secure, and efficient image compression technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Our Mission</h2>
          <p className="text-secondary-600 mb-6">
            Founded in 2020, JPG Compressor was created with a simple mission: to make image compression accessible, 
            efficient, and free for everyone. We believe that high-quality image optimization should be available to all, 
            from individual creators to large enterprises.
          </p>
          <p className="text-secondary-600">
            Our team of dedicated developers and image processing experts work continuously to improve our compression 
            algorithms, ensuring the perfect balance between file size reduction and image quality preservation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Why Choose Us</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Shield className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-secondary-900">100% Secure Processing</h3>
                <p className="text-secondary-600">All compression happens locally in your browser. Your images never leave your device.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Award className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-secondary-900">Advanced Technology</h3>
                <p className="text-secondary-600">Our proprietary compression algorithm ensures optimal results every time.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="w-6 h-6 text-primary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-secondary-900">Trusted by Millions</h3>
                <p className="text-secondary-600">Join over 100 million users who trust us with their image compression needs.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-primary-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-6 text-center">Our Commitment to Quality</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">100M+</div>
            <p className="text-secondary-600">Images Processed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
            <p className="text-secondary-600">Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <p className="text-secondary-600">User Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
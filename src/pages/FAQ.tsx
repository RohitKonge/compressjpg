import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does JPG compression work?",
      answer: "Our JPG compression uses advanced algorithms to analyze and reduce image file size while maintaining visual quality. It works by optimizing the image's data structure and removing redundant information that's less visible to the human eye, resulting in smaller file sizes without noticeable quality loss."
    },
    {
      question: "Is there a file size limit for compression?",
      answer: "We support files up to 100MB each. For larger files, you can split them into smaller parts or contact us for enterprise solutions. There's no limit to how many files you can compress, and our batch processing feature lets you compress multiple images simultaneously."
    },
    {
      question: "Will I lose image quality after compression?",
      answer: "Our intelligent compression algorithm maintains an optimal balance between file size reduction and image quality. While some reduction in file size is achieved through minimal quality adjustment, the changes are typically imperceptible to the human eye. You can also adjust the compression level to meet your specific needs."
    },
    {
      question: "Is it safe to upload my images?",
      answer: "Absolutely! We prioritize your privacy and security. All compression happens locally in your browser - your images never leave your device or get uploaded to any server. We don't store any of your images or personal data."
    },
    {
      question: "What image formats do you support?",
      answer: "Currently, we specialize in JPG/JPEG compression. This focus allows us to provide the best possible compression results for these formats. We're working on adding support for other formats like PNG, WebP, and AVIF in future updates."
    },
    {
      question: "How much does it cost to use JPG Compressor?",
      answer: "JPG Compressor is completely free to use! There are no hidden fees, subscriptions, or limits on the number of images you can compress. We believe in providing high-quality image compression tools accessible to everyone."
    },
    {
      question: "Can I compress multiple images at once?",
      answer: "Yes! Our batch processing feature allows you to compress multiple images simultaneously. Simply drag and drop all your images into the upload area, and our tool will process them in parallel, saving you valuable time."
    },
    {
      question: "How do I download my compressed images?",
      answer: "After compression, you can download individual images by clicking the 'Download' button next to each image. For multiple images, use the 'Download All' button to get a ZIP file containing all your compressed images."
    },
    {
      question: "Do you offer an API for developers?",
      answer: "We're currently developing an API for developers who need to integrate our compression technology into their applications. Sign up for our newsletter to be notified when the API becomes available."
    },
    {
      question: "What makes JPG Compressor different from other tools?",
      answer: "JPG Compressor stands out through its combination of advanced compression technology, user privacy (browser-based processing), unlimited free usage, and exceptional compression results. Our tool is also continuously updated with the latest compression algorithms."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-secondary-600">
          Everything you need to know about JPG Compressor
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-secondary-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left bg-white hover:bg-secondary-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-medium text-secondary-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-secondary-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-secondary-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white border-t border-secondary-100">
                <p className="text-secondary-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ Schema JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </div>
  );
};

export default FAQ;
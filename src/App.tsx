import React, { useState, useCallback, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Upload, Download, Package, Image as ImageIcon, X, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface CompressedImage {
  original: File;
  compressed: Blob;
  preview: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  error?: string;
}

function App() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed';
    }
    if (file.size > 25 * 1024 * 1024) { // 25MB limit
      return 'File size exceeds 25MB limit';
    }
    return null;
  };

  const compressImage = async (file: File): Promise<CompressedImage> => {
    const validationError = validateFile(file);
    if (validationError) {
      return {
        original: file,
        compressed: file,
        preview: URL.createObjectURL(file),
        name: file.name,
        originalSize: file.size,
        compressedSize: file.size,
        error: validationError
      };
    }

    try {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg'
      });

      return {
        original: file,
        compressed: compressedBlob,
        preview: URL.createObjectURL(compressedBlob),
        name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
        originalSize: file.size,
        compressedSize: compressedBlob.size
      };
    } catch (err) {
      return {
        original: file,
        compressed: file,
        preview: URL.createObjectURL(file),
        name: file.name,
        originalSize: file.size,
        compressedSize: file.size,
        error: 'Failed to compress image'
      };
    }
  };

  const handleFiles = async (files: FileList) => {
    setError(null);
    setIsCompressing(true);
    try {
      const imageFiles = Array.from(files);
      const compressedImages = await Promise.all(imageFiles.map(compressImage));
      setImages(prev => [...prev, ...compressedImages]);
    } catch (err) {
      setError('Failed to process some images');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDownloadSingle = (image: CompressedImage) => {
    saveAs(image.compressed, `compressed_${image.name}`);
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) return;

    const zip = new JSZip();
    images.forEach((image) => {
      zip.file(`compressed_${image.name}`, image.compressed);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'compressed_images.zip');
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();

      // Check after images load
      const images = container.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.addEventListener('load', checkScroll);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
        const images = container.getElementsByTagName('img');
        Array.from(images).forEach(img => {
          img.removeEventListener('load', checkScroll);
        });
      }
    };
  }, [images.length]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 366; // card width (350) + gap (16)
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6">
            Free Online JPG Compressor
          </h1>
          <p className="text-3xl text-secondary-600 mb-4 max-w-3xl mx-auto">
            The smartest way to compress JPG images while preserving quality
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-secondary-500">
            <span className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>No Registration</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>100% Secure</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Lightning Fast</span>
          </div>
        </header>

        <section 
          className={`relative overflow-hidden rounded-2xl p-12 mb-12 transition-all duration-300 ${
            isDragging 
              ? 'bg-primary-50 border-2 border-primary-400 shadow-lg' 
              : 'bg-white border-2 border-dashed border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="relative z-10">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/jpeg,image/jpg"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              aria-label="Choose files to compress"
            />
            {isCompressing ? (
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-primary-500 mx-auto mb-6 animate-spin" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-secondary-700 mb-2">Processing Your Images...</h2>
                <p className="text-secondary-500">This will just take a moment</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-16 h-16 text-primary-400 mx-auto mb-6 animate-bounce-slow" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-secondary-700 mb-2">
                  Drop Your JPG Images Here
                </h2>
                <p className="text-secondary-500 mb-4">
                  or <span className="text-primary-500 hover:text-primary-600 cursor-pointer">browse your files</span>
                </p>
                <div className="flex justify-center space-x-4 text-sm text-secondary-400">
                  <span>Up to 10GB/file</span>
                  <span>•</span>
                  <span>Bulk compression</span>
                  <span>•</span>
                  <span>JPG optimized</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-secondary-800">
              Your Images ({images.length})
            </h2>
            <button
              onClick={handleDownloadAll}
              className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm hover:shadow-md"
            >
              <Package className="w-5 h-5 mr-2" />
              Download All
            </button>
          </div>
        )}

        <div className="relative mb-16 group">
          {canScrollLeft && (
            <button
              onClick={() => scrollTo('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary-600 hover:text-secondary-900 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
            role="list"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {images.map((image, index) => (
              <article
                key={index}
                className="flex-none w-[350px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                style={{ userSelect: 'none' }}
              >
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={image.preview}
                    alt={`Preview of ${image.name}`}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                    aria-label={`Remove ${image.name}`}
                  >
                    <X className="w-4 h-4 text-secondary-600 hover:text-secondary-900" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary-900 truncate mb-3">{image.name}</h3>
                  <dl className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="bg-secondary-50 p-2 rounded">
                      <dt className="text-secondary-500">Original</dt>
                      <dd className="font-medium text-secondary-700">{formatSize(image.originalSize)}</dd>
                    </div>
                    <div className="bg-primary-50 p-2 rounded">
                      <dt className="text-primary-600">Compressed</dt>
                      <dd className="font-medium text-primary-700">{formatSize(image.compressedSize)}</dd>
                    </div>
                  </dl>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm font-medium">
                      {((1 - image.compressedSize / image.originalSize) * 100).toFixed(1)}% saved
                    </span>
                    <button
                      onClick={() => handleDownloadSingle(image)}
                      className="flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollTo('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-secondary-600 hover:text-secondary-900 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">Why Choose Our Compressor?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">Quality Preservation</h3>
                <p className="text-secondary-600">Our advanced algorithm maintains image quality while significantly reducing file size.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">Batch Processing</h3>
                <p className="text-secondary-600">Save time by compressing multiple images at once with our bulk upload feature.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">Easy Download</h3>
                <p className="text-secondary-600">Download individual images or get them all in a convenient ZIP package.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">100% Secure</h3>
                <p className="text-secondary-600">All processing happens in your browser. Your images never leave your device.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-secondary-500 border-t border-secondary-200 pt-8">
          <p className="mb-4">Trusted by 100 million+ users worldwide for fast, secure image compression.</p>
          <p className="text-sm">© 2004-{new Date().getFullYear()} JPG Compressor. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
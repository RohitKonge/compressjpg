import React, { useState, useCallback, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Upload, Download, Package, Image as ImageIcon, X, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Home from './components/Home';

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
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
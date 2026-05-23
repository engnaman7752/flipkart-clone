import React, { useState, useRef, useCallback } from 'react';

const ImageSearchModal = ({ isOpen, onClose, onSearch }) => {
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const resetState = () => {
    setPreview(null);
    setResults([]);
    setIsAnalyzing(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const analyzeImage = useCallback(async (imgElement) => {
    setIsAnalyzing(true);
    setResults([]);
    try {
      // Lazy-load TensorFlow.js and MobileNet only when needed
      const tf = await import('@tensorflow/tfjs');
      const mobilenet = await import('@tensorflow-models/mobilenet');

      const model = await mobilenet.load();
      const predictions = await model.classify(imgElement);

      // Extract clean keywords from MobileNet labels
      const keywords = predictions.map(p => {
        // MobileNet returns labels like "running shoe, sneaker" — take first word/phrase
        const label = p.className.split(',')[0].trim().toLowerCase();
        return { label, confidence: Math.round(p.probability * 100) };
      });

      setResults(keywords);
    } catch (err) {
      console.error('Image analysis failed:', err);
      setResults([{ label: 'analysis failed — try again', confidence: 0 }]);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setResults([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoad = () => {
    if (imageRef.current && preview) {
      analyzeImage(imageRef.current);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSearch = (keyword) => {
    onSearch(keyword);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-[480px] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2874f0] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h2 className="text-white font-semibold text-[15px]">Search by Image</h2>
              <p className="text-blue-100 text-[11px]">Powered by AI • Runs in your browser</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-white text-2xl opacity-80 hover:opacity-100">×</button>
        </div>

        <div className="p-5">
          {/* Upload Area */}
          {!preview ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-[#2874f0] bg-blue-50' : 'border-gray-300 hover:border-[#2874f0] hover:bg-gray-50'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12zm-3 0h.008v.008H12V12zm-4.5 2.25h.008v.008H7.5v-.008z" />
              </svg>
              <p className="text-[14px] font-medium text-gray-700 mb-1">Drag & drop an image here</p>
              <p className="text-[12px] text-gray-500 mb-4">or click to browse</p>
              <button
                type="button"
                className="bg-[#2874f0] text-white text-[13px] font-medium px-5 py-2 rounded-sm hover:bg-[#1a5dc7] transition-colors"
              >
                Upload Photo
              </button>
              <p className="text-[11px] text-gray-400 mt-3">Also works with camera on mobile</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div>
              {/* Preview */}
              <div className="relative mb-4">
                <img
                  ref={imageRef}
                  src={preview}
                  alt="Uploaded"
                  className="w-full h-48 object-contain bg-gray-50 rounded-lg border"
                  crossOrigin="anonymous"
                  onLoad={handleImageLoad}
                />
                <button
                  onClick={resetState}
                  className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow text-gray-600 hover:text-red-500 text-lg"
                >
                  ×
                </button>
              </div>

              {/* Analyzing state */}
              {isAnalyzing && (
                <div className="flex items-center gap-3 py-4 justify-center">
                  <svg className="animate-spin h-5 w-5 text-[#2874f0]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-[13px] text-gray-600">AI is analyzing your image...</span>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && !isAnalyzing && (
                <div>
                  <p className="text-[12px] font-semibold text-[#878787] uppercase tracking-wide mb-3">
                    Detected — click to search:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearch(r.label)}
                        className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#2874f0] text-[13px] font-medium px-3 py-2 rounded-full hover:bg-[#2874f0] hover:text-white transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {r.label}
                        <span className="text-[10px] opacity-60">{r.confidence}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSearchModal;

import React from 'react';
import { ExternalLink, Construction } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const VisionBoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create Your Vision Board</h2>
          
          <p className="text-gray-600">
            A vision board is a visual representation of your goals, values, and the future you want to build. 
            It's personal, creative, and doesn't have to be about academics or career.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Option 1: Google Slides</h3>
              <ol className="space-y-2 text-gray-600">
                <li>1. Go to <a href="https://slides.new" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">slides.new</a></li>
                <li>2. Click File → Page setup → Custom and choose 8.5 x 11 or 11 x 8.5 inches</li>
                <li>3. Add images (Insert → Image → Search the web)</li>
                <li>4. Add text boxes with quotes, goals, or words that matter to you</li>
                <li>5. Click File → Download → JPEG or PDF, and save your file</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Option 2: Canva</h3>
              <ol className="space-y-2 text-gray-600">
                <li>1. Go to <a href="https://canva.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">canva.com</a> and log in or create a free account</li>
                <li>2. Search for "vision board" or "poster" to start</li>
                <li>3. Add images, words, and designs that reflect your goals</li>
                <li>4. Click Share → Download, select PNG or PDF, and save your file</li>
              </ol>
            </div>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
            <h4 className="font-medium text-emerald-800">Ready to share your vision board?</h4>
            <p className="mt-2 text-emerald-700">
              Upload your vision board to our community Padlet wall. Your post will be anonymous and reviewed before being shared.
            </p>
            <div className="mt-4">
              <a 
                href="https://padlet.com/suhani3/dear-future-me-az8l0z5n3ovuib6a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-700 hover:text-emerald-800"
              >
                <Button>
                  Open Padlet <ExternalLink size={16} className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-center py-12">
          <Construction size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">Coming Soon: Under Construction</h3>
          <p className="text-gray-600">
            Our community vision board wall is being built. Check back soon!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default VisionBoard;
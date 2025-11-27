import React, { useState, useEffect } from 'react';
import { PenLine, Save, Copy, Check } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

const LetterToSelf: React.FC = () => {
  const { user } = useAuth();
  const [letterContent, setLetterContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [letterCount, setLetterCount] = useState(56);

  useEffect(() => {
    fetchLetterCount();
  }, []);

  const fetchLetterCount = async () => {
    try {
      const { data, error } = await supabase
        .from('letter_counts')
        .select('copy_count')
        .limit(1);

      if (error) {
        console.error('Error fetching letter count:', error);
        return;
      }

      if (data && data.length > 0) {
        setLetterCount(data[0].copy_count || 56);
      } else {
        // If no record exists, try to create one with initial count of 56
        const { error: insertError } = await supabase
          .from('letter_counts')
          .insert([{ copy_count: 56 }]);
        
        if (!insertError) {
          setLetterCount(56);
        }
      }
    } catch (error) {
      console.error('Error fetching letter count:', error);
    }
  };

  const incrementLetterCount = async () => {
    try {
      const { error } = await supabase.rpc('increment_letter_count');
      if (error) throw error;
      setLetterCount(prev => prev + 1);
    } catch (error) {
      console.error('Error incrementing letter count:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setLetterContent(text);
    setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
  };

  const handleSave = async () => {
    if (!letterContent.trim()) {
      setError('Please write something in your letter before saving');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const letterData: any = { text: letterContent.trim() };
      
      // If user is authenticated, save with user_id
      if (user) {
        letterData.user_id = user.id;
      }
      
      const { error: dbError } = await supabase
        .from('letters')
        .insert([letterData]);
        
      if (dbError) throw dbError;
      
      setSuccess(true);
      setShowCopyPopup(true);
      setCopied(false);
    } catch (error) {
      console.error('Error saving letter:', error);
      setError('Failed to save your letter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letterContent);
      setCopied(true);
      await incrementLetterCount();
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Letter Count Display */}
      <Card>
        <div className="text-center py-6">
          <h3 className="text-2xl font-bold text-emerald-600 mb-2">{letterCount.toLocaleString()}</h3>
          <p className="text-gray-600">Letters copied and saved by our community</p>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center">
            <PenLine size={24} className="text-emerald-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Letter to Your Future Self</h2>
          </div>
          
          <p className="text-gray-600">
            Write a letter to your future self about what truly matters in your life.
            What would you want to remind yourself about when you're feeling overwhelmed?
          </p>
          
          {user && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
              <p className="text-sm text-emerald-700">
                <strong>Signed in:</strong> Your letter will be saved to your account so you can access it anytime from your dashboard.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="letter-content" className="block text-sm font-medium text-gray-700">
              Your Letter
            </label>
            <textarea
              id="letter-content"
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Dear Future Me,&#10;&#10;When things get overwhelming, I want you to remember that..."
              value={letterContent}
              onChange={handleChange}
            />
            <div className="text-xs text-gray-500 flex justify-end">
              {wordCount} words
            </div>
          </div>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Copy className="h-5 w-5 text-amber-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  After saving, you'll be able to copy your letter to keep it somewhere safe.
                  Read it whenever you need encouragement or perspective.
                </p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}
          
          {success && !showCopyPopup && (
            <div className="text-emerald-600 text-sm">
              Your letter was saved successfully!
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              isLoading={isSubmitting}
              disabled={!letterContent.trim()}
            >
              <Save size={16} className="mr-2" />
              Save Letter
            </Button>
          </div>
        </div>
      </Card>

      {showCopyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Your Letter</h3>
            <p className="text-gray-600 mb-4">
              Copy your letter to keep it somewhere safe. You can read it whenever you need encouragement or perspective.
              {user && (
                <span className="block mt-2 text-emerald-600 font-medium">
                  Your letter is also saved in your dashboard!
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex-1 bg-gray-100 p-3 rounded border font-mono text-sm max-h-48 overflow-y-auto">
                {letterContent}
              </div>
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="flex items-center"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>
            <Button
              onClick={() => {
                if (copied) {
                  setShowCopyPopup(false);
                  setLetterContent('');
                } else {
                  handleCopy();
                }
              }}
              fullWidth
            >
              {copied ? 'Close' : 'Copy & Close'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterToSelf;
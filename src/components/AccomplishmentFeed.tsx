import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Copy, Check } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import supabase from '../supabase/client';

interface Accomplishment {
  id: string;
  content: string;
  created_at: string;
  delete_key?: string;
}

const AccomplishmentFeed: React.FC = () => {
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [newAccomplishment, setNewAccomplishment] = useState('');
  const [deleteKey, setDeleteKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deletePromptKey, setDeletePromptKey] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAccomplishments();
  }, []);

  async function fetchAccomplishments() {
    try {
      const { data, error } = await supabase
        .from('accomplishments')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setAccomplishments(data || []);
    } catch (error: any) {
      console.error('Error fetching accomplishments:', error);
      setError('Failed to load accomplishments. Please try again.');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!newAccomplishment.trim()) {
      setError('Please enter an accomplishment');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate a random delete key
      const randomKey = Math.random().toString(36).substring(2, 15);
      
      const { error: insertError } = await supabase
        .from('accomplishments')
        .insert([{ 
          content: newAccomplishment.trim(),
          delete_key: randomKey
        }]);
        
      if (insertError) throw insertError;
      
      setNewAccomplishment('');
      setSuccess(true);
      setDeleteKey(randomKey);
      setShowCopyPopup(true);
      setCopied(false);
      
      // Refresh the list
      await fetchAccomplishments();
    } catch (error: any) {
      console.error('Error submitting accomplishment:', error);
      if (error.message.includes('inappropriate language')) {
        setError('Your submission contains inappropriate language. Please revise and try again.');
      } else {
        setError(error.message || 'Failed to submit your accomplishment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const initiateDelete = (deleteKey: string) => {
    setItemToDelete(deleteKey);
    setDeletePromptKey('');
    setShowDeletePrompt(true);
  };

  async function handleDelete() {
    if (!itemToDelete || !deletePromptKey) return;

    try {
      const { data: deleteResult, error: deleteError } = await supabase
        .from('accomplishments')
        .delete()
        .eq('delete_key', itemToDelete)
        .select();

      if (deleteError) throw deleteError;

      // Refresh the list after successful deletion
      await fetchAccomplishments();
      setShowDeletePrompt(false);
      setItemToDelete(null);
      setDeletePromptKey('');
    } catch (error: any) {
      console.error('Error deleting accomplishment:', error);
      setError('Failed to delete the accomplishment. Please check your delete key and try again.');
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deleteKey);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Sparkles className="mr-2 text-yellow-500" size={24} />
            Non-Resume Accomplishments
          </h2>
          
          <p className="text-gray-600">
            Share something you're proud of that would never go on your resume. It could be a small act of kindness,
            a personal growth moment, or anything meaningful to you that wouldn't impress a hiring manager.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accomplishment" className="block text-sm font-medium text-gray-700 mb-1">
                Your accomplishment
              </label>
              <textarea
                id="accomplishment"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="I'm proud of..."
                value={newAccomplishment}
                onChange={(e) => setNewAccomplishment(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button type="submit" isLoading={isSubmitting}>
                Share Anonymously
              </Button>
            </div>
          </form>
        </div>
      </Card>
      
      {showCopyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Your Delete Key</h3>
            <p className="text-gray-600 mb-4">
              Copy this key to delete your accomplishment later. Keep it safe - you won't be able to see it again!
            </p>
            <div className="flex items-center space-x-2 mb-6">
              <code className="flex-1 bg-gray-100 p-3 rounded border font-mono text-sm">
                {deleteKey}
              </code>
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

      {showDeletePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Delete Key</h3>
            <p className="text-gray-600 mb-4">
              Please enter your delete key to remove this accomplishment.
            </p>
            <input
              type="text"
              value={deletePromptKey}
              onChange={(e) => setDeletePromptKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-4"
              placeholder="Enter your delete key"
            />
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowDeletePrompt(false)}
                variant="secondary"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                fullWidth
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-800">Anonymous Accomplishments</h3>
        
        {accomplishments.length === 0 ? (
          <div className="text-gray-500 italic">
            No accomplishments shared yet. Be the first!
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {accomplishments.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800">{item.content}</p>
                {item.delete_key && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => initiateDelete(item.delete_key!)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccomplishmentFeed;
import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import supabase from '../supabase/client';

type SubmissionTable = 'accomplishments' | 'thanksgiving_gratitude';

interface CommunitySubmissionFeedProps {
  tableName: SubmissionTable;
  title: string;
  description: string;
  textareaLabel: string;
  placeholder: string;
  submitButtonLabel: string;
  emptyState: string;
  listTitle: string;
  entryNoun: string;
  icon?: React.ReactNode;
}

interface Submission {
  id: string;
  content: string;
  created_at: string;
  delete_key?: string | null;
}

const CommunitySubmissionFeed: React.FC<CommunitySubmissionFeedProps> = ({
  tableName,
  title,
  description,
  textareaLabel,
  placeholder,
  submitButtonLabel,
  emptyState,
  listTitle,
  entryNoun,
  icon,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [newSubmission, setNewSubmission] = useState('');
  const [deleteKey, setDeleteKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deletePromptKey, setDeletePromptKey] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      setError(`Failed to load ${entryNoun}s. Please try again.`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!newSubmission.trim()) {
      setError(`Please enter your ${entryNoun}`);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const randomKey = Math.random().toString(36).substring(2, 15);
      
      const { error: insertError } = await supabase
        .from(tableName)
        .insert([{ 
          content: newSubmission.trim(),
          delete_key: randomKey
        }]);
        
      if (insertError) throw insertError;
      
      setNewSubmission('');
      setDeleteKey(randomKey);
      setShowCopyPopup(true);
      setCopied(false);
      
      await fetchSubmissions();
    } catch (error: any) {
      console.error('Error submitting entry:', error);
      if (error.message?.includes('inappropriate language')) {
        setError('Your submission contains inappropriate language. Please revise and try again.');
      } else {
        setError(error.message || `Failed to submit your ${entryNoun}. Please try again.`);
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
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('delete_key', itemToDelete);

      if (deleteError) throw deleteError;

      await fetchSubmissions();
      setShowDeletePrompt(false);
      setItemToDelete(null);
      setDeletePromptKey('');
    } catch (error: any) {
      console.error('Error deleting submission:', error);
      setError(`Failed to delete the ${entryNoun}. Please check your delete key and try again.`);
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
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h2>
          
          <p className="text-gray-600">
            {description}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor={`${tableName}-submission`} className="block text-sm font-medium text-gray-700 mb-1">
                {textareaLabel}
              </label>
              <textarea
                id={`${tableName}-submission`}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={placeholder}
                value={newSubmission}
                onChange={(e) => setNewSubmission(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button type="submit" isLoading={isSubmitting}>
                {submitButtonLabel}
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
              Copy this key to delete your submission later. Keep it safe - you won't be able to see it again!
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
              Please enter your delete key to remove this submission.
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
        <h3 className="text-xl font-medium text-gray-800">{listTitle}</h3>
        
        {submissions.length === 0 ? (
          <div className="text-gray-500 italic">
            {emptyState}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((item) => (
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

export default CommunitySubmissionFeed;

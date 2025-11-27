import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import supabase from '../supabase/client';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    content: '',
    category: 'general',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'suggestion', label: 'Feature Suggestion' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'support', label: 'Support Request' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      setError('Please enter your feedback');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('feedback')
        .insert([{
          feedback_content: formData.content.trim(),
          category: formData.category,
          email: formData.email.trim() || null
        }]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ content: '', category: 'general', email: '' });
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <div className="text-center py-12">
              <CheckCircle className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your feedback has been submitted successfully. We appreciate you taking the time to help us improve Dear Future Me.
              </p>
              <Button onClick={() => setSuccess(false)}>
                Submit More Feedback
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Send Feedback</h1>
          <p className="text-gray-600 mt-2">
            Help us improve Dear Future Me by sharing your thoughts, suggestions, or reporting issues.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-6 w-6 text-emerald-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Your Feedback</h2>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="content"
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Please share your feedback, suggestions, or describe any issues you've encountered..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Provide your email if you'd like us to follow up with you
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-700">
                Your feedback is anonymous unless you choose to provide your email. 
                We read every submission and use your input to improve the platform.
              </p>
            </div>

            <Button type="submit" isLoading={submitting} fullWidth>
              <Send size={16} className="mr-2" />
              Send Feedback
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, Star, User } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

interface Testimonial {
  testimonial_id: string;
  testimonial_content: string;
  author_name: string;
  created_at: string;
  is_approved: boolean;
}

const TestimonialsList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Stories</h2>
          <p className="text-gray-600 mt-2">
            Real experiences from our community members
          </p>
        </div>
        <Link to="/testimonials/new">
          <Button>
            <Plus size={16} className="mr-2" />
            Share Your Story
          </Button>
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
            <p className="text-gray-600 mb-4">
              Be the first to share your experience with our community.
            </p>
            <Link to="/testimonials/new">
              <Button>Share Your Story</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.testimonial_id}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900">
                      {testimonial.author_name || 'Anonymous'}
                    </h4>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">"{testimonial.testimonial_content}"</p>
                  <p className="text-sm text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const NewTestimonial: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          user_id: user?.id || null,
          testimonial_content: content.trim(),
          author_name: authorName.trim() || null,
          is_approved: true
        }]);

      if (error) throw error;

      setSuccess(true);
      setContent('');
      setAuthorName('');
      
      setTimeout(() => {
        navigate('/testimonials');
      }, 2000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card>
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you!</h3>
          <p className="text-gray-600 mb-4">
            Your testimonial has been submitted and is pending approval.
          </p>
          <Link to="/testimonials">
            <Button>View All Testimonials</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Share Your Story</h2>
        <p className="text-gray-600 mt-2">
          Help others by sharing how Dear Future Me has impacted your life
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              id="author_name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Leave blank to remain anonymous"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Your Experience
            </label>
            <textarea
              id="content"
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Share how Dear Future Me has helped you, what you've learned, or how it's impacted your perspective..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-sm text-amber-700">
              Your testimonial will be reviewed before being published to ensure it meets our community guidelines.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" isLoading={submitting}>
              Submit Testimonial
            </Button>
            <Link to="/testimonials">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<TestimonialsList />} />
          <Route path="/new" element={<NewTestimonial />} />
        </Routes>
      </div>
    </div>
  );
};

export default Testimonials;
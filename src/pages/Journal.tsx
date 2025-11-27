import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, Calendar } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

interface JournalEntry {
  journal_id: string;
  title: string;
  content: string;
  entry_date: string;
  is_public: boolean;
}

const Journal: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_public: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', user?.id)
        .order('entry_date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setSubmitting(true);
    try {
      if (editingEntry) {
        const { error } = await supabase
          .from('journals')
          .update({
            title: formData.title || null,
            content: formData.content,
            is_public: formData.is_public,
            updated_at: new Date().toISOString()
          })
          .eq('journal_id', editingEntry.journal_id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('journals')
          .insert([{
            user_id: user?.id,
            title: formData.title || null,
            content: formData.content,
            is_public: formData.is_public
          }]);

        if (error) throw error;
      }

      setFormData({ title: '', content: '', is_public: false });
      setShowForm(false);
      setEditingEntry(null);
      fetchEntries();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title || '',
      content: entry.content,
      is_public: entry.is_public
    });
    setShowForm(true);
  };

  const handleDelete = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('journal_id', entryId);

      if (error) throw error;
      fetchEntries();
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingEntry(null);
    setFormData({ title: '', content: '', is_public: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Journal</h1>
            <p className="text-gray-600 mt-2">
              Capture your thoughts, feelings, and experiences
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={16} className="mr-2" />
            New Entry
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
              </h3>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title (optional)
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Give your entry a title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={8}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="What's on your mind today?"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="is_public"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  checked={formData.is_public}
                  onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                />
                <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
                  Make this entry public (others can read it)
                </label>
              </div>

              <div className="flex space-x-3">
                <Button type="submit" isLoading={submitting}>
                  {editingEntry ? 'Update Entry' : 'Save Entry'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-6">
          {entries.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
                <p className="text-gray-600 mb-4">
                  Start your journaling journey by writing your first entry.
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus size={16} className="mr-2" />
                  Write First Entry
                </Button>
              </div>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.journal_id}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {entry.title || 'Untitled Entry'}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar size={14} className="mr-1" />
                      {new Date(entry.entry_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {entry.is_public && (
                        <span className="ml-2 flex items-center text-emerald-600">
                          <Eye size={14} className="mr-1" />
                          Public
                        </span>
                      )}
                      {!entry.is_public && (
                        <span className="ml-2 flex items-center text-gray-500">
                          <EyeOff size={14} className="mr-1" />
                          Private
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit3 size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(entry.journal_id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
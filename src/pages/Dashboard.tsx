import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageSquare, User, Plus, FileText, ClipboardList } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

interface DashboardStats {
  journalCount: number;
  letterCount: number;
  recentJournals: Array<{
    journal_id: string;
    title: string;
    entry_date: string;
    content: string;
  }>;
  recentLetters: Array<{
    id: string;
    text: string;
    created_at: string;
  }>;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    journalCount: 0,
    letterCount: 0,
    recentJournals: [],
    recentLetters: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch journals
      const { data: journals, error: journalError } = await supabase
        .from('journals')
        .select('journal_id, title, entry_date, content')
        .eq('user_id', user?.id)
        .order('entry_date', { ascending: false })
        .limit(3);

      if (journalError) throw journalError;

      const { count: journalCount } = await supabase
        .from('journals')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Fetch letters (if user has any saved)
      const { data: letters, error: letterError } = await supabase
        .from('letters')
        .select('id, text, created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (letterError && letterError.code !== 'PGRST116') throw letterError;

      const { count: letterCount } = await supabase
        .from('letters')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      setStats({
        journalCount: journalCount || 0,
        letterCount: letterCount || 0,
        recentJournals: journals || [],
        recentLetters: letters || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.name || 'Friend'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your journey of self-reflection and growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card className="text-center">
            <BookOpen className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Journal Entries</h3>
            <p className="text-3xl font-bold text-emerald-600">{stats.journalCount}</p>
          </Card>

          <Card className="text-center">
            <FileText className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">Letters Saved</h3>
            <p className="text-3xl font-bold text-emerald-600">{stats.letterCount}</p>
          </Card>

          <Link to="/journal" className="block">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <PenTool className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">New Entry</h3>
              <p className="text-gray-600">Write today</p>
            </Card>
          </Link>

          <Link to="/surveys" className="block">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <ClipboardList className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Surveys</h3>
              <p className="text-gray-600">Pre & Post</p>
            </Card>
          </Link>

          <Link to="/profile" className="block">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <User className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <p className="text-gray-600">Manage account</p>
            </Card>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Recent Journal Entries">
            {stats.recentJournals.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No journal entries yet</p>
                <Link to="/journal">
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Write Your First Entry
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentJournals.map((journal) => (
                  <div key={journal.journal_id} className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-medium text-gray-900">
                      {journal.title || 'Untitled Entry'}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(journal.entry_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {journal.content.substring(0, 100)}...
                    </p>
                  </div>
                ))}
                <Link to="/journal">
                  <Button variant="outline" fullWidth>
                    View All Entries
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          <Card title="Recent Letters to Future Self">
            {stats.recentLetters.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No letters saved yet</p>
                <Link to="/explore/letter">
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Write Your First Letter
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentLetters.map((letter) => (
                  <div key={letter.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(letter.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {letter.text.substring(0, 150)}...
                    </p>
                  </div>
                ))}
                <Link to="/explore/letter">
                  <Button variant="outline" fullWidth>
                    Write Another Letter
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8">
          <Card title="Quick Actions">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link to="/explore">
                <Button variant="outline" fullWidth>
                  Explore Activities
                </Button>
              </Link>
              <Link to="/testimonials/new">
                <Button variant="outline" fullWidth>
                  Share a Testimonial
                </Button>
              </Link>
              <Link to="/feedback">
                <Button variant="outline" fullWidth>
                  Send Feedback
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" fullWidth>
                  Learn About Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
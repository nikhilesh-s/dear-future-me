import React, { useState, useEffect } from 'react';
import { Download, Lock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import supabase from '../supabase/client';

interface DataCounts {
  accomplishments: number;
  visionBoards: number;
  letters: number;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [dataCounts, setDataCounts] = useState<DataCounts>({
    accomplishments: 0,
    visionBoards: 0,
    letters: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simple password authentication for demo purposes
  // In a real app, use proper authentication with Supabase Auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just for demonstration - in a real app use proper auth
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
      fetchDataCounts();
    } else {
      setError('Invalid password');
    }
  };

  const fetchDataCounts = async () => {
    setIsLoading(true);
    try {
      // Get counts from each table
      const [accomplishmentsCount, visionBoardsCount, lettersCount] = await Promise.all([
        supabase.from('accomplishments').select('id', { count: 'exact', head: true }),
        supabase.from('vision_boards').select('id', { count: 'exact', head: true }),
        supabase.from('letters').select('id', { count: 'exact', head: true })
      ]);

      setDataCounts({
        accomplishments: accomplishmentsCount.count || 0,
        visionBoards: visionBoardsCount.count || 0,
        letters: lettersCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching data counts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadData = async (table: string) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');
        
      if (error) throw error;
      
      if (data) {
        // Convert to CSV
        const replacer = (key: string, value: any) => value === null ? '' : value;
        const header = Object.keys(data[0] || {});
        const csv = [
          header.join(','),
          ...data.map(row => 
            header.map(fieldName => 
              JSON.stringify(row[fieldName], replacer)
            ).join(',')
          )
        ].join('\r\n');

        // Create download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `${table}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error(`Error downloading ${table}:`, error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600">Enter the admin password to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" fullWidth>
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage and export data from Dear Future Me.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Accomplishments</h2>
            <p className="text-3xl font-bold text-emerald-600 mb-4">
              {isLoading ? '...' : dataCounts.accomplishments}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Non-resume accomplishments shared by students
            </p>
            <Button 
              onClick={() => downloadData('accomplishments')}
              variant="secondary"
              fullWidth
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Vision Boards</h2>
            <p className="text-3xl font-bold text-emerald-600 mb-4">
              {isLoading ? '...' : dataCounts.visionBoards}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Value-based vision boards created
            </p>
            <Button 
              onClick={() => downloadData('vision_boards')}
              variant="secondary"
              fullWidth
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Letters</h2>
            <p className="text-3xl font-bold text-emerald-600 mb-4">
              {isLoading ? '...' : dataCounts.letters}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Letters written to future selves
            </p>
            <Button 
              onClick={() => downloadData('letters')}
              variant="secondary"
              fullWidth
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Tools</h2>
            
            <div className="space-y-4">
              <div>
                <Button onClick={() => fetchDataCounts()}>
                  Refresh Data
                </Button>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      Remember that all data is anonymous. Handle it ethically and in accordance with your institution's privacy policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
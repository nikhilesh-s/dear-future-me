import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Bell, Save, Edit3 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  notifications_enabled: boolean;
}

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    notifications_enabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfileData({
          name: data.name || '',
          email: data.email || user?.email || '',
          phone: data.phone || '',
          notifications_enabled: data.notifications_enabled ?? true
        });
      } else {
        // Create profile if it doesn't exist
        setProfileData({
          name: user?.user_metadata?.name || '',
          email: user?.email || '',
          phone: '',
          notifications_enabled: true
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          notifications_enabled: profileData.notifications_enabled,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <Button
              variant="outline"
              onClick={() => setEditing(!editing)}
            >
              <Edit3 size={16} className="mr-2" />
              {editing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="name"
                  type="text"
                  disabled={!editing}
                  className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    !editing ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="email"
                  type="email"
                  disabled={!editing}
                  className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    !editing ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (for weekly reminders)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="phone"
                  type="tel"
                  disabled={!editing}
                  className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    !editing ? 'bg-gray-50 text-gray-500' : ''
                  }`}
                  placeholder="(555) 123-4567"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="notifications"
                type="checkbox"
                disabled={!editing}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                checked={profileData.notifications_enabled}
                onChange={(e) => setProfileData({ ...profileData, notifications_enabled: e.target.checked })}
              />
              <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                <Bell className="inline h-4 w-4 mr-1" />
                Enable weekly journal reminders (Fridays at 3 PM)
              </label>
            </div>

            {profileData.notifications_enabled && profileData.phone && (
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                <p className="text-sm text-emerald-700">
                  <strong>Weekly Reminders Enabled!</strong> You'll receive friendly reminders every Friday at 3 PM to check in with your mental health and use Dear Future Me. Messages will include motivational prompts to encourage regular reflection.
                </p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-sm text-green-700">
                  Profile updated successfully!
                </p>
              </div>
            )}

            {editing && (
              <div className="flex space-x-3">
                <Button onClick={handleSave} isLoading={saving}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Reminder System</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Reminders sent every Friday at 3 PM</li>
                <li>• Random motivational messages to encourage reflection</li>
                <li>• Gentle prompts to check in with your mental health</li>
                <li>• Easy opt-out anytime by unchecking notifications</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Sample reminder messages:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>"Hey there! 📝 Take a quick moment to jot down this week's highlights on Dear Future Me—your future self will thank you!"</p>
                <p>"Gentle reminder 🌱—your thoughts matter! Spend a few minutes journaling on Dear Future Me today."</p>
                <p>"Weekly reflection time! 🌙 Write it, feel it, remember it—log into Dear Future Me now."</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Statistics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="font-medium text-emerald-900">Member Since</h3>
              <p className="text-emerald-700">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Account Type</h3>
              <p className="text-blue-700">Community Member</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
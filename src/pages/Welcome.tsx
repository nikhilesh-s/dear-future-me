import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Users, BookOpen, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import AuthModal from '../components/AuthModal';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase/client';

const Welcome: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [letterCount, setLetterCount] = useState(56); // Start with 56

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <img 
            src="https://i.imgur.com/pnQkp2T.jpeg" 
            alt="Dear Future Me Logo" 
            className="h-16 w-16 rounded-full object-cover shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-emerald-900 sm:text-5xl">
          Dear Future Me
        </h1>
        
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          A safe space to reflect on future stressors, share experiences,
          and discover what truly matters beyond the resume.
        </p>

        {/* Community Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <BookOpen className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold text-emerald-600">250+</div>
              <div className="text-gray-600">Letters to Future Selves</div>
            </div>
            <div className="text-center">
              <Users className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold text-emerald-600">1,500+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold text-emerald-600">650+</div>
              <div className="text-gray-600">Stories Shared</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What to expect</h2>
          
          <ul className="text-left space-y-3 mb-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mr-3">
                <span className="text-sm font-medium">1</span>
              </div>
              <p className="text-gray-600">Complete a brief survey about future stressors</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mr-3">
                <span className="text-sm font-medium">2</span>
              </div>
              <p className="text-gray-600">Explore interactive activities for reflection and relief</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mr-3">
                <span className="text-sm font-medium">3</span>
              </div>
              <p className="text-gray-600">Share your thoughts anonymously (if you choose to)</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mr-3">
                <span className="text-sm font-medium">4</span>
              </div>
              <p className="text-gray-600">Tell us how these activities impacted your perspective</p>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/dashboard" : "/survey"}>
              <Button 
                size="lg" 
                className="group"
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            {!user && (
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setShowAuthModal(true)}
              >
                Create Account
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-emerald-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">
            Want to keep track of your journey?
          </h3>
          <p className="text-emerald-700 mb-4">
            Create an account to save your journal entries, track your progress, and get weekly reminders to reflect.
          </p>
          {!user && (
            <Button onClick={() => setShowAuthModal(true)}>
              Sign Up for Free
            </Button>
          )}
        </div>
        
        <p className="text-sm text-gray-500">
          All responses are anonymous unless you choose to create an account. This initiative aims to promote mental wellbeing and
          healthy perspectives on achievement.
        </p>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
      />
    </div>
  );
};

export default Welcome;
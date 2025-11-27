import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TabNavigation from '../components/TabNavigation';
import AccomplishmentFeed from '../components/AccomplishmentFeed';
import VisionBoard from '../components/VisionBoard';
import LetterToSelf from '../components/LetterToSelf';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Explore: React.FC = () => {
  const location = useLocation();
  
  const tabs = [
    {
      id: 'accomplishments',
      label: 'Accomplishment Feed',
      path: '/explore/accomplishments',
    },
    {
      id: 'vision-board',
      label: 'Vision Board',
      path: '/explore/vision-board',
    },
    {
      id: 'letter',
      label: 'Letter to Self',
      path: '/explore/letter',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Activities</h1>
          <p className="text-lg text-gray-600">
            Take a moment to reflect through these different activities. You can try one or all of them.
          </p>
        </div>
        
        <TabNavigation tabs={tabs} />
        
        <div className="py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/explore/accomplishments" replace />} />
            <Route path="/accomplishments" element={<AccomplishmentFeed />} />
            <Route path="/vision-board" element={<VisionBoard />} />
            <Route path="/letter" element={<LetterToSelf />} />
          </Routes>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Link to="/post-survey">
            <Button>Continue to Post-Survey</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { ExternalLink } from 'lucide-react';

interface SurveyProps {
  type: 'pre' | 'post';
}

const Survey: React.FC<SurveyProps> = ({ type }) => {
  const navigate = useNavigate();
  
  const surveys = {
    pre: 'https://neurohealthalliance.questionpro.com/t/AbYLCZ6Dsf',
    post: 'https://neurohealthalliance.questionpro.com/t/AbYLCZ6DtH'
  };
  
  const titles = {
    pre: 'Pre-Activity Survey',
    post: 'Post-Activity Reflection'
  };
  
  const descriptions = {
    pre: 'Please take a few minutes to share your thoughts about future stressors and expectations.',
    post: 'Now that you\'ve explored the activities, please share how these reflections have impacted your perspective.'
  };
  
  const nextPaths = {
    pre: '/explore',
    post: '/thank-you'
  };

  const handleOpenSurvey = () => {
    window.open(surveys[type], '_blank');
  };
  
  const handleContinue = () => {
    navigate(nextPaths[type]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{titles[type]}</h1>
        <p className="text-lg text-gray-600">{descriptions[type]}</p>
      </div>
      
      <Card>
        <div className="space-y-6">
          <p className="text-gray-700">
            Click the button below to open the survey in a new tab. Once you've completed it, return here to continue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleOpenSurvey}>
              Open Survey <ExternalLink size={16} className="ml-2" />
            </Button>
            
            <Button onClick={handleContinue} variant="secondary">
              Continue to {type === 'pre' ? 'Activities' : 'Finish'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Survey;
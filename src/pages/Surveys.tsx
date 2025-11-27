import React from 'react';
import { ExternalLink, ClipboardList } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Surveys: React.FC = () => {
  const surveys = [
    {
      id: 'pre',
      title: 'Pre-Activity Survey',
      description: 'Share your thoughts about future stressors and expectations before exploring our activities.',
      url: 'https://neurohealthalliance.questionpro.com/t/AbYLCZ6Dsf',
      color: 'emerald'
    },
    {
      id: 'post',
      title: 'Post-Activity Reflection',
      description: 'Reflect on how the activities have impacted your perspective and thoughts.',
      url: 'https://neurohealthalliance.questionpro.com/t/AbYLCZ6DtH',
      color: 'blue'
    }
  ];

  const handleOpenSurvey = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ClipboardList className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Research Surveys</h1>
          </div>
          <p className="text-lg text-gray-600">
            Help us understand the impact of our platform by participating in our research surveys.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full bg-${survey.color}-500 mr-3`}></div>
                  <h2 className="text-xl font-semibold text-gray-900">{survey.title}</h2>
                </div>
                
                <p className="text-gray-600">{survey.description}</p>
                
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This survey will open in a new tab. Your responses are anonymous and help us improve the platform.
                  </p>
                </div>
                
                <Button 
                  onClick={() => handleOpenSurvey(survey.url)}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  Open Survey
                  <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <div className="text-center py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Participation</h3>
            <p className="text-gray-600 mb-4">
              Your participation in these surveys helps us understand how our platform impacts mental health and well-being. 
              All responses are completely anonymous and used solely for research purposes.
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 text-left">
              <h4 className="font-medium text-emerald-900 mb-2">Why participate?</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Help improve mental health resources for young people</li>
                <li>• Contribute to research on stress and achievement pressure</li>
                <li>• Support the development of better reflection tools</li>
                <li>• Make a difference in your community's well-being</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Surveys;
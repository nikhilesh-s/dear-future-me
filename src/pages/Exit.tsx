import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Card from '../components/Card';
import ResourceLink from '../components/ResourceLink';

const Exit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <Heart size={48} className="text-rose-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-emerald-900">
          Thank You For Participating
        </h1>
        
        <Card className="text-left">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              We hope this experience has given you a moment to reflect on what truly matters
              beyond achievements and resume-building.
            </p>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
              <p className="text-emerald-700">
                Your worth is not defined by your achievements or career path.
                Your value comes from who you are as a person and what you care about.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mental Health Resources</h2>
            
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="p-4">
                <a 
                  href="https://neurohealthalliance.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  neurohealthalliance.org
                </a>
              </div>

              <ResourceLink
                title="Dublin Community Health Resource Center"
                address="4050 Dublin Blvd First Floor"
                phone="(925) 875-6150"
                services="Mental Health Diagnoses and Treatment"
              />

              <ResourceLink
                title="Seva Psychiatry - Dublin"
                address="3736 Fallon Rd Suite #431, Dublin, CA 94568"
                phone="(408) 320-8057"
                services="Diagnoses and Healthcare"
              />

              <ResourceLink
                title="East Bay Behavior Center"
                address="5601 Arnold Rd Suite 108"
                phone="(925) 587-1456"
                services="Individual Sessions for Treatment Goals, Therapy"
              />

              <ResourceLink
                title="Balance Hour LLC"
                address="11501 Dublin Blvd STE 200, Dublin, CA 94568"
                phone="(408) 337-2544"
                services="Virtual Counseling, Treatment, Therapy"
              />

              <ResourceLink
                title="Pivot Counseling"
                address="6444 Sierra Ct"
                phone="(925) 385-8228"
                services="Counseling, Individual and Group Therapy"
              />

              <ResourceLink
                title="Kendall Center Dublin"
                address="5601 Arnold Rd Suite 100"
                phone="(925) 833-7789"
                services="Part of the ABA Services, language/speech/ communication therapy for children with autism"
              />

              <ResourceLink
                title="Cultivate Therapy Group"
                address="11750 Dublin Blvd #101, Dublin, CA 94568"
                phone="(510) 210-1191"
                services="Therapy and Counseling"
              />

              <ResourceLink
                title="Children's Emergency Council"
                address="7421 Amarillo Road, Dublin, CA 94568"
                phone="925-828-5363"
                services="Emergency services: food, housing, 24-hour answering service for immediate needs"
              />
            </div>
            
            <div className="text-center pt-4">
              <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800">
                <span className="hover:underline">Return to Home Page</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Exit;
import React from 'react';
import { Sparkles } from 'lucide-react';
import CommunitySubmissionFeed from './CommunitySubmissionFeed';

const AccomplishmentFeed: React.FC = () => {
  return (
    <CommunitySubmissionFeed
      tableName="accomplishments"
      title="Non-Resume Accomplishments"
      description="Share something you're proud of that would never go on your resume. It could be a small act of kindness, a personal growth moment, or anything meaningful to you that wouldn't impress a hiring manager."
      textareaLabel="Your accomplishment"
      placeholder="I'm proud of..."
      submitButtonLabel="Share Anonymously"
      emptyState="No accomplishments shared yet. Be the first!"
      listTitle="Anonymous Accomplishments"
      entryNoun="accomplishment"
      icon={<Sparkles className="text-yellow-500" size={24} />}
    />
  );
};

export default AccomplishmentFeed;

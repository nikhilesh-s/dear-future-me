import React from 'react';

interface SurveyEmbedProps {
  url: string;
  title: string;
}

const SurveyEmbed: React.FC<SurveyEmbedProps> = ({ url, title }) => {
  return (
    <div className="w-full h-full">
      <iframe
        src={url}
        title={title}
        className="w-full h-[80vh] border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="origin"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      ></iframe>
    </div>
  );
};

export default SurveyEmbed;
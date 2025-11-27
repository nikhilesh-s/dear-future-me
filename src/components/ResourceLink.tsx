import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ResourceLinkProps {
  title: string;
  address?: string;
  phone?: string;
  services?: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ title, address, phone, services }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-emerald-50 transition-colors"
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 py-3 bg-gray-50">
          {address && (
            <p className="text-gray-600 text-sm mb-1">
              📍 {address}
            </p>
          )}
          {phone && (
            <p className="text-gray-600 text-sm mb-1">
              📞 <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="text-emerald-600 hover:underline">{phone}</a>
            </p>
          )}
          {services && (
            <p className="text-gray-600 text-sm">
              ✨ Services: {services}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceLink;
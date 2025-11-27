import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-gray-500 mt-12 p-4">
      <p>
        💡 Founded by <strong>NeuroHealthAlliance</strong> &nbsp;|&nbsp; 🛠️ Developed by <strong>Tri-Valley Tech</strong>
      </p>
      <p className="mt-1">© {new Date().getFullYear()} Dear Future Me</p>
    </footer>
  );
};

export default Footer;
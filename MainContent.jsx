import React, { useState } from 'react';
import SalesReportForm from './SalesReportForm';
import SavedReports from './SavedReports';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('newReport');
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('newReport')}
            className={`${
              activeTab === 'newReport'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            New Report
          </button>
          <button
            onClick={() => setActiveTab('savedReports')}
            className={`${
              activeTab === 'savedReports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Saved Reports
          </button>
        </nav>
      </div>
      
      {/* Content */}
      {activeTab === 'newReport' ? <SalesReportForm /> : <SavedReports />}
    </div>
  );
};

export default MainContent;
import React, { useState, useEffect } from 'react';
import { getSavedReports, deleteReport } from '../data/storageService';

const SavedReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Load reports from localStorage on component mount
  useEffect(() => {
    loadReports();
  }, []);
  
  const loadReports = () => {
    const savedReports = getSavedReports();
    setReports(savedReports);
  };
  
  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const success = deleteReport(reportId);
      if (success) {
        loadReports();
        if (selectedReport && selectedReport.id === reportId) {
          setSelectedReport(null);
        }
      }
    }
  };
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Saved Reports</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Reports List */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Reports</h2>
          
          {reports.length === 0 ? (
            <div className="text-gray-500 italic text-center py-6">
              No saved reports found
            </div>
          ) : (
            <div className="divide-y">
              {reports.map((report) => (
                <div key={report.id} className="py-3 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className={`text-left flex-1 hover:text-blue-600 ${selectedReport?.id === report.id ? 'text-blue-600 font-medium' : ''}`}
                  >
                    <div>{report.customerName} - {report.bookingId}</div>
                    <div className="text-xs text-gray-500">{formatDate(report.timestamp)}</div>
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <span className="sr-only">Delete</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Report Details */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Report Details</h2>
          
          {selectedReport ? (
            <div className="space-y-4">
              {/* Booking Details */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Booking Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm">Booking Type</span>
                    <div>{selectedReport.bookingType}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Date</span>
                    <div>{selectedReport.date}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Agent</span>
                    <div>{selectedReport.agentName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Region</span>
                    <div>{selectedReport.region}</div>
                  </div>
                </div>
              </div>
              
              {/* Customer Info */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm">Name</span>
                    <div>{selectedReport.customerName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Nationality</span>
                    <div>{selectedReport.customerNationality}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Mobile</span>
                    <div>{selectedReport.customerMobile}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Source</span>
                    <div>{selectedReport.source}</div>
                  </div>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Service</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm">Booking ID</span>
                    <div>{selectedReport.bookingId}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Service</span>
                    <div>{selectedReport.service}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Provider</span>
                    <div>{selectedReport.provider}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Destination</span>
                    <div>{selectedReport.destination}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Check In</span>
                    <div>{selectedReport.checkIn || '-'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Pax Number</span>
                    <div>{selectedReport.paxNumber}</div>
                  </div>
                </div>
              </div>
              
              {/* Payment Info */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Payment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm">Currency</span>
                    <div>{selectedReport.currency}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Net Rate</span>
                    <div>{selectedReport.netRate}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Selling Rate</span>
                    <div>{selectedReport.sellingRate}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Payment Method</span>
                    <div>{selectedReport.paymentMethod}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Installment</span>
                    <div>{selectedReport.installment}</div>
                  </div>
                  {selectedReport.installment === 'Yes' && (
                    <>
                      <div>
                        <span className="text-gray-500 text-sm">Paid Amount</span>
                        <div>{selectedReport.installmentPaid}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Due Date</span>
                        <div>{selectedReport.dueDate || '-'}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Remarks */}
              {selectedReport.remarks && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Remarks</h3>
                  <p className="whitespace-pre-wrap">{selectedReport.remarks}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic text-center py-12">
              Select a report to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedReports;
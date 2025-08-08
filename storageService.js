/**
 * Service for handling local storage operations for sales reports
 */

const STORAGE_KEY = 'sales_reports';

/**
 * Get all saved reports
 * @returns {Array} Array of report objects
 */
export const getSavedReports = () => {
  try {
    const savedReports = localStorage.getItem(STORAGE_KEY);
    return savedReports ? JSON.parse(savedReports) : [];
  } catch (error) {
    console.error('Error getting saved reports:', error);
    return [];
  }
};

/**
 * Save a new report
 * @param {Object} reportData Report data object
 * @returns {Object} Saved report with ID and timestamp
 */
export const saveReport = (reportData) => {
  try {
    const reports = getSavedReports();
    
    // Create a new report with ID and timestamp
    const newReport = {
      ...reportData,
      id: generateId(),
      timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array (newest first)
    reports.unshift(newReport);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    
    return newReport;
  } catch (error) {
    console.error('Error saving report:', error);
    throw new Error('Failed to save report');
  }
};

/**
 * Delete a report by ID
 * @param {String} reportId Report ID to delete
 * @returns {Boolean} Success status
 */
export const deleteReport = (reportId) => {
  try {
    const reports = getSavedReports();
    const updatedReports = reports.filter(report => report.id !== reportId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    return true;
  } catch (error) {
    console.error('Error deleting report:', error);
    return false;
  }
};

/**
 * Generate a unique ID for a report
 * @returns {String} Unique ID
 */
const generateId = () => {
  return 'report_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};
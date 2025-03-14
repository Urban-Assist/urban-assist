import { useState } from 'react';
import AdminHeader from "../components/AdminHeader";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('pending');

  const renderContent = () => {
    switch (activeSection) {
      case 'pending':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Certification Reviews</h2>
            {/* Add pending certifications content here */}
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300">List of pending certifications will appear here</p>
            </div>
          </div>
        );
      case 'verified':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Verified Certifications</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300">List of verified certifications will appear here</p>
            </div>
          </div>
        );
      case 'delete':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Delete Provider</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4">Provider Name</th>
                    <th className="p-4">Service Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="hover:bg-gray-700">
                    <td className="p-4">John Doe</td>
                    <td className="p-4">Plumbing</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-600 rounded-full text-sm">Active</span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'manage':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Manage Providers</h2>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Add New Provider
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4">Provider Name</th>
                    <th className="p-4">Service Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="hover:bg-gray-700">
                    <td className="p-4">John Doe</td>
                    <td className="p-4">Plumbing</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-600 rounded-full text-sm">Active</span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Conflict Resolution</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300">Payment conflict resolution interface will appear here</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex mt-20">
      {/* Main Content */}
      <div className="flex-1">
        {/* <header className="bg-gray-800 p-6 flex justify-center">
          <h1 className="text-3l font-bold">Admin Dashboard</h1>
        </header> */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Right Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 p-6">
        <div className="space-y-4">
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'pending'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection('pending')}
          >
            Pending Certifications
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'verified'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection('verified')}
          >
            Verified Certifications
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'delete'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection('delete')}
          >
            Delete Provider
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'manage'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection('manage')}
          >
            Manage Providers
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'payments'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection('payments')}
          >
            Payment Conflicts
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
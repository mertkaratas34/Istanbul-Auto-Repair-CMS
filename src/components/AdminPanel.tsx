import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Car, Phone, User, CheckCircle, Wrench, AlertCircle, ArrowLeft, LogOut, FileText, X } from 'lucide-react';

interface Appointment {
  id: number;
  customerName: string;
  phone: string;
  licensePlate: string;
  vehicle: string;
  serviceType: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  createdAt: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
    case 'In Shop':
      return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
    case 'Finished':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'New':
      return <AlertCircle className="w-4 h-4 mr-1.5" />;
    case 'In Shop':
      return <Wrench className="w-4 h-4 mr-1.5" />;
    case 'Finished':
      return <CheckCircle className="w-4 h-4 mr-1.5" />;
    default:
      return null;
  }
};

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const loadAppointments = () => {
      const stored = localStorage.getItem('appointments');
      if (stored) {
        const parsed: Appointment[] = JSON.parse(stored);
        
        // Filter out appointments older than 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const validAppointments = parsed.filter(app => {
          const createdAt = new Date(app.createdAt);
          return createdAt >= sevenDaysAgo;
        });
        
        // If we filtered out some appointments, update localStorage
        if (validAppointments.length !== parsed.length) {
          localStorage.setItem('appointments', JSON.stringify(validAppointments));
        }
        
        // Sort by date and time
        validAppointments.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });

        setAppointments(validAppointments);
      }
    };

    loadAppointments();
    
    // Listen for storage events to update across tabs
    window.addEventListener('storage', loadAppointments);
    return () => window.removeEventListener('storage', loadAppointments);
  }, []);

  const handleStatusChange = (id: number, currentStatus: string) => {
    const statuses = ['New', 'In Shop', 'Finished'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, status: nextStatus } : app
    );

    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editingAppointment) {
      setEditingAppointment({
        ...editingAppointment,
        [e.target.name]: e.target.value
      });
    }
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      const updatedAppointments = appointments.map(app => 
        app.id === editingAppointment.id ? editingAppointment : app
      );
      
      // Re-sort after edit
      updatedAppointments.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });

      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setEditingAppointment(null);
    }
  };
  
  const filteredAppointments = appointments.filter(app => 
    app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Admin Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center mr-3 font-display font-bold text-white">
              202
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight">
              202 Studios <span className="text-gray-400 font-normal">| Service Manager</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-sm text-gray-300 hover:text-white flex items-center transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Site
            </a>
            <div className="flex items-center space-x-4 border-l border-gray-700 pl-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">Admin User</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-gray-400 hover:text-white transition-colors ml-2"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-accent" />
              Today's Schedule
            </h2>
            <p className="text-gray-500 mt-1">
              You have <span className="font-semibold text-primary">{filteredAppointments.length}</span> appointments scheduled for today.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-shadow shadow-sm"
              placeholder="Search by customer name or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-gray-900 font-medium">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm border border-gray-200">
                            {appointment.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{appointment.customerName}</span>
                          <span className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" />
                            {appointment.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded inline-block w-max border border-gray-200 mb-1">
                            {appointment.licensePlate}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Car className="w-3 h-3 mr-1" />
                            {appointment.vehicle}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900">{appointment.serviceType}</span>
                          {appointment.notes && (
                            <span className="text-xs text-gray-500 mt-1 flex items-start max-w-xs truncate" title={appointment.notes}>
                              <FileText className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                              <span className="truncate">{appointment.notes}</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleStatusChange(appointment.id, appointment.status)}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${getStatusColor(appointment.status)}`}
                          title="Click to change status"
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => setEditingAppointment(appointment)}
                          className="text-accent hover:text-accent-hover transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-8 h-8 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900">No appointments found</p>
                        <p className="text-sm">Try adjusting your search terms.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-primary">Edit Appointment</h3>
              <button 
                onClick={() => setEditingAppointment(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={saveEdit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input 
                    type="text" 
                    name="customerName" 
                    value={editingAppointment.customerName} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={editingAppointment.phone} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
                  <input 
                    type="text" 
                    name="vehicle" 
                    value={editingAppointment.vehicle} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  <input 
                    type="text" 
                    name="licensePlate" 
                    value={editingAppointment.licensePlate} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                  <select 
                    name="serviceType" 
                    value={editingAppointment.serviceType} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  >
                    <option value="Periodic Maintenance">Periodic Maintenance</option>
                    <option value="Engine Repair">Engine Repair</option>
                    <option value="Brake System">Brake System</option>
                    <option value="Diagnostic Check">Diagnostic Check-up</option>
                    <option value="Air Conditioning">Air Conditioning</option>
                    <option value="Other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    name="status" 
                    value={editingAppointment.status} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  >
                    <option value="New">New</option>
                    <option value="In Shop">In Shop</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={editingAppointment.date} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select 
                    name="time" 
                    value={editingAppointment.time} 
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none"
                    required
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea 
                    name="notes" 
                    value={editingAppointment.notes || ''} 
                    onChange={handleEditChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-accent focus:border-accent outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setEditingAppointment(null)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-md font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

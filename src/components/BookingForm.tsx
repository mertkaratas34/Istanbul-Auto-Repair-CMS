import React, { useState } from 'react';
import { Calendar, Car, Wrench, CheckCircle2 } from 'lucide-react';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new appointment object
    const newAppointment = {
      id: Date.now(),
      customerName: formData.name,
      phone: formData.phone,
      licensePlate: formData.licensePlate || 'Not Provided',
      vehicle: `${formData.brand} ${formData.model}`,
      serviceType: formData.service,
      date: formData.date,
      time: formData.time,
      status: 'New',
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    setIsSubmitted(true);
  };

  return (
    <section id="booking" className="py-20 bg-secondary relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Book Your Appointment
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Schedule your service online in minutes. Choose your vehicle, select the service needed, and pick a convenient time.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="flex border-b border-gray-100">
              <div className={`flex-1 py-4 text-center font-medium text-sm sm:text-base ${step >= 1 ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-gray-400'}`}>
                <span className="hidden sm:inline">1. Vehicle Details</span>
                <span className="sm:hidden">1. Vehicle</span>
              </div>
              <div className={`flex-1 py-4 text-center font-medium text-sm sm:text-base ${step >= 2 ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-gray-400'}`}>
                <span className="hidden sm:inline">2. Service & Time</span>
                <span className="sm:hidden">2. Service</span>
              </div>
              <div className={`flex-1 py-4 text-center font-medium text-sm sm:text-base ${step >= 3 ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-gray-400'}`}>
                <span className="hidden sm:inline">3. Contact Info</span>
                <span className="sm:hidden">3. Contact</span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8">
                  Thank you, {formData.name}. Your appointment for {formData.date} at {formData.time} has been received. We will contact you shortly to confirm.
                </p>
                <button 
                  onClick={() => { setStep(1); setIsSubmitted(false); setFormData({...formData, name: '', phone: '', notes: ''}); }}
                  className="bg-primary hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Vehicle Details */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center mb-6 text-primary font-display font-bold text-xl">
                      <Car className="w-6 h-6 mr-3 text-accent" />
                      Vehicle Information
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <select 
                          name="brand" 
                          value={formData.brand} 
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        >
                          <option value="">Select Brand</option>
                          <option value="BMW">BMW</option>
                          <option value="Mercedes">Mercedes-Benz</option>
                          <option value="Audi">Audi</option>
                          <option value="Volkswagen">Volkswagen</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Honda">Honda</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        <input 
                          type="text" 
                          name="model" 
                          value={formData.model} 
                          onChange={handleChange}
                          placeholder="e.g. 320i, C200"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <select 
                          name="year" 
                          value={formData.year} 
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        >
                          <option value="">Select Year</option>
                          {[...Array(20)].map((_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>;
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                        <input 
                          type="text" 
                          name="licensePlate" 
                          value={formData.licensePlate} 
                          onChange={handleChange}
                          placeholder="e.g. 34 ABC 123"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow uppercase"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-6 flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!formData.brand || !formData.model || !formData.year || !formData.licensePlate}
                        className="bg-accent hover:bg-accent-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-semibold transition-colors"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Service & Time */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center mb-6 text-primary font-display font-bold text-xl">
                      <Wrench className="w-6 h-6 mr-3 text-accent" />
                      Service Required
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type of Service</label>
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                        required
                      >
                        <option value="">Select Service</option>
                        <option value="Periodic Maintenance">Periodic Maintenance</option>
                        <option value="Engine Repair">Engine Repair</option>
                        <option value="Brake System">Brake System</option>
                        <option value="Diagnostic Check">Diagnostic Check-up</option>
                        <option value="Air Conditioning">Air Conditioning</option>
                        <option value="Other">Other / Not Sure</option>
                      </select>
                    </div>

                    <div className="flex items-center mt-8 mb-6 text-primary font-display font-bold text-xl">
                      <Calendar className="w-6 h-6 mr-3 text-accent" />
                      Preferred Date & Time
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input 
                          type="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <select 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-6 flex justify-between">
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!formData.service || !formData.date || !formData.time}
                        className="bg-accent hover:bg-accent-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-semibold transition-colors"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center mb-6 text-primary font-display font-bold text-xl">
                      <CheckCircle2 className="w-6 h-6 mr-3 text-accent" />
                      Contact Details
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          placeholder="+90 5XX XXX XX XX"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                        <textarea 
                          name="notes" 
                          value={formData.notes} 
                          onChange={handleChange}
                          rows={3}
                          placeholder="Describe any specific issues or sounds..."
                          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-accent focus:border-accent outline-none transition-shadow resize-none"
                        ></textarea>
                      </div>
                    </div>
                    <div className="pt-6 flex justify-between">
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={!formData.name || !formData.phone}
                        className="bg-accent hover:bg-accent-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-md"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

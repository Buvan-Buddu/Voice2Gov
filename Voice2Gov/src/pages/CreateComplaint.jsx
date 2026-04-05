import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CreateComplaint = () => {
  const navigate = useNavigate();
  const { addComplaint, isLoading } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastructure & Potholes');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const categories = [
    'Infrastructure & Potholes',
    'Street Lighting',
    'Water & Utilities',
    'Waste & Sanitation',
    'Safety & Hazards'
  ];

  const handleSubmit = async () => {
    if (!title.trim() && description.length < 5) return;
    const newComplaint = {
      title: title || 'New Civic Report',
      description,
      tags: [category.split(' ')[0], 'General'],
      location: '123 Citizen Way, Metro Central',
    };
    await addComplaint(newComplaint);
    navigate('/my-complaints');
  };

  return (
    <div className="animate-in fade-in transition-all duration-300">
      
      <div className="mb-10 mt-2">
        <h1 className="text-[30px] md:text-[36px] font-extrabold text-primary-900 dark:text-white mb-2 tracking-tight">Submit a Complaint</h1>
        <p className="text-[15px] md:text-[17px] font-medium text-gray-500 dark:text-gray-400 leading-snug pr-4">
          Provide the details below to report a civic issue in your community.
        </p>
      </div>

      <div className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
          {/* Left Column */}
          <div className="space-y-5">
            <div className="premium-card flex flex-col group">
              <div className="px-6 py-3.5 border-b border-gray-50 dark:border-gray-700/30">
                <h2 className="text-[11px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">Issue Title</h2>
              </div>
              <div className="p-6">
                <input 
                  type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Main Street Pothole"
                  className="w-full outline-none text-[16px] text-primary-900 dark:text-white font-bold placeholder-gray-300 dark:placeholder-gray-600 bg-transparent"
                />
              </div>
            </div>

            <div className="premium-card flex flex-col relative">
              <div className="px-6 py-3.5 border-b border-gray-50 dark:border-gray-700/30">
                <h2 className="text-[11px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">Category</h2>
              </div>
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors w-full text-left outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span className="text-[15px] font-bold text-primary-900 dark:text-white">{category}</span>
                </div>
                <svg className={`w-4 h-4 text-gray-300 dark:text-gray-600 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/50 shadow-glass-lg rounded-xl z-50 py-2 animate-in">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => { setCategory(cat); setIsCategoryDropdownOpen(false); }}
                      className="w-full text-left px-6 py-3 text-[14px] font-semibold text-primary-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-700 dark:hover:text-accent-400 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="premium-card flex flex-col">
              <div className="px-6 py-3.5 border-b border-gray-50 dark:border-gray-700/30">
                <h2 className="text-[11px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">Detailed Description</h2>
              </div>
              <div className="p-6 relative">
                <textarea 
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue, its location details, and any hazards..." 
                  className="w-full h-40 resize-none outline-none text-[15px] text-primary-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 bg-transparent leading-relaxed font-medium"
                ></textarea>
                <div className="absolute bottom-6 right-6">
                  <button className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary-700/20 hover:scale-110 active:scale-95 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="premium-card flex flex-col h-fit">
              <div className="px-6 py-3.5 border-b border-gray-50 dark:border-gray-700/30">
                <h2 className="text-[11px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">Evidence</h2>
              </div>
              <div className="p-6">
                <button className="w-full h-48 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-surface-50 dark:bg-dark-elevated/50 flex flex-col items-center justify-center hover:bg-primary-50/50 dark:hover:bg-primary-500/5 hover:border-primary-300 dark:hover:border-primary-500/30 transition-all group outline-none">
                  <div className="w-13 h-13 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center shadow-sm mb-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-[15px] font-bold text-primary-900 dark:text-white mb-1">Add Visual Proof</h3>
                  <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Photos or Videos (Max 10MB)</p>
                </button>
              </div>
            </div>

            <div className="premium-card flex flex-col overflow-hidden">
              <div className="px-6 py-3.5 border-b border-gray-50 dark:border-gray-700/30 flex justify-between items-center">
                <h2 className="text-[11px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">Incident Location</h2>
                <button className="text-[10px] font-bold tracking-widest text-primary-600 dark:text-accent-400 uppercase hover:text-primary-800 dark:hover:text-accent-300 transition-colors">Change</button>
              </div>
              <div className="flex flex-col">
                <div className="relative w-full h-[180px] bg-gray-200 dark:bg-dark-elevated">
                  <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1200&h=400" alt="Map" className="w-full h-full object-cover grayscale-[20%]" />
                  <div className="absolute inset-0 bg-primary-900/10 dark:bg-dark-bg/20"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-primary-600 rounded-full border-[3px] border-white shadow-xl animate-pulse flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex items-center">
                  <div className="w-11 h-11 rounded-xl bg-surface-50 dark:bg-dark-elevated flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4 shadow-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-primary-900 dark:text-white leading-tight">123 Citizen Way</h3>
                    <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500">Metro Central District, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={isLoading || (!title.trim() && description.length < 5)}
          className={`w-full py-5 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-extrabold text-[17px] flex items-center justify-center hover:from-primary-700 hover:to-primary-900 transition-all hover:shadow-xl hover:shadow-primary-700/20 focus:ring-4 ring-primary-500/20 active:scale-[0.98] outline-none mb-12 ${isLoading || (!title.trim() && description.length < 5) ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : null}
          {isLoading ? 'Submitting Report...' : 'Finalize & Post Complaint'}
          {!isLoading && (
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

    </div>
  );
};

export default CreateComplaint;

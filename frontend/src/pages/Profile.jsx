import React from "react";
import { Camera, MapPin, Phone, User, Mail, Globe, Save, Hash } from "lucide-react";

function Profile() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl"> {/* Form ko readable rakhne ke liye width limit ki hai */}
        
        {/* Profile Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Edit Profile</h1>
          <p className="text-gray-500 mt-2">Personalize your account information below.</p>
        </div>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <div className="w-36 h-36 rounded-full bg-white shadow-xl border-4 border-white overflow-hidden flex items-center justify-center">
              <User size={60} className="text-indigo-100" />
            </div>
            <label className="absolute bottom-2 right-2 bg-indigo-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-indigo-700 transition-all hover:scale-110">
              <Camera size={20} />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Vertical Form Fields */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <form className="space-y-8"> {/* Har field ke beech 32px ka gap */}

            {/* --- POINT 1: FIRST NAME --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">First Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your first name (e.g. Arjun)" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 2: LAST NAME --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Last Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your last name (e.g. Pandey)" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 3: EMAIL --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 4: PHONE --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 5: ADDRESS --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Street Address</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Locality, House No, Building name" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 6: CITY --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">City</label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Your City (e.g. Mumbai)" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* --- POINT 7: ZIP CODE --- */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Zip Code</label>
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Postal Code (6 digits)" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" 
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-[1.2rem] font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                <Save size={20} /> Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
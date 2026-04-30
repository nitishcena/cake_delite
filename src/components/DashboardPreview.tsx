import React from 'react';
import { TrendingDown, TrendingUp, ChevronDown, X } from 'lucide-react';
import Gauge from './Gauge';

const DashboardPreview: React.FC = () => {
  return (
    <div className="px-3 sm:px-4 mt-12 sm:mt-20">
      <div className="bg-[#f5f2ee] rounded-3xl p-4 sm:p-8 w-full max-w-[940px] mx-auto shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1 — Clicks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Orders</span>
              <span className="text-neutral-400 text-[13px]">This Month</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">6,896</h3>
              <div className="bg-red-50 text-red-600 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px] font-semibold">
                <TrendingDown className="w-3 h-3" />
                <span>-3,382 (33%)</span>
              </div>
            </div>
            <p className="text-neutral-500 text-[12px] mb-6 font-medium">Compared to yesterday</p>
            
            <div className="mt-auto flex flex-col items-center">
              <span className="text-neutral-600 font-semibold text-[13px] mb-2 text-center">Monthly Target achieved</span>
              <Gauge value={92} color="#ef4d23" showLabels min="389K" max="425K" />
            </div>

            <div className="mt-6 bg-neutral-100 rounded-full p-1 flex">
              <button className="flex-1 bg-white shadow-sm rounded-full py-1.5 text-[12px] font-bold text-neutral-900">Impressions</button>
              <button className="flex-1 py-1.5 text-[12px] font-bold text-neutral-500">Clicks</button>
            </div>
          </div>

          {/* Card 2 — Form */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col gap-4">
            <div>
              <label className="text-[12px] text-neutral-500 font-bold mb-1.5 block uppercase tracking-wider">Show figures for</label>
              <button className="w-full flex justify-between items-center border border-neutral-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-neutral-800 bg-neutral-50/50">
                This month
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div>
              <label className="text-[12px] text-neutral-500 font-bold mb-1.5 block uppercase tracking-wider">Compare period by</label>
              <button className="w-full flex justify-between items-center border border-neutral-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-neutral-800 bg-neutral-50/50">
                Month-to-date (MTD)
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] text-neutral-500 font-bold mb-1.5 block uppercase tracking-wider">Set targets (Month)</label>
                <div className="flex items-center border border-neutral-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-neutral-800 bg-neutral-50/50">
                  <span className="text-neutral-400 mr-1">#</span>
                  10
                </div>
              </div>
              <div>
                <label className="text-[12px] text-neutral-500 font-bold mb-1.5 block uppercase tracking-wider">Set targets (Year)</label>
                <div className="flex items-center border border-neutral-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-neutral-800 bg-neutral-50/50">
                  <span className="text-neutral-400 mr-1">#</span>
                  100
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-4">
              <button className="bg-primary text-white rounded-xl px-6 py-2.5 text-[14px] font-bold hover:bg-opacity-90 transition-all">Save</button>
              <button className="text-neutral-500 text-[14px] font-bold underline underline-offset-4 hover:text-neutral-800 transition-all">Cancel</button>
              <X className="ml-auto w-5 h-5 text-neutral-300 cursor-pointer hover:text-neutral-500 transition-colors" />
            </div>
          </div>

          {/* Card 3 — Video Starts */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Video Views</span>
              <span className="text-neutral-400 text-[13px]">today</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">0</h3>
              <div className="bg-neutral-50 text-neutral-600 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px] font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>0</span>
              </div>
            </div>
            <p className="text-neutral-500 text-[12px] mb-6 font-medium">Compared to yesterday</p>

            <div className="mt-auto flex flex-col items-center">
              <Gauge value={68} color="#9ca3af" />
            </div>

            <div className="mt-6 bg-neutral-100 rounded-full p-1 flex">
              <button className="flex-1 py-1.5 text-[12px] font-bold text-neutral-500">Video Clicks</button>
              <button className="flex-1 bg-white shadow-sm rounded-full py-1.5 text-[12px] font-bold text-neutral-900">Video Starts</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;

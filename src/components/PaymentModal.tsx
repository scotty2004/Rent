import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { X, CheckCircle2, ShieldCheck, Download, Printer, ArrowRight, Smartphone, Sparkles } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { activeModal, setActiveModal, currentUser, processLandlordPayment } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ecocash');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '+263771234567');
  const [years, setYears] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<any | null>(null);

  if (activeModal !== 'payment' || !currentUser) return null;

  const totalAmount = years * 2; // $2 per year

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const ref = selectedMethod.toUpperCase().slice(0, 3) + '-' + Math.floor(100000 + Math.random() * 900000);
      const receiptNum = 'REC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      processLandlordPayment({
        landlordId: currentUser.id,
        amount: totalAmount,
        method: selectedMethod,
        phoneNumber,
        reference: ref,
        periodYears: years
      });

      const receiptObj = {
        receiptNumber: receiptNum,
        landlordName: currentUser.name,
        phoneNumber,
        amount: totalAmount,
        method: selectedMethod,
        reference: ref,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + years)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setCompletedReceipt(receiptObj);
      setIsProcessing(false);
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1 bg-[#F4B400]/20 text-[#F4B400] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase mb-1">
              <Sparkles className="w-3 h-3" /> Landlord Subscription
            </div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Annual Listing Subscription</h2>
          </div>
          <button
            onClick={() => {
              setCompletedReceipt(null);
              setActiveModal(null);
            }}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt View or Payment Form */}
        {completedReceipt ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#008751] mx-auto" />
              <h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300">Payment Successful!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Your landlord account has been renewed for {years} year(s).</p>
            </div>

            {/* Printable Official Receipt Box */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 print:p-0">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <span className="font-black text-[#008751] text-lg">Zim Accommodation</span>
                  <span className="text-[10px] text-slate-400 block font-bold">Official Payment Receipt</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{completedReceipt.receiptNumber}</span>
                  <span className="text-[10px] text-slate-400 block">{completedReceipt.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Landlord Name</span>
                  <strong className="text-slate-800 dark:text-slate-100">{completedReceipt.landlordName}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Gateway</span>
                  <strong className="text-slate-800 dark:text-slate-100 uppercase">{completedReceipt.method} ({completedReceipt.reference})</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Period & Validity</span>
                  <strong className="text-[#008751]">{years} Year — Valid until {completedReceipt.validUntil}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Paid</span>
                  <strong className="text-lg font-black text-[#008751]">${completedReceipt.amount}.00 USD</strong>
                </div>
              </div>

              <div className="pt-3 border-t text-center">
                <span className="inline-block bg-[#008751] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  ✓ VERIFIED PAID LANDLORD
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
              <button
                onClick={() => {
                  setCompletedReceipt(null);
                  setActiveModal(null);
                }}
                className="flex-1 bg-[#008751] hover:bg-[#007043] text-white py-3 rounded-xl font-extrabold text-xs"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-5">
            {/* Subscription Period Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">Subscription Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(y => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => setYears(y)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      years === y
                        ? 'border-[#008751] bg-[#008751]/10 text-[#008751] dark:text-[#00a865] font-black shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold'
                    }`}
                  >
                    <span className="text-sm block">{y} Year{y > 1 ? 's' : ''}</span>
                    <span className="text-xs text-[#008751] font-black">${y * 2}.00 USD</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Gateway Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">Select Zimbabwean Payment Gateway</label>
              <div className="grid grid-cols-3 gap-2">
                {/* EcoCash */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('ecocash')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'ecocash'
                      ? 'border-[#008751] bg-[#008751]/10 text-[#008751] dark:text-[#00a865] font-black'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold'
                  }`}
                >
                  <span className="text-xs font-extrabold">EcoCash</span>
                  <span className="text-[9px] text-slate-400 font-semibold">USD Mobile</span>
                </button>

                {/* InnBucks */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('innbucks')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'innbucks'
                      ? 'border-[#008751] bg-[#008751]/10 text-[#008751] dark:text-[#00a865] font-black'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold'
                  }`}
                >
                  <span className="text-xs font-extrabold">InnBucks</span>
                  <span className="text-[9px] text-slate-400 font-semibold">Instant Auth</span>
                </button>

                {/* Omari */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('omari')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'omari'
                      ? 'border-[#008751] bg-[#008751]/10 text-[#008751] dark:text-[#00a865] font-black'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold'
                  }`}
                >
                  <span className="text-xs font-extrabold">Omari</span>
                  <span className="text-[9px] text-slate-400 font-semibold">Old Mutual</span>
                </button>
              </div>
            </div>

            {/* Mobile Number for Prompt */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                {selectedMethod.toUpperCase()} Mobile Number for Payment Prompt
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. +263 77 123 4567 or 0771234567"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-4 text-xs font-bold text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 font-bold block">Total Amount Due</span>
                <span className="text-[10px] text-slate-400">Includes 12 Months House Advertising</span>
              </div>
              <span className="text-2xl font-black text-[#008751] dark:text-[#00a865]">
                ${totalAmount}.00 USD
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#008751] hover:bg-[#007043] text-white py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Sending USSD Prompt to {phoneNumber}...</span>
              ) : (
                <>
                  <span>Pay ${totalAmount} via {selectedMethod.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B400]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

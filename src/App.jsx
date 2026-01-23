import React, { useState, useEffect } from 'react';
import { CheckCircle, Table, Zap, Users, ArrowRight, Plus, X, Play } from 'lucide-react';
import { Analytics, track } from "@vercel/analytics/react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState('');
  const maxCommentLength = 500;

  // Stripe Payment Link - REMPLACE PAR TON LIEN
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/8x26oGcE66xbaMyc9vgjC00";

  // État pour le tableau interactif
  const [tableRows, setTableRows] = useState([
    { id: 1, name: 'John Doe', position: 'Developer', salary: '€45,000', date: '01/15/2024' },
    { id: 2, name: 'Sarah Smith', position: 'Designer', salary: '€38,000', date: '03/20/2024' },
  ]);
  const [showDemoSuccess, setShowDemoSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    setClickCount(prev => prev + 1);
    setShowModal(true);
    track('CTA_Early_Access_Click');
  };

  const handleStripeClick = () => {
    track('Stripe_Lifetime_Access_Click');
    window.open(STRIPE_PAYMENT_LINK, '_blank');
  };

  const handleWaitlistClick = () => {
    setClickCount(prev => prev + 1);
    setShowModal(true);
    track('Waitlist_Button_Click');
  };

  const handleDemoClick = () => {
    track('Demo_Button_Click');
    window.location.href = '/demo';
  };

  // Fonctions pour gérer le tableau interactif
  const addRow = () => {
    const newRow = {
      id: Date.now(),
      name: '',
      position: '',
      salary: '',
      date: ''
    };
    setTableRows([...tableRows, newRow]);
    track('Table_Row_Added');
  };

  const removeRow = (id) => {
    if (tableRows.length > 1) {
      setTableRows(tableRows.filter(row => row.id !== id));
      track('Table_Row_Removed');
    }
  };

  const updateRow = (id, field, value) => {
    setTableRows(tableRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleDemoSubmit = () => {
    setShowDemoSuccess(true);
    track('Demo_Table_Submitted', { rowCount: tableRows.length });
    
    setTimeout(() => {
      setShowDemoSuccess(false);
      setShowModal(true);
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxpx3p2OU6cwIkJwS9thxe7jPLqgRsTk5U9tjyoshopF5bqrvfGzuJAzKkZtzL4ALPudQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          comment: comment || 'No comment',
          timestamp: new Date().toISOString()
        }),
      });

      console.log('✅ Email envoyé à Google Sheets!');
      setIsSubmitting(false);
      setSubmitted(true);

    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setEmail('');
    setName('');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'DM Sans', 'twk-lausanne', 'apercu-pro', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .highlight {
          background: linear-gradient(120deg, #ffd7c4 0%, #ffd7c4 100%);
          background-repeat: no-repeat;
          background-size: 100% 40%;
          background-position: 0 88%;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        
        .btn-primary {
          background: #000;
          color: #fff;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .demo-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          background-size: 200% 200%;
          animation: shimmer 3s ease infinite;
        }

        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold">TypeGrid</div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDemoClick}
              className="px-5 py-2.5 text-gray-700 hover:text-black font-medium text-sm flex items-center gap-2 transition-colors"
            >
              <Play size={16} />
              Try Demo
            </button>
            <button
              onClick={handleWaitlistClick}
              className="px-5 py-2.5 border border-gray-300 hover:border-black text-gray-700 hover:text-black rounded-md font-medium text-sm transition-all duration-200"
            >
              Join Waitlist
            </button>
            <button
              onClick={handleStripeClick}
              className="px-6 py-2.5 btn-gradient text-white rounded-md font-medium text-sm transition-all duration-200"
            >
              Get Lifetime Access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full mb-8">
              🔥 Only 27 of 50 Beta spots remaining
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              The Missing Link<br />
              <span className="highlight">for Typeform Tables</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Keep Typeform's beautiful UX.<br />
              Add powerful editable tables.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center fade-in-up delay-1 mb-4">
            <button
              onClick={handleStripeClick}
              className="group px-8 py-4 btn-gradient text-white rounded-md text-base font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <span>🔥 Get Lifetime Access · $49</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center fade-in-up delay-2 mb-6">
            <button
              onClick={handleWaitlistClick}
              className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-black text-gray-800 rounded-md text-base font-medium transition-all duration-200"
            >
              Or join the waitlist (free)
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center fade-in-up delay-3 mb-20">
            <button
              onClick={handleDemoClick}
              className="group px-6 py-3 text-gray-600 hover:text-black text-sm font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Play size={16} />
              <span>Try Interactive Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center fade-in-up delay-3">
            <div>
              <div className="text-4xl font-bold mb-2">630+</div>
              <div className="text-sm text-gray-600">community requests</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4 years</div>
              <div className="text-sm text-gray-600">of demand</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$49</div>
              <div className="text-sm text-gray-600">lifetime access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Typeform community has spoken
            </h2>
            <p className="text-xl text-gray-600">
              Hundreds of users love Typeform but need table functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">KendraJohn · 2 years ago · 630 views</div>
                  <div className="font-semibold mb-2">Creating Tables in Typeform?</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Is it possible to create this type of table in typeform? I've tried using the Matrix, but it isn't editable the way I'd like it to be."
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  ✨ TypeGrid solves this
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Mansi · 4 years ago · 252 views</div>
                  <div className="font-semibold mb-2">Tabular form with multiple options</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "I want to design a form which looks like table in Excel with multiple answers like yes/no, numbers and comments."
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  ✨ TypeGrid solves this
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Gonçalo · 4 years ago</div>
                  <div className="font-semibold mb-2">Table of values to fill out</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "We'd like to create a form with a table of values... Typeform looks and feels so much better than alternatives."
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  ✨ TypeGrid solves this
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">MSPERRY · 2 years ago</div>
                  <div className="font-semibold mb-2">Editable table for onboarding</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "I'm looking for a way to present a table that allows customers to edit their own data in my Typeform..."
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  ✨ TypeGrid solves this
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 bg-blue-50 border border-blue-100 rounded-lg">
              <span className="text-blue-700 font-medium">
                💙 Now you can keep using Typeform AND add table functionality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-full mb-6">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The missing link for Typeform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TypeGrid plugs into Typeform's Hidden Fields. Your respondents fill the table, we send it to Typeform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add TypeGrid to your form</h3>
              <p className="text-sm text-gray-600">Embed before your Typeform or use our standalone link</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">User fills the table</h3>
              <p className="text-sm text-gray-600">Beautiful UX matching Typeform's design language</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Data goes to Hidden Fields</h3>
              <p className="text-sm text-gray-600">Structured data flows into your Typeform responses</p>
            </div>
          </div>

          {/* Visual Integration Flow */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-xs text-purple-600 font-semibold mb-2">TYPEGRID TABLE</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Name: John Doe</div>
                  <div>Position: Developer</div>
                  <div>Salary: €45,000</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ArrowRight className="text-purple-600" size={24} />
                <span className="text-xs font-medium text-purple-600">Auto-sync</span>
                <ArrowRight className="text-purple-600" size={24} />
              </div>

              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-xs text-blue-600 font-semibold mb-2">TYPEFORM HIDDEN FIELDS</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>employee_name = "John Doe"</div>
                  <div>employee_position = "Developer"</div>
                  <div>employee_salary = "€45,000"</div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Zero manual work. Zero exports. Just structured data in your Typeform.
            </p>
          </div>

          {/* CTA after How it Works */}
          <div className="mt-12 text-center">
            <button
              onClick={handleDemoClick}
              className="group px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-md text-base font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <Play size={20} />
              <span>See it in action</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full mb-6">
              👇 TRY IT NOW
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Test the table editor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Edit cells, add rows, remove rows. See what Typeform users have been asking for.
            </p>
          </div>

          {/* Success Message après démo */}
          {showDemoSuccess && (
            <div className="max-w-3xl mx-auto mb-8" style={{ animation: 'slideDown 0.5s ease-out' }}>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CheckCircle className="text-green-600 w-8 h-8" />
                  <h3 className="text-2xl font-bold text-green-900">
                    This data is ready for Typeform! 🎉
                  </h3>
                </div>
                <p className="text-green-800 mb-2">
                  TypeGrid would send this to your <strong>Typeform Hidden Fields</strong> automatically.
                </p>
                <p className="text-sm text-green-700">
                  Want this feature? Join the waitlist opening now...
                </p>
              </div>
            </div>
          )}

          {/* Interactive Table */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                    POWERED BY TYPEFORM + TypeGrid
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Employee Information</h3>
                  <p className="text-gray-600">Fill in the table below with each employee's details</p>
                </div>

                {/* TABLEAU INTERACTIF - Desktop View */}
                <div className="hidden md:block bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Position</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Salary</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Hire Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {tableRows.map((row, index) => (
                          <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={row.name}
                                onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                                className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                placeholder="John Doe"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={row.position}
                                onChange={(e) => updateRow(row.id, 'position', e.target.value)}
                                className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                placeholder="Developer"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={row.salary}
                                onChange={(e) => updateRow(row.id, 'salary', e.target.value)}
                                className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                placeholder="€45,000"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={row.date}
                                onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                                className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                placeholder="01/15/2024"
                              />
                            </td>
                            <td className="px-4 py-3">
                              {tableRows.length > 1 && (
                                <button
                                  onClick={() => removeRow(row.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                  title="Remove row"
                                >
                                  <X size={16} className="text-red-600" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={addRow}
                      className="text-black hover:text-gray-700 font-medium text-sm flex items-center gap-2 transition-colors hover:bg-gray-100 px-3 py-1.5 rounded"
                    >
                      <Plus size={18} />
                      Add row
                    </button>
                  </div>
                </div>

                {/* TABLEAU INTERACTIF - Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {tableRows.map((row, index) => (
                    <div key={row.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <span>👤</span>
                          <span>Employee {index + 1}</span>
                        </h3>
                        {tableRows.length > 1 && (
                          <button
                            onClick={() => removeRow(row.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <X size={18} className="text-red-500" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">📝 Name</label>
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">💼 Position</label>
                          <input
                            type="text"
                            value={row.position}
                            onChange={(e) => updateRow(row.id, 'position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">💰 Salary</label>
                          <input
                            type="text"
                            value={row.salary}
                            onChange={(e) => updateRow(row.id, 'salary', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="€45,000"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">📅 Hire Date</label>
                          <input
                            type="text"
                            value={row.date}
                            onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="01/15/2024"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addRow}
                    className="w-full py-3 text-sm text-black hover:text-gray-700 font-medium border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add another employee
                  </button>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700 font-medium">
                    ← Previous
                  </button>
                  <button
                    onClick={handleDemoSubmit}
                    className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-md font-semibold transition-all hover:shadow-lg flex items-center gap-2"
                  >
                    Send to Typeform
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Indicateur d'interactivité */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full demo-pulse"></span>
                <span className="font-medium">This is a live demo - try editing the cells!</span>
              </div>
            </div>

            {/* CTA pour la démo complète */}
            <div className="mt-8 text-center">
              <button
                onClick={handleDemoClick}
                className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <span>Try the full interactive demo</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6 mx-auto">
                <Table size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Works alongside your Typeform. Add table questions whenever you need structured data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6 mx-auto">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Same beautiful UX</h3>
              <p className="text-gray-600 leading-relaxed">
                Matches Typeform's design language. Your respondents won't see the difference.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6 mx-auto">
                <CheckCircle size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Your data, together</h3>
              <p className="text-gray-600 leading-relaxed">
                Table responses flow into Typeform's results. Export everything in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Enhance your Typeforms
            </h2>
            <p className="text-xl text-gray-600">
              Add table questions to any Typeform workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏢', title: 'HR Onboarding', desc: 'Collect employee info, work history, references in tables' },
              { icon: '📊', title: 'Surveys & Audits', desc: 'Structured data collection within your Typeforms' },
              { icon: '🏗️', title: 'Field Reports', desc: 'Building inspections, measurements, room-by-room data' },
              { icon: '💰', title: 'Budget Planning', desc: 'Multi-line budgets, expenses, financial projections' },
            ].map((useCase, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 card-hover text-center">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - UPDATED */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-6">
            🔥 Beta Launch Special - 27/50 spots left
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Join the Beta<br />
            Pioneers
          </h2>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Get lifetime access at the lowest price ever.<br />
            This offer won't come back.
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-10 border-2 border-purple-200 mb-8 inline-block shadow-lg">
            <div className="flex items-start justify-center gap-6 mb-8">
              <div>
                <div className="text-gray-500 line-through text-xl mb-1">$199 lifetime</div>
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$49</div>
                <div className="text-gray-600 mt-1">one-time payment · forever access</div>
              </div>
            </div>

            <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
              {[
                'Unlimited editable tables',
                'Unlimited forms',
                'CSV & Excel export',
                'Priority support',
                'All future features included',
                'Formulas (coming soon)'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStripeClick}
              className="w-full py-4 btn-gradient text-white rounded-md text-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>🔥 Claim Your Lifetime Access - $49</span>
              <ArrowRight size={20} />
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Secure payment via Stripe · 30-day money-back guarantee
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Not ready to commit?</p>
              <button
                onClick={handleWaitlistClick}
                className="w-full py-3 bg-white border-2 border-gray-300 hover:border-black text-gray-700 rounded-md font-medium transition-colors"
              >
                Join the Waitlist (Free)
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">27 of 50 spots remaining</span>
            </div>
            <div>⭐️ 30-day money-back guarantee</div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">TypeGrid</div>
          <p className="text-gray-600 mb-2">
            The missing link for Typeform tables
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Made with ❤️ for the Typeform community
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="mailto:contact@typegrid.io" className="hover:text-black transition-colors">Contact</a>
          </div>
          <div className="mt-6 text-xs text-gray-400">
            © 2026 TypeGrid
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">Join the waitlist</div>
                  <p className="text-gray-600">Get notified when we launch + early bird pricing</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-colors"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      What would you use TypeGrid for? (optional)
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => {
                        if (e.target.value.length <= maxCommentLength) {
                          setComment(e.target.value);
                        }
                      }}
                      rows={3}
                      maxLength={maxCommentLength}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-colors resize-none"
                      placeholder="e.g., HR onboarding, inventory tracking, property surveys..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        Help us understand your needs
                      </span>
                      <span className={`text-xs ${comment.length > maxCommentLength * 0.9 ? 'text-orange-600' : 'text-gray-400'}`}>
                        {comment.length}/{maxCommentLength}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                  </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-4">
                  No spam, ever. We'll only contact you about TypeGrid.
                </p>

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You're on the list! 🎉</h3>
                <p className="text-gray-600 mb-6">
                  We'll send you an email at <strong>{email}</strong> when TypeGrid launches.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-800 font-medium">
                    Want to skip the line? Get lifetime access now for $49
                  </p>
                  <button
                    onClick={() => {
                      handleStripeClick();
                      closeModal();
                    }}
                    className="mt-3 px-6 py-2 btn-gradient text-white rounded-md font-medium text-sm"
                  >
                    Get Lifetime Access →
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      <Analytics />
    </div>
  );
}
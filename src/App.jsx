import React, { useState, useEffect } from 'react';
import { CheckCircle, Table, Zap, Users, ArrowRight } from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Track click event
    console.log('CTA clicked!', clickCount + 1);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Envoi vers Google Sheets avec mode 'no-cors'
    await fetch('https://script.google.com/macros/s/AKfycbxpx3p2OU6cwIkJwS9thxe7jPLqgRsTk5U9tjyoshopF5bqrvfGzuJAzKkZtzL4ALPudQ/exec', {
      method: 'POST',
      mode: 'no-cors', // IMPORTANT pour Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        email, 
        timestamp: new Date().toISOString() 
      }),
    });
    
    // Avec no-cors, on ne peut pas lire la réponse
    // donc on considère que c'est un succès si pas d'erreur
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
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold">GridForm</div>
          <button
            onClick={handleCTAClick}
            className="px-6 py-2.5 bg-black text-white rounded-md font-medium text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-8">
              The missing piece for Typeform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Add editable tables<br />
              <span className="highlight">to your Typeforms</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Keep Typeform's beautiful UX.<br />
              Add powerful table inputs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center fade-in-up delay-1 mb-20">
            <button
              onClick={handleCTAClick}
              className="group px-8 py-4 bg-black text-white rounded-md text-base font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <span>Reserve your spot · €29/mo</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <p className="text-sm text-gray-500">
              Launch pricing · Normally €79/mo
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center fade-in-up delay-2">
            <div>
              <div className="text-4xl font-bold mb-2">630+</div>
              <div className="text-sm text-gray-600">community requests</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4 years</div>
              <div className="text-sm text-gray-600">of demand</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-sm text-gray-600">possibilities with tables</div>
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
                  ✨ GridForm solves this
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
                  ✨ GridForm solves this
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
                  ✨ GridForm solves this
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
                  ✨ GridForm solves this
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

      {/* Solution Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full mb-6">
              THE SOLUTION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              GridForm extends Typeform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Keep everything you love about Typeform. Add editable tables when you need them.
            </p>
          </div>

          {/* Visual Mockup */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                    POWERED BY TYPEFORM + GRIDFORM
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Employee Information</h3>
                  <p className="text-gray-600">Fill in the table below with each employee's details</p>
                </div>

                {/* Table Example */}
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Position</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Salary</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Hire Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Developer"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="€45,000"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="01/15/2024"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Sarah Smith"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Designer"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="€38,000"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="03/20/2024"
                            className="bg-white border border-gray-300 rounded px-3 py-2 w-full focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <button className="text-black hover:text-gray-700 font-medium text-sm flex items-center gap-2 transition-colors">
                      <span className="text-xl">+</span> Add row
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700 font-medium">
                    ← Previous
                  </button>
                  <button className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md font-medium transition-colors flex items-center gap-2">
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Be among the<br />
            first users
          </h2>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Early access limited to 100 spots · Launch offer -63%
          </p>

          <div className="bg-gray-50 rounded-2xl p-10 border-2 border-gray-200 mb-8 inline-block">
            <div className="flex items-start justify-center gap-6 mb-8">
              <div>
                <div className="text-gray-500 line-through text-xl mb-1">€79/mo</div>
                <div className="text-6xl font-bold">€29</div>
                <div className="text-gray-600 mt-1">per month · no commitment</div>
              </div>
            </div>

            <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
              {[
                'Unlimited editable tables',
                'Unlimited forms',
                'CSV & Excel export',
                'Priority support',
                'Lifetime access at this price'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-black flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleCTAClick}
              className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-md text-base font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              Reserve my spot now
            </button>

            <p className="text-xs text-gray-500 mt-4">
              No credit card required · Access early February 2026
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>47 spots remaining</span>
            </div>
            <div>⭐️ 30-day money-back guarantee</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">GridForm</div>
          <p className="text-gray-600 mb-6">
            The table extension Typeform users have been asking for
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="mailto:contact@gridform.io" className="hover:text-black transition-colors">Contact</a>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            {clickCount > 0 && (
              <div className="mb-2 text-black font-medium">
                ✨ {clickCount} clicks recorded this session
              </div>
            )}
            © 2026 GridForm · Made with ❤️ for the Typeform community
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">Join the waitlist</div>
                  <p className="text-gray-600">Get early access to the table extension for Typeform at €29/mo</p>
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Reserve my spot'}
                  </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-4">
                  No spam, ever. We'll only contact you about GridForm.
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
                  We'll send you an email at <strong>{email}</strong> as soon as GridForm launches in early February 2026.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
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
    </div>
  );
}
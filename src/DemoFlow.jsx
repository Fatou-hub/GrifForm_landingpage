import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Eye, Table, Sparkles, ExternalLink } from 'lucide-react';

export default function DemoFlow() {
  const [step, setStep] = useState(1);
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Stripe Payment Link - REMPLACE PAR TON LIEN
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK_HERE";
  
  // Configuration du tableau
  const [tableConfig, setTableConfig] = useState({
    columns: [
      { id: 1, name: 'Name', type: 'text' },
      { id: 2, name: 'Position', type: 'text' },
      { id: 3, name: 'Salary', type: 'number' },
      { id: 4, name: 'Hire Date', type: 'date' }
    ],
    defaultRows: 3
  });

  const updateColumnName = (id, newName) => {
    setTableConfig({
      ...tableConfig,
      columns: tableConfig.columns.map(col => 
        col.id === id ? { ...col, name: newName } : col
      )
    });
  };

  const updateColumnType = (id, newType) => {
    setTableConfig({
      ...tableConfig,
      columns: tableConfig.columns.map(col => 
        col.id === id ? { ...col, type: newType } : col
      )
    });
  };

  const addColumn = () => {
    const newId = Math.max(...tableConfig.columns.map(c => c.id)) + 1;
    setTableConfig({
      ...tableConfig,
      columns: [...tableConfig.columns, { id: newId, name: `Column ${newId}`, type: 'text' }]
    });
  };

  const removeColumn = (id) => {
    if (tableConfig.columns.length > 1) {
      setTableConfig({
        ...tableConfig,
        columns: tableConfig.columns.filter(col => col.id !== id)
      });
    }
  };

  const updateDefaultRows = (value) => {
    setTableConfig({
      ...tableConfig,
      defaultRows: parseInt(value)
    });
    const currentRows = tableData.length;
    const newRowCount = parseInt(value);
    if (newRowCount > currentRows) {
      const emptyRow = {};
      tableConfig.columns.forEach(col => {
        emptyRow[col.name.toLowerCase().replace(' ', '')] = '';
      });
      const newRows = Array(newRowCount - currentRows).fill(emptyRow);
      setTableData([...tableData, ...newRows]);
    } else if (newRowCount < currentRows) {
      setTableData(tableData.slice(0, newRowCount));
    }
  };
  
  // Données du tableau
  const [tableData, setTableData] = useState([
    { name: 'John Doe', position: 'Developer', salary: '€45,000', hiredate: '01/15/2024' },
    { name: 'Sarah Smith', position: 'Designer', salary: '€38,000', hiredate: '03/20/2024' },
    { name: 'Mike Johnson', position: 'Manager', salary: '€52,000', hiredate: '12/01/2023' }
  ]);

  // Données Typeform classiques
  const [typeformData, setTypeformData] = useState({
    companyName: '',
    department: '',
    year: ''
  });

  const addRow = () => {
    const newRow = {};
    tableConfig.columns.forEach(col => {
      const fieldKey = col.name.toLowerCase().replace(/\s+/g, '');
      newRow[fieldKey] = '';
    });
    setTableData([...tableData, newRow]);
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStripeClick = () => {
    window.open(STRIPE_PAYMENT_LINK, '_blank');
  };

  const goToLanding = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .pulse-btn {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .btn-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          background-size: 200% 200%;
          animation: shimmer 3s ease infinite;
        }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
        }

        .confetti {
          animation: confetti 1s ease-out forwards;
        }
      `}</style>

      {/* Header - Typeform style */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span className="font-semibold text-gray-800">Employee Onboarding Form</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                <Table size={12} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-600">TypeGrid</span>
            </div>
            <div className="text-sm text-gray-500">
              Step {step} of 6
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* STEP 1: Typeform Question 1 */}
        {step === 1 && (
          <div className="slide-in">
            <div className="mb-8">
              <div className="text-sm text-purple-600 font-medium mb-2">1 →</div>
              <h1 className="text-4xl font-bold mb-4">What's your company name? *</h1>
              <p className="text-gray-600">We'll use this to personalize your onboarding experience</p>
            </div>
            <input
              type="text"
              value={typeformData.companyName}
              onChange={(e) => setTypeformData({...typeformData, companyName: e.target.value})}
              className="w-full px-6 py-4 text-2xl border-b-4 border-black bg-transparent focus:outline-none"
              placeholder="Type your answer here..."
              autoFocus
            />
            <div className="mt-12">
              <button
                onClick={nextStep}
                disabled={!typeformData.companyName}
                className="px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                OK <CheckCircle size={20} />
              </button>
              <p className="text-sm text-gray-500 mt-4">
                press <strong>Enter ↵</strong>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Typeform Question 2 */}
        {step === 2 && (
          <div className="slide-in">
            <div className="mb-8">
              <div className="text-sm text-purple-600 font-medium mb-2">2 →</div>
              <h1 className="text-4xl font-bold mb-4">Which department is this for? *</h1>
            </div>
            <input
              type="text"
              value={typeformData.department}
              onChange={(e) => setTypeformData({...typeformData, department: e.target.value})}
              className="w-full px-6 py-4 text-2xl border-b-4 border-black bg-transparent focus:outline-none"
              placeholder="Type your answer here..."
              autoFocus
            />
            <div className="mt-12 flex gap-4">
              <button
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} /> Back
              </button>
              <button
                onClick={nextStep}
                disabled={!typeformData.department}
                className="px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                OK <CheckCircle size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TypeGrid Table Builder Configuration */}
        {step === 3 && (
          <div className="slide-in">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-sm text-purple-600 font-medium">3 →</div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                    <Table size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-purple-700">TYPEGRID TABLE BUILDER</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Configure your table</h1>
              <p className="text-gray-600">Set up the columns and structure for your data collection</p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-8">
              <h3 className="text-lg font-semibold mb-6">Table Columns</h3>
              
              <div className="space-y-4 mb-6">
                {tableConfig.columns.map((col, index) => (
                  <div key={col.id} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg group">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Column {index + 1} Name</label>
                      <input
                        type="text"
                        value={col.name}
                        onChange={(e) => updateColumnName(col.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="Enter column name..."
                      />
                    </div>
                    <div className="w-48">
                      <label className="text-xs text-gray-500 mb-1 block">Field Type</label>
                      <select 
                        value={col.type}
                        onChange={(e) => updateColumnType(col.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="email">Email</option>
                        <option value="dropdown">Dropdown</option>
                      </select>
                    </div>
                    {tableConfig.columns.length > 1 && (
                      <button
                        onClick={() => removeColumn(col.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity mt-5 p-2 hover:bg-red-50 rounded text-red-600"
                        title="Remove column"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={addColumn}
                className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 hover:text-purple-700 font-medium flex items-center gap-2 rounded transition-colors"
              >
                <span className="text-xl">+</span> Add Column
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Table Settings</h3>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 mb-2 block">Default number of rows</label>
                    <select 
                      value={tableConfig.defaultRows}
                      onChange={(e) => updateDefaultRows(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="1">1 row</option>
                      <option value="2">2 rows</option>
                      <option value="3">3 rows</option>
                      <option value="5">5 rows</option>
                      <option value="10">10 rows</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 mb-2 block">Advanced features</label>
                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="rounded" disabled />
                        Allow formulas
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Coming soon</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Preview:</strong> Your respondents will see a {tableConfig.defaultRows}-row table with {tableConfig.columns.length} column{tableConfig.columns.length > 1 ? 's' : ''}: {tableConfig.columns.map(c => c.name).join(', ')}. They can add more rows as needed.
              </p>
            </div>

            <div className="mt-12 flex gap-4">
              <button
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} /> Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Create Table <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TypeGrid Table */}
        {step === 4 && (
          <div className="slide-in">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-sm text-purple-600 font-medium">4 →</div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                    <Table size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-purple-700">POWERED BY TYPEGRID</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Enter employee information *</h1>
              <p className="text-gray-600">Fill in the table below. Add or remove rows as needed.</p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      {tableConfig.columns.map((col) => (
                        <th key={col.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.slice(0, tableConfig.defaultRows).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        {tableConfig.columns.map((col) => {
                          const fieldKey = col.name.toLowerCase().replace(/\s+/g, '');
                          return (
                            <td key={col.id} className="px-4 py-3">
                              <input
                                type={col.type === 'number' ? 'text' : col.type === 'email' ? 'email' : col.type === 'date' ? 'date' : 'text'}
                                value={row[fieldKey] || ''}
                                onChange={(e) => {
                                  const newData = [...tableData];
                                  newData[rowIndex] = { ...newData[rowIndex], [fieldKey]: e.target.value };
                                  setTableData(newData);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder={col.type === 'email' ? 'email@example.com' : col.type === 'number' ? '0' : col.type === 'date' ? 'YYYY-MM-DD' : `Enter ${col.name.toLowerCase()}...`}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={addRow}
                  className="text-sm text-gray-700 hover:text-black font-medium"
                >
                  + Add row
                </button>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} /> Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Send to Typeform <ArrowRight size={20} />
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 What happens next:</strong> This table data will automatically sync to your Typeform's Hidden Fields
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: Final Typeform Question + Hidden Fields */}
        {step === 5 && (
          <div className="slide-in">
            <div className="mb-8">
              <div className="text-sm text-purple-600 font-medium mb-2">5 →</div>
              <h1 className="text-4xl font-bold mb-4">Final question: Year of onboarding? *</h1>
            </div>
            <input
              type="text"
              value={typeformData.year}
              onChange={(e) => setTypeformData({...typeformData, year: e.target.value})}
              className="w-full px-6 py-4 text-2xl border-b-4 border-black bg-transparent focus:outline-none mb-8"
              placeholder="Type your answer here..."
              autoFocus
            />

            {/* Show Hidden Fields Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowHiddenFields(!showHiddenFields)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Eye size={20} />
                {showHiddenFields ? 'Hide' : 'Show'} Hidden Fields (Developer View)
              </button>
            </div>

            {/* Hidden Fields Panel */}
            {showHiddenFields && (
              <div className="mb-8 fade-in">
                <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <div className="mb-4 text-gray-400">// Typeform Hidden Fields (auto-populated by TypeGrid)</div>
                  <div className="space-y-2">
                    <div><span className="text-blue-400">company_name:</span> "{typeformData.companyName}"</div>
                    <div><span className="text-blue-400">department:</span> "{typeformData.department}"</div>
                    <div className="mt-4 text-gray-400">// Table data from TypeGrid ({tableConfig.columns.length} columns):</div>
                    {tableData.slice(0, tableConfig.defaultRows).map((row, i) => (
                      <div key={i} className="ml-4 mt-2">
                        <div className="text-yellow-400">row_{i + 1}: {'{'}</div>
                        <div className="ml-4">
                          {tableConfig.columns.map((col, idx) => {
                            const fieldKey = col.name.toLowerCase().replace(/\s+/g, '');
                            const isLast = idx === tableConfig.columns.length - 1;
                            return (
                              <div key={col.id}>
                                <span className="text-blue-400">{fieldKey}:</span> "{row[fieldKey] || ''}"{ !isLast && ','}
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-yellow-400">{'}'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Table data synced to Typeform! ✨
                  </h3>
                  <p className="text-green-800 mb-4">
                    All employee information from TypeGrid is now available in your Typeform Hidden Fields.
                    No manual exports. No copy-paste. Just seamless integration.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-700 font-medium mb-2">What you can do with this data:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✅ Export to Excel/CSV with all responses</li>
                      <li>✅ Use in Typeform Logic Jumps</li>
                      <li>✅ Send to integrations (Slack, Google Sheets, etc.)</li>
                      <li>✅ Display in custom ending screens</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} /> Back
              </button>
              <button
                onClick={() => {
                  setFormSubmitted(true);
                  nextStep();
                }}
                className="px-8 py-4 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Submit Form <CheckCircle size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Success + CTA Conversion */}
        {step === 6 && (
          <div className="slide-in">
            {/* Confetti effect placeholder */}
            <div className="text-center mb-8">
              <div className="inline-block text-6xl mb-4">🎉</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Form Submitted!
              </h1>
              <p className="text-xl text-gray-600">
                You just experienced <span className="font-semibold text-purple-600">TypeGrid</span> in action.
              </p>
            </div>

            {/* Recap Card */}
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                What just happened:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">You filled a <strong>Typeform-style form</strong> with company info</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">You configured and filled an <strong>editable table</strong> (impossible in Typeform alone!)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">All data synced to <strong>Typeform Hidden Fields</strong> automatically</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Ready for export, integrations, and analysis</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 p-8 mb-8">
              <div className="text-center">
                <div className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-4">
                  🔥 Beta Launch Special
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Ready to use TypeGrid on YOUR forms?
                </h2>
                <p className="text-gray-600 mb-6">
                  Join the first 50 Beta Pioneers and get lifetime access.
                </p>

                <div className="bg-white rounded-lg p-6 mb-6 inline-block">
                  <div className="text-gray-500 line-through text-lg">$199 lifetime</div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$49</div>
                  <div className="text-gray-600 text-sm mt-1">one-time payment · forever access</div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-700">27 of 50 spots remaining</span>
                  </div>
                </div>

                <button
                  onClick={handleStripeClick}
                  className="w-full md:w-auto px-10 py-4 btn-gradient text-white rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto pulse-btn"
                >
                  <span>🔥 Claim Your Lifetime Access - $49</span>
                  <ExternalLink size={20} />
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  Secure payment via Stripe · 30-day money-back guarantee
                </p>

                <div className="mt-4">
                  <button
                    onClick={goToLanding}
                    className="text-sm text-purple-600 hover:text-purple-700 underline font-medium"
                  >
                    Or join the free waitlist →
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Try the demo again
              </button>
              <button
                onClick={goToLanding}
                className="px-6 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Back to Homepage
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Footer message */}
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Questions? Email us at{' '}
                <a href="mailto:contact@typegrid.io" className="text-purple-600 underline">
                  contact@typegrid.io
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating CTA for steps 1-5 */}
      {step < 6 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Like what you see?</strong>
            </p>
            <button
              onClick={handleStripeClick}
              className="w-full px-4 py-2 btn-gradient text-white rounded font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              Get Lifetime Access · $49
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              27/50 spots left
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
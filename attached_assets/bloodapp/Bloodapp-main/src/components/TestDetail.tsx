import { ArrowLeft, Activity, Clock, Droplet, FileText, AlertCircle, Package, ChevronRight } from 'lucide-react';
import { getTestById, getBundlesContainingTest } from '../data/tests';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface TestDetailProps {
  testId: string;
  onNavigate: (page: Page) => void;
}

export function TestDetail({ testId, onNavigate }: TestDetailProps) {
  const test = getTestById(testId);
  const bundlesContaining = getBundlesContainingTest(testId);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test not found</h2>
          <button
            onClick={() => onNavigate({ name: 'bundles' })}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Bundles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Activity className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-semibold mb-2 inline-block">
                {test.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{test.name}</h1>
              <p className="text-sm text-white/90 mb-4">{test.description}</p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <div className="text-white/80 text-xs">Sample Type</div>
                  <div className="text-white font-semibold text-sm">{test.sampleType}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <div className="text-white/80 text-xs">Report Time</div>
                  <div className="text-white font-semibold text-sm">{test.reportTime}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <div className="text-white/80 text-xs">Price</div>
                  <div className="text-white font-semibold text-sm">AED {test.price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Why This Test */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Why This Test?
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{test.whyThisTest}</p>
            </div>

            {/* Parameters Tested */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Parameters Tested ({test.parameters.length})
              </h2>
              <div className="space-y-2">
                {test.parameters.map((param, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                  >
                    <h3 className="font-bold text-sm text-gray-900 mb-1">{param.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{param.description}</p>
                    {param.normalRange && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="text-xs font-semibold text-green-700 mb-0.5">Normal Range</div>
                        <div className="text-xs text-green-800">{param.normalRange}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-amber-600" />
                Preparation Instructions
              </h2>
              <ul className="space-y-2">
                {test.preparation.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Bundles Containing This Test */}
            {bundlesContaining.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Better Value</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This test is included in these bundles:
                </p>
                <div className="space-y-3">
                  {bundlesContaining.map(bundle => (
                    <div
                      key={bundle.id}
                      onClick={() => onNavigate({ name: 'bundle-detail', bundleId: bundle.id })}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${bundle.gradient} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                          {bundle.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm">
                            {bundle.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">{bundle.tests.length} tests</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-600">AED {bundle.price}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700">
                    💰 Save up to AED {Math.max(...bundlesContaining.map(b => b.originalPrice - b.price))} with bundles
                  </p>
                </div>
              </div>
            )}

            {/* Standalone Booking */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book This Test Alone</h3>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Standalone Price</div>
                <div className="text-3xl font-bold text-blue-600">AED {test.price}</div>
              </div>
              <button
                onClick={() => alert('Standalone test booking will be implemented!')}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Book This Test
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                💡 Consider bundles for better value
              </p>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our health advisors are here to help you choose the right tests
              </p>
              <button
                onClick={() => onNavigate({ name: 'discover' })}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Talk to AI Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Check, Info, Clock, MapPin, Phone, ChevronRight, Star, Home, Award } from 'lucide-react';
import { getBundleById, getTestsInBundle, getLabsWithPrices } from '../data/tests';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface BundleDetailProps {
  bundleId: string;
  onNavigate: (page: Page) => void;
}

export function BundleDetail({ bundleId, onNavigate }: BundleDetailProps) {
  const bundle = getBundleById(bundleId);
  const tests = getTestsInBundle(bundleId);
  const labsWithPrices = getLabsWithPrices(bundleId);
  const [selectedLab, setSelectedLab] = useState(labsWithPrices[0]?.id || null);

  if (!bundle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bundle not found</h2>
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

  const selectedLabData = labsWithPrices.find(lab => lab.id === selectedLab);

  const handleBookNow = () => {
    if (!selectedLabData) {
      alert('Please select a lab first!');
      return;
    }
    alert(`Booking ${bundle.name} with ${selectedLabData.name}\n\nPrice: AED ${selectedLabData.price.price}\n\nNext steps:\n- Address selection\n- Date & time picker\n- Contact details\n- Payment\n- Confirmation`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => onNavigate({ name: 'bundles' })}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-sm">Back</span>
          </button>
        </div>
      </div>

      {/* Hero Section - Compact */}
      <div className={`bg-gradient-to-br ${bundle.gradient} py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
              {bundle.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                  {bundle.category}
                </span>
                {bundle.popular && (
                  <span className="bg-amber-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-semibold">⭐ Popular</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{bundle.name}</h1>
              <p className="text-sm text-white/90">{bundle.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Ideal For Section - Compact */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Ideal For
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {bundle.idealFor.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 bg-blue-50 rounded-lg p-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tests Included - Compact */}
            <div className="bg-white rounded-xl border border-gray-200 p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Tests Included ({tests.length})
              </h2>
              <div className="space-y-1.5">
                {tests.map(test => (
                  <div
                    key={test.id}
                    onClick={() => onNavigate({ name: 'test-detail', testId: test.id })}
                    className="border border-gray-200 rounded-lg p-2 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 truncate">
                          {test.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            <Clock className="w-2.5 h-2.5" />
                            {test.reportTime}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                            {test.parameters.length} params
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab Selection - AGGREGATOR */}
            <div className="bg-white rounded-xl border-2 border-blue-300 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                🏥 Compare Lab Prices
              </h2>
              <p className="text-xs text-gray-600 mb-3">Select your preferred lab partner</p>
              
              <div className="space-y-2">
                {labsWithPrices.map(lab => (
                  <div
                    key={lab.id}
                    onClick={() => setSelectedLab(lab.id)}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedLab === lab.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {lab.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-sm text-gray-900">{lab.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-gray-600">{lab.rating}</span>
                            <span className="text-xs text-gray-400">({lab.reviews})</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {lab.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lab.turnaroundTime}
                          </span>
                          {lab.homeCollection && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Home className="w-3 h-3" />
                              Home collection
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {lab.accreditation.map(acc => (
                            <span key={acc} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-blue-600">AED {lab.price.price}</div>
                        {lab.price.discount && (
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block">
                            {lab.price.discount}% OFF
                          </div>
                        )}
                        {lab.price.availability === 'limited' && (
                          <div className="text-xs text-amber-600 mt-1">
                            Next: {lab.price.nextAvailableDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card - Compact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book This Package</h3>

              {selectedLabData && (
                <>
                  {/* Selected Lab Info */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{selectedLabData.logo}</span>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{selectedLabData.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {selectedLabData.rating} ({selectedLabData.reviews})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary - Compact */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-blue-600">AED {selectedLabData.price.price}</span>
                    </div>
                    {selectedLabData.price.discount && (
                      <div className="mt-2 text-xs text-green-600 text-center">
                        💰 You save {selectedLabData.price.discount}%
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Features - Compact */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Home Sample Collection</p>
                    <p className="text-xs text-gray-600">Available across Dubai</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Fast Results</p>
                    <p className="text-xs text-gray-600">24-48 hours delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">WhatsApp Updates</p>
                    <p className="text-xs text-gray-600">Real-time tracking</p>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={!selectedLab}
                className={`w-full py-3 px-6 bg-gradient-to-r ${bundle.gradient} text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-3`}
              >
                {selectedLab ? 'Book Now' : 'Select a Lab First'}
              </button>

              {/* Trust Badges - Compact */}
              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">1000+</div>
                    <div className="text-xs text-gray-600">Customers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">4.9⭐</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
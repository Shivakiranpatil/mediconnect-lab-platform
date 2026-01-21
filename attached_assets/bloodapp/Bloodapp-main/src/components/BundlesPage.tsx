import { useState } from 'react';
import { ArrowLeft, Search, Filter, Star } from 'lucide-react';
import { bundles, getAllCategories } from '../data/tests';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface BundlesPageProps {
  onNavigate: (page: Page) => void;
}

export function BundlesPage({ onNavigate }: BundlesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...getAllCategories()];

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bundle.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || bundle.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate({ name: 'home' })}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm sm:text-base">Back to Home</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Test Bundles</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Choose from our comprehensive health test packages</p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for test bundles..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredBundles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bundles found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBundles.map((bundle, index) => (
              <div
                key={bundle.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in"
                onClick={() => onNavigate({ name: 'bundle-detail', bundleId: bundle.id })}
              >
                {/* Header with icon and badge */}
                <div className={`bg-gradient-to-br ${bundle.gradient} p-4 relative`}>
                  {bundle.popular && (
                    <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-semibold text-gray-700">Popular</span>
                    </div>
                  )}
                  <div className="text-4xl mb-2">{bundle.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-0.5">{bundle.name}</h3>
                  <p className="text-xs text-white/90">{bundle.category}</p>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{bundle.description}</p>

                  {/* Ideal For */}
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Ideal For</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {bundle.idealFor.slice(0, 2).map((item, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                      {bundle.idealFor.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          +{bundle.idealFor.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tests Count */}
                  <div className="mb-3 text-xs text-gray-600">
                    <span className="font-semibold">{bundle.tests.length}</span> tests included
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">AED {bundle.price}</span>
                    <span className="text-xs text-gray-400 line-through mb-1">AED {bundle.originalPrice}</span>
                  </div>

                  {/* Savings Badge */}
                  <div className="mb-3">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Save {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}%
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-2 px-4 bg-gradient-to-r ${bundle.gradient} text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                    View Details & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Bundle to Choose?</h2>
          <p className="text-xl text-white/90 mb-8">Let our AI guide you to the perfect tests for your needs</p>
          <button
            onClick={() => onNavigate({ name: 'discover' })}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Start AI Discovery →
          </button>
        </div>
      </div>
    </div>
  );
}
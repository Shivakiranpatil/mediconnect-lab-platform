export function Partners() {
  const partners = [
    { name: 'MEDICLINIC', logo: '🏥' },
    { name: 'NMC Healthcare', logo: '🏨' },
    { name: 'Al Borg', logo: '🔬' },
    { name: 'Prime Health', logo: '💊' },
    { name: 'DINER', logo: '🩺' },
  ];

  return (
    <div className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Trusted by <span className="text-blue-600">Dubai's</span> Leading Labs
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-gray-100"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </div>
              <div className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

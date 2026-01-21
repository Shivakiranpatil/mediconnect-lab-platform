import { ArrowLeft, Droplet, Activity, AlertCircle, TrendingUp, Clock, Target, BookOpen, Stethoscope } from 'lucide-react';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string }
  | { name: 'blood-sugar-info' };

interface BloodSugarInfoProps {
  onNavigate: (page: Page) => void;
}

const bloodSugarParameters = [
  {
    name: 'Fasting Blood Glucose (FBG)',
    icon: Clock,
    description: 'Measures blood sugar level after fasting for 8-12 hours',
    normalRange: '70-100 mg/dL',
    prediabetes: '100-125 mg/dL',
    diabetes: '≥126 mg/dL',
    when: 'Taken in the morning before breakfast',
    importance: 'Indicates how well your body regulates blood sugar when not processing food. Essential for diabetes diagnosis and monitoring.'
  },
  {
    name: 'Random Blood Glucose',
    icon: Activity,
    description: 'Blood sugar measurement taken at any time regardless of meal timing',
    normalRange: '<140 mg/dL',
    prediabetes: '140-199 mg/dL',
    diabetes: '≥200 mg/dL',
    when: 'Can be taken at any time of day',
    importance: 'Useful for quick screening and monitoring. Extremely high levels may indicate uncontrolled diabetes.'
  },
  {
    name: 'HbA1c (Glycated Hemoglobin)',
    icon: TrendingUp,
    description: 'Measures average blood sugar levels over the past 2-3 months',
    normalRange: '<5.7%',
    prediabetes: '5.7-6.4%',
    diabetes: '≥6.5%',
    when: 'No fasting required, can be done anytime',
    importance: 'Gold standard for long-term diabetes management. Shows average glucose control over months, not affected by daily fluctuations.'
  },
  {
    name: 'Postprandial Blood Glucose (PPBG)',
    icon: Target,
    description: 'Blood sugar measured 2 hours after eating a meal',
    normalRange: '<140 mg/dL',
    prediabetes: '140-199 mg/dL',
    diabetes: '≥200 mg/dL',
    when: 'Exactly 2 hours after starting a meal',
    importance: 'Shows how well your body processes food and manages post-meal glucose spikes. Important for meal planning and medication adjustment.'
  },
  {
    name: 'Oral Glucose Tolerance Test (OGTT)',
    icon: Stethoscope,
    description: 'Measures blood sugar at intervals after drinking a glucose solution',
    normalRange: '<140 mg/dL (2-hour)',
    prediabetes: '140-199 mg/dL (2-hour)',
    diabetes: '≥200 mg/dL (2-hour)',
    when: 'Multiple measurements over 2-3 hours',
    importance: 'Most comprehensive test for diagnosing diabetes and gestational diabetes. Shows how your body handles a controlled glucose load.'
  }
];

export function BloodSugarInfo({ onNavigate }: BloodSugarInfoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <Droplet className="w-10 h-10 text-red-500" />
            </div>
            <div className="flex-1">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                Educational Guide
              </span>
              <h1 className="text-4xl font-bold text-white mb-3">Blood Sugar Testing</h1>
              <p className="text-lg text-white/90 mb-4 max-w-3xl">
                Understanding blood glucose levels and how different tests help diagnose and monitor diabetes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* What is Blood Sugar Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">What is Blood Sugar?</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="text-base leading-relaxed">
              <strong className="text-gray-900">Blood sugar</strong>, also called <strong className="text-gray-900">blood glucose</strong>, is the main sugar found in your blood. It comes from the food you eat and is your body's primary source of energy. When you consume carbohydrates, your digestive system breaks them down into glucose, which then enters your bloodstream.
            </p>
            <p className="text-base leading-relaxed">
              The hormone <strong className="text-gray-900">insulin</strong>, produced by your pancreas, acts like a key that allows glucose to enter your cells from the bloodstream. This process provides energy for your cells to function properly and maintains healthy blood sugar levels.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-4">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-900">Normal Process:</strong> Eat food → Glucose enters blood → Pancreas releases insulin → Cells absorb glucose → Blood sugar returns to normal
              </p>
            </div>
          </div>
        </div>

        {/* Why It's Important */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-8 mb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-7 h-7 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Why is Blood Sugar Important?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Energy Production
              </h3>
              <p className="text-sm text-gray-700">
                Glucose is your body's primary fuel source. Every cell needs glucose to produce energy for basic functions, movement, and brain activity.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Brain Function
              </h3>
              <p className="text-sm text-gray-700">
                Your brain relies heavily on glucose for optimal function. Proper blood sugar levels are essential for concentration, memory, and cognitive performance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">❤️</span>
                Preventing Complications
              </h3>
              <p className="text-sm text-gray-700">
                Chronically high blood sugar damages blood vessels, nerves, kidneys, eyes, and heart. Monitoring helps prevent serious health complications.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Early Detection
              </h3>
              <p className="text-sm text-gray-700">
                Regular testing can detect prediabetes and diabetes early, when lifestyle changes and treatment are most effective in preventing progression.
              </p>
            </div>
          </div>
        </div>

        {/* Blood Sugar Test Parameters */}
        <div className="mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Blood Sugar Test Parameters</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Different tests measure blood glucose in various ways. Here's a comprehensive guide to understanding each parameter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {bloodSugarParameters.map((param, index) => {
              const Icon = param.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 truncate">{param.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{param.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {/* Normal Range */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="text-[10px] font-bold text-green-700 mb-0.5 uppercase tracking-wide">Normal</div>
                        <div className="text-xs font-bold text-green-900 leading-tight">{param.normalRange}</div>
                      </div>

                      {/* Prediabetes Range */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                        <div className="text-[10px] font-bold text-amber-700 mb-0.5 uppercase tracking-wide">Prediabetes</div>
                        <div className="text-xs font-bold text-amber-900 leading-tight">{param.prediabetes}</div>
                      </div>

                      {/* Diabetes Range */}
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                        <div className="text-[10px] font-bold text-red-700 mb-0.5 uppercase tracking-wide">Diabetes</div>
                        <div className="text-xs font-bold text-red-900 leading-tight">{param.diabetes}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs text-blue-900 mb-0.5">When to Test</div>
                          <div className="text-xs text-gray-700 leading-tight">{param.when}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 bg-purple-50 rounded-lg">
                        <Target className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs text-purple-900 mb-0.5">Why This Test Matters</div>
                          <div className="text-xs text-gray-700 leading-tight">{param.importance}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who Should Get Tested */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Should Get Tested?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Adults over 45 years</p>
                <p className="text-xs text-gray-600">Especially if overweight or with risk factors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Family history of diabetes</p>
                <p className="text-xs text-gray-600">Parents or siblings with diabetes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Overweight or obese (BMI ≥25)</p>
                <p className="text-xs text-gray-600">Higher risk of insulin resistance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Sedentary lifestyle</p>
                <p className="text-xs text-gray-600">Physical inactivity increases risk</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">History of gestational diabetes</p>
                <p className="text-xs text-gray-600">Diabetes during pregnancy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Polycystic ovary syndrome (PCOS)</p>
                <p className="text-xs text-gray-600">Associated with insulin resistance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">High blood pressure</p>
                <p className="text-xs text-gray-600">140/90 mmHg or higher</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Abnormal cholesterol levels</p>
                <p className="text-xs text-gray-600">HDL &lt;35 mg/dL or triglycerides &gt;250 mg/dL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-2 text-lg">Important Medical Disclaimer</h3>
              <p className="text-sm text-gray-700 mb-2">
                This information is for <strong>educational purposes only</strong> and should not be used for self-diagnosis or treatment. Blood sugar test results must be interpreted by a qualified healthcare professional.
              </p>
              <p className="text-sm text-gray-700">
                ⚠️ <strong>Always consult with a licensed physician or endocrinologist</strong> for proper diagnosis, treatment recommendations, and medical advice regarding diabetes or blood sugar concerns.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate({ name: 'discover' })}
            className="py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Activity className="w-6 h-6" />
            Get AI Recommendations
          </button>
          <button
            onClick={() => onNavigate({ name: 'bundles' })}
            className="py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Droplet className="w-6 h-6" />
            View Test Bundles
          </button>
        </div>
      </div>
    </div>
  );
}
import { CheckCircle2, Circle } from "lucide-react";

const mustHave = [
  "Age 18 or older",
  "Valid government-issued ID",
  "Clear profile photo",
  "Good communication skills",
  "Mobile phone with internet",
];

const optional = [
  "Local language + English",
  "Experience in your city",
  "Travel or tourism knowledge",
  "Photography skills",
  "Social media presence",
];

export default function Requirements() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Are You Eligible?
          </h2>
          <p className="text-lg text-gray-600">
            Check if you meet the requirements to become a guide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Must Have */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Must Have</h3>
            </div>
            <ul className="space-y-4">
              {mustHave.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Circle className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Nice to Have</h3>
            </div>
            <ul className="space-y-4">
              {optional.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Box */}
        <div className="max-w-3xl mx-auto mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-center text-gray-700">
            <span className="font-semibold">💡 Good news!</span> You don&apos;t need to be a professional tour guide. 
            If you&apos;re passionate about your city and love meeting new people, you&apos;re already qualified!
          </p>
        </div>
      </div>
    </section>
  );
}

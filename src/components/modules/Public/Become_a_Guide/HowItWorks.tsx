import { UserPlus, ImagePlus, Search, DollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and tell us about yourself, your expertise, and what makes you unique.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: ImagePlus,
    title: "Add Tour Listings",
    description: "Create your tours with photos, itineraries, pricing, and availability.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Search,
    title: "Get Discovered",
    description: "Travelers find your tours through search and recommendations.",
    color: "from-orange-500 to-red-500",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Accept & Earn",
    description: "Accept bookings, conduct amazing tours, and get paid weekly.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Start earning in 4 simple steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                  )}
                  
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`bg-gradient-to-br ${step.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline for Mobile */}
        <div className="lg:hidden mt-12 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}

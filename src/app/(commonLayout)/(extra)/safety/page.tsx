import React from 'react';
import { Shield, AlertTriangle, Users, MapPin, Phone, Eye, Lock, MessageCircle, CheckCircle, Heart, Camera, FileText } from 'lucide-react';

export default function SafetyPage() {
  const travelerTips = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Research Your Guide",
      description: "Read reviews, check ratings, and review the guide's profile thoroughly before booking. Look for verified badges and consistent positive feedback."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Share Your Plans",
      description: "Always inform a friend or family member about your tour details, including the guide's name, meeting location, and expected return time."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Meet in Public Places",
      description: "Choose tours that start in well-populated, public areas. Avoid meeting in isolated or unfamiliar locations, especially for first-time bookings."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Keep Your Phone Charged",
      description: "Ensure your phone is fully charged and you have local emergency numbers saved. Consider carrying a portable charger for longer tours."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Trust Your Instincts",
      description: "If something feels wrong or uncomfortable, trust your gut. You have the right to end the tour early and leave any situation that makes you uneasy."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Use Platform Messaging",
      description: "Keep all communication within the Local Guide platform. This creates a record and helps us assist you if any issues arise."
    }
  ];

  const guideTips = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Verify Traveler Information",
      description: "Review traveler profiles and communicate clearly before confirming bookings. Set clear expectations about the tour itinerary and requirements."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Set Group Size Limits",
      description: "Establish and maintain appropriate group sizes that you can safely manage. Don't exceed your comfort level or local regulations."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Plan Safe Routes",
      description: "Choose well-traveled routes and avoid dangerous areas. Be aware of local conditions, weather, and any potential hazards along your tour path."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Emergency Preparedness",
      description: "Always carry a charged phone, first aid kit, and know emergency contact numbers. Have a backup plan for unexpected situations."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Maintain Proper Documentation",
      description: "Keep necessary licenses, permits, and insurance up to date. Document your tours and maintain records of bookings and communications."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Professional Boundaries",
      description: "Maintain professional relationships with travelers. Avoid sharing excessive personal information or engaging in inappropriate behavior."
    }
  ];

  const safetyFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Profiles",
      description: "We encourage guides to verify their identity and credentials. Look for verified badges when choosing a guide."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "In-Platform Messaging",
      description: "All communications are logged within our platform, providing a secure record and enabling us to assist with any disputes."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Review System",
      description: "Our transparent review system helps build trust. Both travelers and guides can leave honest feedback after each tour."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our support team is available around the clock to assist with safety concerns, emergencies, or any issues that arise."
    }
  ];

  const redFlags = [
    "Guide asks you to pay outside the platform",
    "Requests to meet in isolated or private locations for first meeting",
    "Pressures you to book immediately without time to review",
    "Has consistently negative reviews or no reviews at all",
    "Asks for excessive personal information",
    "Changes tour details significantly after booking",
    "Refuses to communicate through the platform",
    "Makes you feel uncomfortable or unsafe"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 mr-4" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">Safety Center</h1>
          <p className="text-xl text-center text-emerald-100 max-w-3xl mx-auto">
            Your safety is our top priority. Learn how to stay safe while exploring with Local Guide, 
            whether you're a traveler discovering new places or a guide sharing your expertise.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-emerald-100">
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Building a Safe Community Together</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Local Guide, we're committed to creating a safe, trustworthy platform where travelers and guides can connect with confidence. 
                While we implement various safety features and guidelines, safety is a shared responsibility.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Safety Center provides essential tips, best practices, and resources to help you make informed decisions and stay safe 
                throughout your Local Guide experience. Please read these guidelines carefully and always prioritize your safety.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Safety Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Keep You Safe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler Safety Tips */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
            <div className="flex items-center space-x-4 text-white">
              <Users className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Safety Tips for Travelers</h2>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 mb-8 text-lg">
              Follow these essential safety guidelines to ensure a secure and enjoyable experience when booking tours with local guides.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {travelerTips.map((tip, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex-shrink-0 text-blue-600 mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guide Safety Tips */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <div className="flex items-center space-x-4 text-white">
              <MapPin className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Safety Tips for Guides</h2>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 mb-8 text-lg">
              As a guide, you play a crucial role in ensuring safe, memorable experiences. Follow these best practices to protect yourself and your guests.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {guideTips.map((tip, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <div className="flex-shrink-0 text-purple-600 mt-1">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-12 border-2 border-red-200">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-10 h-10 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Warning Signs to Watch For</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Be cautious if you encounter any of these red flags. If something doesn't feel right, trust your instincts and contact our support team.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {redFlags.map((flag, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-red-200"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-sm font-medium">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COVID-19 Safety */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start space-x-4">
            <Shield className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health & Hygiene Guidelines</h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Stay Informed:</strong> Be aware of local health guidelines and travel restrictions in your destination.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Communicate Health Status:</strong> If you're feeling unwell, reschedule your tour. Both travelers and guides should communicate any health concerns.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Respect Preferences:</strong> Some users may prefer outdoor tours, smaller groups, or specific safety measures. Communicate and respect these preferences.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Hygiene Practices:</strong> Maintain good hygiene practices, including regular hand washing and carrying hand sanitizer during tours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Recommendation */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-12 border-2 border-indigo-200">
          <div className="flex items-start space-x-4">
            <FileText className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurance & Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Travel Insurance:</strong> We strongly recommend that travelers purchase comprehensive travel insurance 
                  that covers medical emergencies, trip cancellations, and personal liability.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Guide Insurance:</strong> Guides should obtain appropriate liability insurance and any required professional 
                  licenses or permits for their tours. Check local regulations in your area.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-gray-900">Platform Limitations:</strong> Local Guide is a marketplace platform connecting travelers and guides. 
                  We do not provide insurance coverage for tours or activities. Users are responsible for their own safety and insurance needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reporting Issues */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Safety Concerns</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you experience or witness any safety issues, inappropriate behavior, or violations of our community guidelines, 
                please report them immediately. We take all reports seriously and investigate thoroughly.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-2">During a Tour</h3>
                  <p className="text-sm text-gray-700">
                    If you feel unsafe during a tour, remove yourself from the situation immediately and contact local emergency services if needed.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-2">After a Tour</h3>
                  <p className="text-sm text-gray-700">
                    Report incidents through your booking page or contact our support team within 48 hours with detailed information.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Suspicious Activity</h3>
                  <p className="text-sm text-gray-700">
                    Report suspicious profiles, scams, or policy violations through the report button on user profiles or listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl p-10 text-white mb-12">
          <div className="text-center">
            <Phone className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
            <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
              In case of emergency, always contact local emergency services first. Then notify Local Guide support.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="font-semibold text-xl mb-3">Local Emergency</h3>
                <p className="text-red-100 mb-2">Call your local emergency number:</p>
                <p className="text-2xl font-bold">911 (US) | 112 (EU) | 999 (UK)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="font-semibold text-xl mb-3">Local Guide Support</h3>
                <p className="text-red-100 mb-2">24/7 Safety Hotline:</p>
                <p className="text-2xl font-bold">+1-800-SAFE-GUIDE</p>
                <p className="text-red-100 mt-2">safety@localguide.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Safety Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="/community-guidelines" 
              className="block p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:shadow-lg transition-shadow"
            >
              <Users className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community Guidelines</h3>
              <p className="text-sm text-gray-600">Learn about our community standards and expected behavior.</p>
            </a>
            <a 
              href="/trust-verification" 
              className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow"
            >
              <Shield className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Trust & Verification</h3>
              <p className="text-sm text-gray-600">Understand our verification process and trust badges.</p>
            </a>
            <a 
              href="/help-center" 
              className="block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-shadow"
            >
              <MessageCircle className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
              <p className="text-sm text-gray-600">Find answers to common questions and get support.</p>
            </a>
          </div>
        </div>

        {/* Closing Message */}
        <div className="mt-12 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
          <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Safety is a Shared Responsibility</h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            While we work hard to create a safe platform, your safety ultimately depends on the choices you make. 
            Stay informed, trust your instincts, and don't hesitate to reach out if you need help. 
            Together, we can build a community where everyone feels safe to explore and share their passion for travel.
          </p>
        </div>
      </div>
    </div>
  );
}

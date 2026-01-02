import React from 'react';
import { Calendar, XCircle, CheckCircle, Clock, DollarSign, AlertTriangle, RefreshCw, Cloud, Zap, MessageCircle, FileText, Users } from 'lucide-react';

export default function CancellationPage() {
  const travelerCancellationTiers = [
    {
      timeframe: "48+ Hours Before Tour",
      icon: <CheckCircle className="w-8 h-8" />,
      refund: "100% Refund",
      serviceFee: "Service fee refunded",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Cancel at least 48 hours before the scheduled tour start time for a full refund of the tour price. Service fees will also be refunded."
    },
    {
      timeframe: "24-48 Hours Before Tour",
      icon: <Clock className="w-8 h-8" />,
      refund: "50% Refund",
      serviceFee: "Service fee non-refundable",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Cancellations made between 24-48 hours before the tour will receive a 50% refund of the tour price. Service fees are non-refundable."
    },
    {
      timeframe: "Less Than 24 Hours Before Tour",
      icon: <XCircle className="w-8 h-8" />,
      refund: "No Refund",
      serviceFee: "Service fee non-refundable",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Cancellations made less than 24 hours before the tour start time are not eligible for a refund. The full payment is retained by the guide."
    }
  ];

  const guideCancellationRules = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Full Refund Required",
      description: "If you cancel a confirmed booking, the traveler receives a 100% refund including all service fees, regardless of timing."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Immediate Notification",
      description: "You must notify the traveler immediately through the platform if you need to cancel. Provide a clear explanation for the cancellation."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Rescheduling Option",
      description: "When possible, offer to reschedule the tour to an alternative date that works for the traveler before canceling outright."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Cancellation Record",
      description: "Frequent cancellations negatively impact your profile rating and may result in account penalties or suspension."
    }
  ];

  const specialCircumstances = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Severe Weather",
      description: "In case of severe weather conditions (hurricanes, blizzards, floods) that make the tour unsafe or impossible, either party may cancel without penalty. Full refunds are provided, and rescheduling is encouraged.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Natural Disasters & Emergencies",
      description: "Tours affected by natural disasters, civil unrest, or government-mandated restrictions can be canceled by either party with full refunds provided to travelers.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Medical Emergencies",
      description: "If either party experiences a medical emergency, cancellations are permitted with appropriate documentation. Refund amounts are determined on a case-by-case basis.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Platform Technical Issues",
      description: "If technical issues on our platform prevent the tour from proceeding as booked, travelers receive full refunds including service fees.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const noShowPolicy = [
    {
      party: "Traveler No-Show",
      consequence: "No refund issued",
      details: "If a traveler fails to show up at the agreed meeting point within 15 minutes of the scheduled start time without prior notice, the booking is considered a no-show and no refund will be issued."
    },
    {
      party: "Guide No-Show",
      consequence: "Full refund + compensation",
      details: "If a guide fails to show up without prior cancellation, the traveler receives a full refund including service fees, plus a credit for a future booking as compensation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-16 h-16 mr-4" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">Cancellation Policy</h1>
          <p className="text-xl text-center text-cyan-100 max-w-3xl mx-auto">
            Life happens, and plans change. Understand our cancellation and refund policies to make informed decisions when booking or offering tours on Local Guide.
          </p>
          <p className="text-center text-cyan-200 mt-4">
            Last Updated: December 4, 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-cyan-100">
          <div className="flex items-start space-x-4">
            <FileText className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Our Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our cancellation policy is designed to be fair to both travelers and guides. We understand that unexpected situations arise, 
                while also recognizing that guides invest time and effort in preparing for tours.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The timing of your cancellation determines the refund amount. The earlier you cancel, the more flexible the refund policy. 
                Please review the details below carefully before making or accepting bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Traveler Cancellation Policy */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Traveler Cancellation Policy</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              As a traveler, your refund amount depends on when you cancel relative to the tour start time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {travelerCancellationTiers.map((tier, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`bg-gradient-to-r ${tier.color} p-6 text-white`}>
                  <div className="flex justify-center mb-3">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {tier.timeframe}
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className={`${tier.bgColor} border ${tier.borderColor} rounded-lg p-4 mb-4`}>
                    <div className="text-center mb-3">
                      <p className="text-2xl font-bold text-gray-900">{tier.refund}</p>
                      <p className="text-sm text-gray-600 mt-1">{tier.serviceFee}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Cancel Your Booking</h3>
                <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
                  <li>Go to your "My Bookings" page in your dashboard</li>
                  <li>Find the booking you wish to cancel</li>
                  <li>Click "Cancel Booking" and select a cancellation reason</li>
                  <li>Confirm the cancellation and review the refund amount</li>
                  <li>You'll receive a confirmation email with refund details</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Cancellation Policy */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
            <div className="flex items-center space-x-4 text-white">
              <Users className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Guide Cancellation Policy</h2>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 mb-6 text-lg">
              As a guide, canceling confirmed bookings should be a last resort. Cancellations negatively impact travelers' plans 
              and your reputation on the platform.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {guideCancellationRules.map((rule, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <div className="flex-shrink-0 text-purple-600 mt-1">
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cancellation Penalties for Guides</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• <strong>First cancellation:</strong> Warning and note on your profile</li>
                    <li>• <strong>Second cancellation (within 6 months):</strong> Temporary reduction in search visibility</li>
                    <li>• <strong>Third cancellation (within 6 months):</strong> Account suspension for 30 days</li>
                    <li>• <strong>Repeated pattern:</strong> Permanent account termination</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Circumstances */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Special Circumstances & Exceptions</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Certain situations warrant exceptions to our standard cancellation policy. These circumstances are evaluated on a case-by-case basis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {specialCircumstances.map((circumstance, index) => (
              <div 
                key={index}
                className={`${circumstance.bgColor} rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow`}
              >
                <div className={`${circumstance.color} mb-4`}>
                  {circumstance.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {circumstance.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {circumstance.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requesting an Exception</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  If you believe your situation qualifies for an exception, contact our support team within 24 hours of the incident 
                  with relevant documentation (weather reports, medical certificates, government notices, etc.). We'll review your case 
                  and respond within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* No-Show Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start space-x-4 mb-6">
            <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No-Show Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                A "no-show" occurs when either party fails to appear at the agreed meeting point without prior cancellation or communication.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {noShowPolicy.map((policy, index) => (
              <div 
                key={index}
                className="bg-red-50 border-2 border-red-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{policy.party}</h3>
                <div className="bg-white rounded p-3 mb-3 border border-red-300">
                  <p className="text-red-700 font-semibold text-center">{policy.consequence}</p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{policy.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              <strong>Grace Period:</strong> We allow a 15-minute grace period from the scheduled start time. 
              If you're running late, communicate immediately through the platform messaging system.
            </p>
          </div>
        </div>

        {/* Refund Processing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start space-x-4">
            <DollarSign className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Immediate Confirmation:</strong> You'll receive an email confirmation of your cancellation 
                      and refund amount immediately after canceling.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Processing Time:</strong> Refunds are processed within 3-5 business days after cancellation approval.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Bank Processing:</strong> Depending on your bank or payment method, it may take an additional 
                      5-10 business days for the refund to appear in your account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Refund Method:</strong> Refunds are issued to the original payment method used for the booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modification vs Cancellation */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-12 border-2 border-teal-200">
          <div className="flex items-start space-x-4">
            <RefreshCw className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifying Your Booking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before canceling, consider modifying your booking instead. Changes to date, time, or tour details may be possible 
                without incurring cancellation fees.
              </p>
              <div className="bg-white rounded-lg p-4 border border-teal-300">
                <h3 className="font-semibold text-gray-900 mb-3">How to Request a Modification:</h3>
                <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
                  <li>Contact your guide through the platform messaging system</li>
                  <li>Explain the changes you'd like to make</li>
                  <li>Wait for the guide to approve or suggest alternatives</li>
                  <li>Once agreed, the guide can update the booking details</li>
                  <li>No cancellation fees apply if both parties agree to modifications</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start space-x-4">
            <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you disagree with a cancellation decision or refund amount, you can file a dispute with our support team.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 1: Contact Support</h3>
                  <p className="text-sm text-gray-700">
                    Submit a dispute within 48 hours of the cancellation through your booking page or support@localguide.com
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 2: Provide Evidence</h3>
                  <p className="text-sm text-gray-700">
                    Include all relevant information, screenshots, messages, and documentation to support your case
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 3: Resolution</h3>
                  <p className="text-sm text-gray-700">
                    Our team will review and respond within 5 business days with a fair resolution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-10 text-white">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Questions About Cancellations?</h2>
            <p className="text-cyan-100 text-lg mb-6 max-w-2xl mx-auto">
              Our support team is here to help you understand our cancellation policy and assist with any cancellation-related issues.
            </p>
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Email:</span> cancellations@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Support:</span> support@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span> +1-800-LOCAL-GUIDE
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-cyan-400">
              <p className="text-cyan-100">
                Local Guide Platform - Connecting Travelers with Local Experts
              </p>
              <p className="text-cyan-200 text-sm mt-2">
                © 2025 Local Guide. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Related Policies</p>
          <div className="flex justify-center space-x-6 flex-wrap gap-2">
            <a href="/terms" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
              Terms of Service
            </a>
            <span className="text-gray-400">•</span>
            <a href="/privacy" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/refund-policy" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
              Refund Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/help-center" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

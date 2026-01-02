import React from 'react';
import { FileText, Users, Shield, CreditCard, AlertTriangle, CheckCircle, XCircle, Scale, Globe, MessageSquare } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Accounts & Eligibility",
      content: [
        {
          subtitle: "Age Requirement",
          text: "You must be at least 18 years old to use Local Guide. By creating an account, you confirm that you meet this age requirement and have the legal capacity to enter into these Terms."
        },
        {
          subtitle: "Account Registration",
          text: "You must provide accurate, complete, and current information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          subtitle: "User Roles",
          text: "You can register as a Traveler (to book tours), a Guide (to offer tours), or both. Each role comes with specific rights and responsibilities outlined in these Terms."
        },
        {
          subtitle: "Account Security",
          text: "You must immediately notify us of any unauthorized use of your account or any other security breach. We are not liable for any loss or damage arising from your failure to protect your account credentials."
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to suspend or terminate your account at any time if you violate these Terms, engage in fraudulent activity, or for any other reason we deem necessary to protect our platform and community."
        }
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Guide Responsibilities",
      content: [
        {
          subtitle: "Tour Listings",
          text: "Guides must provide accurate, truthful, and complete information in their tour listings, including descriptions, pricing, duration, meeting points, and any requirements or restrictions."
        },
        {
          subtitle: "Professional Conduct",
          text: "Guides must conduct themselves professionally, treat travelers with respect, and provide the services as described in their listings. Guides are responsible for their own safety and the safety of their guests."
        },
        {
          subtitle: "Licensing & Permits",
          text: "Guides are responsible for obtaining and maintaining any necessary licenses, permits, or insurance required to legally operate tours in their jurisdiction."
        },
        {
          subtitle: "Availability & Reliability",
          text: "Guides must honor confirmed bookings and maintain accurate availability calendars. Cancellations should only occur in exceptional circumstances and must be communicated promptly."
        },
        {
          subtitle: "Prohibited Activities",
          text: "Guides must not engage in discriminatory practices, harassment, illegal activities, or any behavior that compromises the safety or experience of travelers."
        }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Traveler Responsibilities",
      content: [
        {
          subtitle: "Booking Commitment",
          text: "When you request a booking, you commit to attending the tour if confirmed by the guide. Cancellations should be made according to the cancellation policy to avoid penalties."
        },
        {
          subtitle: "Respectful Behavior",
          text: "Travelers must treat guides with respect, follow instructions during tours, and behave in a manner that does not endanger themselves, the guide, or others."
        },
        {
          subtitle: "Accurate Information",
          text: "Travelers must provide accurate information about group size, special requirements, or any relevant details that may affect the tour experience."
        },
        {
          subtitle: "Payment Obligation",
          text: "Travelers are responsible for paying the full tour fee as listed. Payment must be made through the platform's secure payment system."
        },
        {
          subtitle: "Reviews & Feedback",
          text: "Travelers are encouraged to leave honest, constructive reviews. Reviews must not contain offensive language, personal attacks, or false information."
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments & Fees",
      content: [
        {
          subtitle: "Service Fees",
          text: "Local Guide charges a service fee for facilitating connections between travelers and guides. This fee is clearly displayed before booking confirmation and is non-refundable."
        },
        {
          subtitle: "Payment Processing",
          text: "All payments are processed securely through our payment partners (Stripe/SSLCommerz). By making a payment, you agree to the terms of our payment processors."
        },
        {
          subtitle: "Guide Payouts",
          text: "Guides receive payment after successful tour completion, minus applicable service fees. Payout timing and methods are specified in the Guide Dashboard."
        },
        {
          subtitle: "Currency & Taxes",
          text: "Prices are displayed in the local currency or USD. Guides are responsible for reporting and paying any applicable taxes on their earnings. Travelers may be subject to local taxes."
        },
        {
          subtitle: "Refunds",
          text: "Refunds are processed according to our cancellation policy. Service fees are generally non-refundable. Disputes should be reported within 48 hours of the tour."
        }
      ]
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Cancellations & Refunds",
      content: [
        {
          subtitle: "Traveler Cancellations",
          text: "Travelers can cancel bookings according to the cancellation policy displayed on each tour listing. Cancellations made 48+ hours before the tour typically receive a full refund minus service fees."
        },
        {
          subtitle: "Guide Cancellations",
          text: "If a guide cancels a confirmed booking, travelers receive a full refund including service fees. Repeated cancellations by guides may result in account penalties or suspension."
        },
        {
          subtitle: "Weather & Emergencies",
          text: "In case of severe weather, natural disasters, or other emergencies, either party may cancel without penalty. Refunds or rescheduling options will be provided."
        },
        {
          subtitle: "No-Shows",
          text: "If a traveler fails to show up without prior cancellation, no refund will be issued. If a guide fails to show up, travelers receive a full refund plus compensation."
        },
        {
          subtitle: "Dispute Resolution",
          text: "If there's a dispute about cancellations or refunds, contact our support team within 48 hours. We will review the case and make a fair determination."
        }
      ]
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Reviews & Ratings",
      content: [
        {
          subtitle: "Review Guidelines",
          text: "Reviews must be honest, relevant, and based on actual experiences. They should not contain profanity, discriminatory language, personal attacks, or promotional content."
        },
        {
          subtitle: "Review Moderation",
          text: "We reserve the right to remove reviews that violate our guidelines. Users who repeatedly post inappropriate reviews may have their accounts suspended."
        },
        {
          subtitle: "Response to Reviews",
          text: "Guides may respond to reviews professionally. Responses must not be threatening, harassing, or contain personal information about the reviewer."
        },
        {
          subtitle: "Impact on Visibility",
          text: "Reviews and ratings affect guide visibility in search results. Consistently low ratings may result in reduced visibility or account review."
        }
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Conduct",
      content: [
        {
          subtitle: "Illegal Activities",
          text: "Users must not use the platform for any illegal purposes, including but not limited to fraud, money laundering, human trafficking, or promoting illegal substances."
        },
        {
          subtitle: "Off-Platform Transactions",
          text: "All bookings and payments must be processed through the Local Guide platform. Attempting to circumvent the platform to avoid fees is strictly prohibited and may result in account termination."
        },
        {
          subtitle: "Discrimination & Harassment",
          text: "Discrimination based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic is strictly prohibited. Harassment of any kind will not be tolerated."
        },
        {
          subtitle: "False Information",
          text: "Users must not provide false, misleading, or deceptive information in profiles, listings, reviews, or communications."
        },
        {
          subtitle: "System Abuse",
          text: "Users must not attempt to hack, scrape, or otherwise abuse the platform's systems, including creating fake accounts, manipulating reviews, or interfering with other users' experiences."
        }
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Liability & Disclaimers",
      content: [
        {
          subtitle: "Platform Role",
          text: "Local Guide is a marketplace platform that connects travelers with guides. We are not a tour operator and do not provide tours directly. We are not responsible for the actions, conduct, or services of guides or travelers."
        },
        {
          subtitle: "No Warranties",
          text: "The platform is provided 'as is' without warranties of any kind. We do not guarantee the accuracy of listings, the quality of tours, or the conduct of users."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, Local Guide shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform."
        },
        {
          subtitle: "User Responsibility",
          text: "Users are responsible for their own safety and well-being during tours. Travelers should exercise caution, use good judgment, and take appropriate safety precautions."
        },
        {
          subtitle: "Insurance",
          text: "We strongly recommend that both guides and travelers obtain appropriate insurance coverage. Local Guide does not provide insurance for tours or activities."
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Platform Content",
          text: "All content on the Local Guide platform, including logos, designs, text, graphics, and software, is owned by Local Guide or its licensors and is protected by intellectual property laws."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of content you post (photos, descriptions, reviews). By posting content, you grant Local Guide a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content on the platform."
        },
        {
          subtitle: "Copyright Infringement",
          text: "If you believe your copyright has been infringed, please contact us with details. We will investigate and take appropriate action, which may include removing the infringing content."
        },
        {
          subtitle: "Trademark Use",
          text: "You may not use Local Guide's trademarks, logos, or branding without our prior written permission."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-16 h-16 mr-4" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">Terms of Service</h1>
          <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
            Please read these terms carefully before using Local Guide. By accessing or using our platform, you agree to be bound by these Terms of Service.
          </p>
          <p className="text-center text-indigo-200 mt-4">
            Last Updated: December 4, 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-indigo-100">
          <div className="flex items-start space-x-4">
            <Scale className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Local Guide! These Terms of Service ("Terms") govern your access to and use of the Local Guide platform, 
                which connects travelers with local guides for authentic, personalized experiences.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By creating an account, accessing, or using any part of our platform, you agree to be bound by these Terms. 
                If you do not agree to these Terms, you may not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold text-indigo-900">
                These Terms constitute a legally binding agreement between you and Local Guide. Please read them carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6">
                <div className="flex items-center space-x-4 text-white">
                  {section.icon}
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-400 pl-6 py-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Governing Law */}
        <div className="bg-slate-50 rounded-2xl shadow-lg p-8 mt-8 border-2 border-slate-200">
          <div className="flex items-start space-x-4">
            <Scale className="w-8 h-8 text-slate-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law & Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Local Guide operates, 
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Any disputes arising from these Terms or your use of the platform shall first be attempted to be resolved through good faith negotiations. 
                If negotiations fail, disputes may be resolved through binding arbitration or in the courts of our jurisdiction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You agree to waive any right to participate in class action lawsuits or class-wide arbitration against Local Guide.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-blue-50 rounded-2xl shadow-lg p-8 mt-8 border-2 border-blue-200">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email 
                or through a prominent notice on our platform at least 30 days before the changes take effect.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of the platform after the effective date of the revised Terms constitutes your acceptance of the changes. 
                If you do not agree to the modified Terms, you must stop using the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Severability */}
        <div className="bg-green-50 rounded-2xl shadow-lg p-8 mt-8 border-2 border-green-200">
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability & Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated 
                to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published by us on the platform, 
                constitute the entire agreement between you and Local Guide concerning your use of the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-10 mt-12 text-white">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-indigo-100 text-lg mb-6 max-w-2xl mx-auto">
              If you have any questions, concerns, or need clarification about these Terms of Service, 
              our support team is here to help you understand your rights and obligations.
            </p>
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Email:</span> legal@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Support:</span> support@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Business Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-indigo-400">
              <p className="text-indigo-100">
                Local Guide Platform - Connecting Travelers with Local Experts
              </p>
              <p className="text-indigo-200 text-sm mt-2">
                © 2025 Local Guide. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Related Documents</p>
          <div className="flex justify-center space-x-6">
            <a href="/privacy" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/cookie-policy" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
              Cookie Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/community-guidelines" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
              Community Guidelines
            </a>
            <span className="text-gray-400">•</span>
            <a href="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              By using Local Guide, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
              You also acknowledge that you have read and understood our Privacy Policy and consent to the collection and use of your information as described therein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Shield, Lock, Eye, Users, Database, Globe, FileText, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          text: "When you register as a traveler or guide, we collect your name, email address, password, profile picture, bio, languages spoken, and role-specific information such as expertise areas for guides or travel preferences for tourists."
        },
        {
          subtitle: "Tour & Booking Data",
          text: "We collect information about tours you create (if you're a guide) or book (if you're a traveler), including tour details, itineraries, pricing, dates, meeting points, and booking status."
        },
        {
          subtitle: "Payment Information",
          text: "Payment details are processed securely through our payment partners (Stripe/SSLCommerz). We store transaction records but never store complete credit card information on our servers."
        },
        {
          subtitle: "Reviews & Ratings",
          text: "Your reviews, ratings, and feedback about tours and guides are collected to maintain platform quality and help other users make informed decisions."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including IP address, browser type, device information, pages visited, and time spent on pages."
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Platform Operations",
          text: "To provide, maintain, and improve our services, including facilitating connections between travelers and local guides, processing bookings, and managing payments."
        },
        {
          subtitle: "Communication",
          text: "To send you booking confirmations, tour updates, payment receipts, and important platform notifications. We may also send promotional content, which you can opt out of at any time."
        },
        {
          subtitle: "Safety & Security",
          text: "To verify user identities, prevent fraud, detect and prevent security incidents, and ensure the safety of our community members."
        },
        {
          subtitle: "Personalization",
          text: "To customize your experience, show relevant tour recommendations, and improve our search and matching algorithms based on your preferences."
        },
        {
          subtitle: "Analytics & Improvement",
          text: "To analyze platform usage patterns, understand user behavior, and continuously improve our features, user interface, and overall service quality."
        }
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Between Users",
          text: "When you book a tour, your name and contact information are shared with the guide. Similarly, guides' profiles, including their expertise and tour listings, are visible to all users."
        },
        {
          subtitle: "Service Providers",
          text: "We share data with trusted third-party service providers who help us operate our platform, including payment processors, cloud hosting services, email delivery services, and analytics providers."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to the same privacy protections."
        },
        {
          subtitle: "With Your Consent",
          text: "We may share your information for other purposes with your explicit consent or at your direction."
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "We use industry-standard SSL/TLS encryption to protect data in transit. Sensitive information like passwords is encrypted using secure hashing algorithms."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls to ensure only authorized personnel can access user data, and only when necessary for platform operations."
        },
        {
          subtitle: "Regular Audits",
          text: "Our security practices are regularly reviewed and updated to address emerging threats and maintain the highest standards of data protection."
        },
        {
          subtitle: "Secure Infrastructure",
          text: "We use secure, reliable cloud infrastructure with regular backups, monitoring, and disaster recovery procedures to protect your data."
        }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Your Rights & Choices",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access your personal data and request a copy in a portable format that you can transfer to another service."
        },
        {
          subtitle: "Correction & Update",
          text: "You can update your profile information, preferences, and account settings at any time through your dashboard."
        },
        {
          subtitle: "Deletion",
          text: "You can request deletion of your account and associated data. Note that some information may be retained for legal or legitimate business purposes."
        },
        {
          subtitle: "Marketing Opt-Out",
          text: "You can unsubscribe from promotional emails at any time by clicking the unsubscribe link in our emails or adjusting your notification preferences."
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled."
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "International Data Transfers",
      content: [
        {
          subtitle: "Global Operations",
          text: "Local Guide operates globally, and your information may be transferred to and processed in countries other than your country of residence."
        },
        {
          subtitle: "Data Protection",
          text: "When we transfer data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws."
        }
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Data Retention",
      content: [
        {
          subtitle: "Active Accounts",
          text: "We retain your information for as long as your account is active or as needed to provide you services."
        },
        {
          subtitle: "Legal Obligations",
          text: "Some data may be retained longer to comply with legal obligations, resolve disputes, enforce agreements, or for legitimate business purposes."
        },
        {
          subtitle: "Deletion Requests",
          text: "When you request account deletion, we will delete or anonymize your personal information within 30 days, except where retention is required by law."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 mr-4" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">Privacy Policy</h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information on the Local Guide platform.
          </p>
          <p className="text-center text-blue-200 mt-4">
            Last Updated: December 4, 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Local Guide</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Local Guide, we connect travelers with passionate local experts who offer authentic, personalized experiences. 
                We understand that trust is fundamental to our community, and protecting your privacy is a core part of that trust.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform. 
                By using Local Guide, you agree to the practices described in this policy. Please read it carefully.
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                <div className="flex items-center space-x-4 text-white">
                  {section.icon}
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-blue-400 pl-6 py-2">
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

        {/* Children's Privacy */}
        <div className="bg-amber-50 rounded-2xl shadow-lg p-8 mt-8 border-2 border-amber-200">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Local Guide is not intended for users under the age of 18. We do not knowingly collect personal information from children under 18.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly. 
                If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Policy */}
        <div className="bg-purple-50 rounded-2xl shadow-lg p-8 mt-8 border-2 border-purple-200">
          <div className="flex items-start space-x-4">
            <FileText className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When we make significant changes, we will notify you by email or through a prominent notice on our platform. 
                We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-10 mt-12 text-white">
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              we're here to help. Your privacy is important to us.
            </p>
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Email:</span> privacy@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Data Protection Officer:</span> dpo@localguide.com
              </p>
              <p className="text-lg">
                <span className="font-semibold">Support:</span> support@localguide.com
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-400">
              <p className="text-blue-100">
                Local Guide Platform - Connecting Travelers with Local Experts
              </p>
              <p className="text-blue-200 text-sm mt-2">
                © 2025 Local Guide. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Related Documents</p>
          <div className="flex justify-center space-x-6">
            <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
              Terms of Service
            </a>
            <span className="text-gray-400">•</span>
            <a href="/cookie-policy" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
              Cookie Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function GuideCTA() {
  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-primary via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="text-5xl">🧭</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Become a Guide?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join hundreds of local guides earning money while sharing their passion. 
            Start your journey today - it&apos;s free to sign up!
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "No upfront costs",
              "Free training & support",
              "Flexible schedule",
              "Weekly payments",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="bg-white text-primary px-6 py-3 sm:px-10 sm:py-5 rounded-xl font-bold sm:text-lg hover:bg-gray-100 transition shadow-2xl hover:shadow-3xl flex items-center gap-3 group"
            >
              Apply Now - It&apos;s Free
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="#faq"
              className="bg-white/10 backdrop-blur-sm text-white  px-6 py-3 sm:px-10 sm:py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition border-2 border-white/30"
            >
              Have Questions?
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 text-white/80 text-sm">
            <p>✨ Join 500+ guides already earning with us</p>
          </div>
        </div>
      </div>
    </section>
  );
}

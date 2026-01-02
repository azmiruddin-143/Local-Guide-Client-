import { DollarSign, Clock, Users, Heart, Award, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Flexible income with unlimited bookings. Top guides earn $600-$1200/month part-time.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work when you want. Set your own availability and tour times.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Meet New People",
    description: "Connect with travelers from all over the world and make lasting friendships.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Heart,
    title: "Share Your Passion",
    description: "Whether it's history, food, photography, or culture - share what you love.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Award,
    title: "Build Your Reputation",
    description: "Earn ratings, reviews, and badges. Become a recognized expert in your city.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Scale your tours, build a following, and create a sustainable income stream.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

export default function WhyBecomeGuide() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Become a Guide?
          </h2>
          <p className="text-lg text-gray-600">
            Turn your local expertise into a rewarding career with benefits that matter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className={`${benefit.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { TrendingUp, DollarSign, Calendar, Users } from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    value: "$600-$1200",
    label: "Average Monthly Earnings",
    sublabel: "Part-time guides",
  },
  {
    icon: Calendar,
    value: "10-15",
    label: "Tours Per Month",
    sublabel: "Flexible schedule",
  },
  {
    icon: Users,
    value: "4-8",
    label: "Travelers Per Tour",
    sublabel: "Average group size",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Guides Earning More",
    sublabel: "After 3 months",
  },
];

export default function IncomePossibility() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-purple-50/50 to-blue-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Income Potential
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Earning Potential
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our top guides earn substantial income doing what they love. Here&apos;s what you can expect.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-primary/50 transition-all hover:shadow-xl"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.sublabel}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="text-2xl md:text-5xl md:text-6xl font-bold mb-4">
                💰 $600-$1200/month
              </div>
              <p className="text-xl md:text-2xl mb-6 text-white/90">
                Top guides earn this much doing part-time guiding
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Work 10-15 hours/week</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Set your own rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Weekly payouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>* Earnings vary based on location, tour type, pricing, and number of bookings. These are average figures from active guides.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Users, GraduationCap, Clock, Globe, TrendingUp, CheckCircle } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: "50K+", label: "Students Managed", icon: Users, color: "text-blue-500" },
    { number: "1,000+", label: "Institutions", icon: GraduationCap, color: "text-purple-500" },
    { number: "99.9%", label: "Uptime", icon: TrendingUp, color: "text-green-500" },
    { number: "24/7", label: "Support", icon: Globe, color: "text-orange-500" },
    { number: "<2min", label: "Setup Time", icon: Clock, color: "text-indigo-500" },
    { number: "100%", label: "Satisfaction", icon: CheckCircle, color: "text-emerald-500" }
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Institutions 
            <span className="gradient-text block sm:inline"> Worldwide</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform powers attendance management for educational institutions across the globe
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center glass-effect hover-lift animate-slide-up border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-current to-current/70 ${stat.color} flex items-center justify-center opacity-20`}>
                    <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} opacity-100`} />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-muted-foreground text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Enterprise ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>GDPR compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
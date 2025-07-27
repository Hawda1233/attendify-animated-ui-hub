import { GraduationCap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 border-t bg-muted/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-8 sm:h-10 sm:w-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              AttendanceHub
            </span>
          </div>

          {/* Mission Statement */}
          <div className="max-w-md mx-auto space-y-3">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Transforming education through innovative attendance management
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>for educators worldwide</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base">
            <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
              Dashboard
            </a>
            <a href="/students" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
              Students
            </a>
            <a href="/attendance" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
              Attendance
            </a>
            <a href="/analytics" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
              Analytics
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2024 AttendanceHub. Empowering education through technology • Always free, always improving
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
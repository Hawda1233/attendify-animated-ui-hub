const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-16 w-16 gradient-primary rounded-lg flex items-center justify-center">
              <svg className="h-10 w-10 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7V17H5V9L12 4L19 9V17H21V7L12 2ZM12 6L7 9V15H9V11H15V15H17V9L12 6ZM11 13V15H13V13H11Z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
              AttendanceHub
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground">
            Production-ready attendance management system for educational institutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 rounded-lg gradient-card border">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-muted-foreground">
              Easy enrollment and management of students across multiple colleges
            </p>
          </div>

          <div className="text-center p-6 rounded-lg gradient-card border">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Attendance</h3>
            <p className="text-muted-foreground">
              Digital attendance tracking with Excel import/export capabilities
            </p>
          </div>

          <div className="text-center p-6 rounded-lg gradient-card border">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-muted-foreground">
              Comprehensive analytics and reporting for informed decision making
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <a 
            href="/auth"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            Get Started
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a 
            href="/dashboard"
            className="border border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Demo
          </a>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            ✨ Mobile-responsive • 🌙 Dark mode • 📊 Excel integration • 🔒 Secure authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

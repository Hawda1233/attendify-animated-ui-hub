import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { title: 'Dashboard', href: '/dashboard' }
    ];
    
    if (segments[0] === 'students') {
      breadcrumbs.push({ title: 'Students', href: '/students' });
      if (segments[1] === 'add') {
        breadcrumbs.push({ title: 'Add Student', href: '/students/add' });
      }
    } else if (segments[0] === 'attendance') {
      breadcrumbs.push({ title: 'Attendance', href: '/attendance' });
    } else if (segments[0] === 'analytics') {
      breadcrumbs.push({ title: 'Analytics', href: '/analytics' });
    } else if (segments[0] === 'settings') {
      breadcrumbs.push({ title: 'Settings', href: '/settings' });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 sm:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-full items-center gap-2 sm:gap-4 px-3 sm:px-4">
              <SidebarTrigger />
              
              <div className="flex-1 min-w-0">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((breadcrumb, index) => (
                      <div key={breadcrumb.href} className="flex items-center">
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                          {index === breadcrumbs.length - 1 ? (
                            <BreadcrumbPage className="text-sm sm:text-base">{breadcrumb.title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={breadcrumb.href} className="text-sm sm:text-base">
                              {breadcrumb.title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </div>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
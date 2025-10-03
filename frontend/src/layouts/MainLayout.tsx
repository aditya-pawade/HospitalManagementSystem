import React, { useState } from 'react';
import { Navbar, Sidebar, Footer } from '../components';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuToggle={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 flex flex-col lg:ml-0">
          <div className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
'use client';
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

const AppSidebar = ({ children }) => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex">
      {/* Sidebar */}
      {isOpen && (
        <aside className="w-64 bg-gray-800 text-white p-4">
          Sidebar Content
        </aside>
      )}
      
      {/* Main content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AppSidebar;

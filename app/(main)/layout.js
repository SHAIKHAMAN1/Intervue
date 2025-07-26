"use client"
import Provider from '@/app/Provider';
import DashboardProvider from './Provider'; // This could be more clearly renamed
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }) {
  return (
    <Provider>
      <DashboardProvider>
        <div className="p-4">
          {children}
          <Toaster />
        </div>
      </DashboardProvider>
    </Provider>
  );
}

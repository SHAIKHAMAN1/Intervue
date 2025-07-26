'use client';
import React, { useState } from 'react';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';

import {
  CalendarDays,
  LayoutDashboard,
  List,
  CreditCard,
  Settings,
  LogOut,
  Plus,
} from 'lucide-react';

export default function DashboardProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const getButtonClasses = (menu) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition ${
      activeMenu === menu
        ? 'bg-blue-100 text-blue-700 font-semibold'
        : 'hover:bg-gray-100 text-gray-700'
    }`;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="bg-white border-r border-gray-200 shadow-sm">
          <SidebarHeader className="p-4 space-y-4">
            <div className="w-full flex justify-center">
              <img
                src="/logo.png"
                alt="Intervue Logo"
                width={400}
                height={400}
                className="w-[160px] h-[120px] object-contain"
              />
            </div>

            <button className="flex items-center gap-2 w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm transition">
              <Plus className="w-4 h-4" />
              Create New Interview
            </button>
          </SidebarHeader>

          <SidebarMenu className="mt-4 px-2">
            {[
              ['dashboard', LayoutDashboard, 'Dashboard'],
              ['scheduled', CalendarDays, 'Scheduled Interview'],
              ['all', List, 'All Interview'],
              ['billing', CreditCard, 'Billing'],
              ['settings', Settings, 'Settings'],
            ].map(([key, Icon, label]) => (
              <SidebarMenuItem key={key}>
                <SidebarMenuButton
                  className={getButtonClasses(key)}
                  onClick={() => setActiveMenu(key)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarFooter className="mt-auto p-4">
            <SidebarMenuButton className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

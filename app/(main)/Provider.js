'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarSeparator,
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
  User,
} from 'lucide-react';
import Link from 'next/link';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

export default function DashboardProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const router = useRouter();

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
          {/* Sidebar Header */}
          <SidebarHeader className="p-4 space-y-4">
            {/* Logo */}
            <div className="w-full flex justify-center">
              <Link href={'/dashboard'}>
              <img
                src="/logo.png"
                alt="Intervue Logo"
                className="w-[160px] h-[120px] object-contain"
              />
              </Link>
            </div>

            {/* Create New Interview Button */}
            <button
              className="flex items-center gap-2 w-full px-4 py-2 mt-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-m transition"
              onClick={() => router.push('/dashboard/create-interview')}
            >
              <Plus className="w-4 h-4" />
              Create New Interview
            </button>
          </SidebarHeader>

          {/* Sidebar Menu */}
          <SidebarMenu className="mt-4 px-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                className={getButtonClasses('dashboard')}
                onClick={() => {
                  setActiveMenu('dashboard');
                  router.push('/dashboard');
                }}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-base font-medium">Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className={getButtonClasses('scheduled')}
                onClick={() => {
                  setActiveMenu('scheduled');
                  router.push('/scheduled-interview');
                }}
              >
                <CalendarDays className="w-4 h-4" />
                <span className="text-base font-medium">Scheduled Interview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className={getButtonClasses('all-interview')}
                onClick={() => {
                  setActiveMenu('all-interview');
                  router.push('/all-interview');
                }}
              >
                <List className="w-4 h-4" />
                <span className="text-base font-medium">All Interview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className={getButtonClasses('billing')}
                onClick={() => {
                  setActiveMenu('billing');
                  router.push('/auth');
                }}
              >
                <User className="w-4 h-4" />
                <span className="text-base font-medium">Login</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                className={getButtonClasses('settings')}
                onClick={() => {
                  setActiveMenu('settings');
                  router.push('/dashboard/settings');
                }}
              >
                <Settings className="w-4 h-4" />
                <span className="text-base font-medium">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Sidebar Footer */}
          <SidebarFooter className="mt-auto p-4">
            <SidebarMenuButton
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md px-3 py-2"
              onClick={() => {
                // Add logout logic here
                console.log('Logging out...');
                
              }}
            >
              <LogOut  className="w-4 h-4" />
              <span className="text-base font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        <div className="p-4">
          {/* Optional trigger button */}
          {/* <SidebarTrigger /> */}
          <WelcomeContainer />
        </div>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

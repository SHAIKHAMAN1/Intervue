import WelcomeContainer from "./_components/WelcomeContainer";
import { CalendarDays, Phone, Copy, Send } from "lucide-react";
import Image from "next/image";
import CreateOptions from "./_components/CreateOptions";
import LatestinterviewList from "./_components/LatestinterviewList";
export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 rounded-2xl ">
      {/* <WelcomeContainer /> */}
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <CreateOptions/>
      <LatestinterviewList/>

    </div>
  );
}

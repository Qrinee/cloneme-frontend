import {
  FaFacebookMessenger,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import DialogPremium from "./DialogPremium";
import { useEffect, useState } from "react";
import { useAuthFetch } from "@/utils/authFetch";
export function NavMain({ items }) {
  const [user,setUser] = useState()
    const authFetch = useAuthFetch();
  useEffect(() => {
          authFetch(`${import.meta.env.VITE_URL}/mydata`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 403) {
          // Obsłuż przypadek braku autoryzacji, np. przekierowanie do logowania
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data.user);
        console.log(data)
      });

  },[])
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4">
        {/* Quick Create */}
        <Link to={"/clone"}>
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-gradient-to-br from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-black shadow-md animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FaPlus className="text-lg animate-pulse" />
              <span>Create and earn</span>
            </div>
          </div>
        </Link>

        {/* Messages Left + Subscription Dialog */}
        <DialogPremium points={user ? user.points : 0}/>

        {/* Menu Items */}
        <SidebarMenu>
          {items.map((item) => (
            <Link to={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}






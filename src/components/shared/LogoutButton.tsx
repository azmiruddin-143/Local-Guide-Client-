"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="w-full justify-start gap-2 px-3 py-2 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors font-medium"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;

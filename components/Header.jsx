import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { TvMinimal, BanknoteArrowUp } from "lucide-react";
import { checkUser } from "../lib/checkuser.js";  

const Header = async () => {
  await checkUser();
  return (
    <div className="flex top-0 w-full h-16 bg-white backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href={"/dashboard"} className="flex items-center gap-3">
              <Button variant="outline">
                <TvMinimal size={18} />
                <span className="hidden md:block">Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button className="flex items-center gap-2">
                <BanknoteArrowUp size={18} />
                <span className="hidden md:block">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="cursor-pointer">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              }
            }} />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;

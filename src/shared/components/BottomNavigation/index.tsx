import React from "react";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";
import { GamepadIcon, HeartIcon, HomeIcon, UserIcon } from "@/assets/icons";

interface CustomTabBarButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  isSelected: boolean;
}

function CustomTabBarButton({
  onPress,
  children,
  isSelected,
}: CustomTabBarButtonProps) {
  return (
    <button
      onClick={onPress}
      className="flex relative flex-col flex-1 justify-between items-center"
      aria-selected={isSelected}
      style={{
        transform: isSelected ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.1s ease",
      }}
    >
      {isSelected && (
        <div
          className="flex absolute top-0 w-10 h-1 rounded-full shadow-lg"
          style={{ backgroundColor: COLORS.PRIMARY }}
        />
      )}
      <div className="flex flex-col justify-center items-center w-20 h-full">
        {isSelected && (
          <div
            className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"
            style={{
              transition: "opacity 0.1s ease",
            }}
          />
        )}
        <div className="flex flex-col gap-1 justify-center items-center mt-3">
          <span
            className="mt-1 text-xs"
            style={{
              fontFamily: "Inter",
              fontWeight: "400",
              color: isSelected ? COLORS.PRIMARY : COLORS.SECONDARY,
            }}
          >
            {children}
          </span>
        </div>
      </div>
    </button>
  );
}

export function BottomNavigation() {
  const location = useLocation();

  const tabItems = [
    {
      name: "home",
      path: "/",
      title: "홈",
      icon: (isSelected: boolean) => (
        <HomeIcon
          className={`w-6 h-6 ${
            isSelected ? "text-green-100" : "text-gray-400"
          }`}
        />
      ),
    },
    {
      name: "playroom",
      path: "/playroom",
      title: "놀이방",
      icon: (isSelected: boolean) => (
        <GamepadIcon
          className={`w-6 h-6 ${
            isSelected ? "text-green-100" : "text-gray-400"
          }`}
        />
      ),
    },
    {
      name: "wishlist",
      path: "/favorites",
      title: "찜",
      icon: (isSelected: boolean) => (
        <HeartIcon
          className={`w-6 h-6 ${
            isSelected ? "text-green-100" : "text-gray-400"
          }`}
        />
      ),
    },
    {
      name: "profile",
      path: "/mypage",
      title: "마이",
      icon: (isSelected: boolean) => (
        <UserIcon
          className={`w-6 h-6 ${
            isSelected ? "text-green-100" : "text-gray-400"
          }`}
        />
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex flex-col items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
      <div className="flex h-full">
        {tabItems.map((item) => {
          const isSelected =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex-1 no-underline"
            >
              <CustomTabBarButton onPress={() => {}} isSelected={isSelected}>
                {item.icon(isSelected)}{" "}
                <p className="text-green-200">{item.title}</p>
              </CustomTabBarButton>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

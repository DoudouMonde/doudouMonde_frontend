import React from "react";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";
import { GamepadIcon, HeartIcon, HomeIcon, UserIcon } from "@/assets/icons";
import { PATH } from "@/shared/constants";

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
          className="flex absolute -top-1 gap-3 w-10 h-1 rounded-full"
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
        <div className="flex flex-col justify-center items-center mt-4">
          {children}
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
      path: PATH.HOME,
      title: "홈",
      icon: (isSelected: boolean) => (
        <HomeIcon
          className="w-6 h-6"
          style={{ color: isSelected ? COLORS.PRIMARY : COLORS.GRAY_400 }}
        />
      ),
    },
    {
      name: "playroom",
      path: PATH.PLAYROOM,
      title: "놀이방",
      icon: (isSelected: boolean) => (
        <GamepadIcon
          className="w-6 h-6"
          style={{ color: isSelected ? COLORS.PRIMARY : COLORS.GRAY_400 }}
        />
      ),
    },
    {
      name: "wishlist",
      path: PATH.WISHLIST,
      title: "찜",
      icon: (isSelected: boolean) => (
        <HeartIcon
          className="w-6 h-6"
          style={{ color: isSelected ? COLORS.PRIMARY : COLORS.GRAY_400 }}
        />
      ),
    },
    {
      name: "profile",
      path: PATH.PROFILE,
      title: "마이",
      icon: (isSelected: boolean) => (
        <UserIcon
          className="w-6 h-6"
          style={{ color: isSelected ? COLORS.PRIMARY : COLORS.GRAY_400 }}
        />
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-[68px] rounded-t-3xl bg-gray-200 flex flex-col items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
      <div className="flex h-full">
        {tabItems.map((item) => {
          const isSelected = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex-1 no-underline"
              onClick={() => {
                console.log(`🔗 네비게이션 클릭: ${item.title} → ${item.path}`);
              }}
            >
              <CustomTabBarButton onPress={() => {}} isSelected={isSelected}>
                {item.icon(isSelected)}
                <p
                  className="mt-1 text-xs"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    color: isSelected ? COLORS.PRIMARY : COLORS.BLACK,
                  }}
                >
                  {item.title}
                </p>
              </CustomTabBarButton>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

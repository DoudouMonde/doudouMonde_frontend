import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

interface CustomTabBarButtonProps {
  onPress: () => void;
  accessibilityLabel: string;
  children: React.ReactNode;
  isSelected: boolean;
  href: string;
}

function CustomTabBarButton({
  onPress,
  accessibilityLabel,
  children,
  isSelected,
}: CustomTabBarButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <button
      onClick={onPress}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="flex relative flex-col flex-1 justify-between items-center"
      role="tab"
      aria-selected={isSelected}
      style={{
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.1s ease",
      }}
    >
      {isSelected && (
        <div
          className="absolute top-0 w-10 h-1 rounded-full shadow-lg"
          style={{ backgroundColor: COLORS.PRIMARY }}
        />
      )}
      <div className="flex flex-col justify-center items-center w-20 h-full">
        {isPressed && (
          <div
            className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"
            style={{
              transition: "opacity 0.1s ease",
            }}
          />
        )}
        <div className="flex flex-col gap-1 justify-center items-center mt-3">
          {children}
          <span
            className="mt-1 text-xs"
            style={{
              fontFamily: "Inter",
              fontWeight: "400",
              color: isSelected ? COLORS.PRIMARY : COLORS.SECONDARY,
            }}
          >
            {accessibilityLabel}
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
      icon: (isSelected: boolean) =>
        isSelected ? (
          <i className="fi fi-rr-home" />
        ) : (
          <i className="fi fi-rr-home" />
        ),
    },
    {
      name: "playroom",
      path: "/playroom",
      title: "놀이방",
      icon: (isSelected: boolean) =>
        isSelected ? (
          <i className="fi fi-rr-home" />
        ) : (
          <i className="fi fi-rr-home" />
        ),
    },
    {
      name: "wishlist",
      path: "/favorites",
      title: "찜",
      icon: (isSelected: boolean) =>
        isSelected ? (
          <i className="fi fi-rr-home" />
        ) : (
          <i className="fi fi-rr-home" />
        ),
    },
    {
      name: "profile",
      path: "/mypage",
      title: "마이",
      icon: (isSelected: boolean) =>
        isSelected ? (
          <i className="fi fi-rr-home" />
        ) : (
          <i className="fi fi-rr-home" />
        ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 w-full max-w-md transform -translate-x-1/2"
      style={{
        backgroundColor: COLORS.WHITE,
        height: 72,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex h-full">
        {tabItems.map((item) => {
          const isSelected =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex-1"
              style={{ textDecoration: "none" }}
            >
              <CustomTabBarButton
                onPress={() => {}}
                accessibilityLabel={item.title}
                isSelected={isSelected}
                href={item.path}
              >
                {item.icon(isSelected)}
              </CustomTabBarButton>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

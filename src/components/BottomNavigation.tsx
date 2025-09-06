import { Link, useLocation } from "react-router-dom";

function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: "🏠",
      label: "홈",
      activeColor: "text-purple-500 bg-purple-50",
    },
    {
      path: "/playroom",
      icon: "🎮",
      label: "놀이방",
      activeColor: "text-green-500 bg-green-50",
    },
    {
      path: "/favorites",
      icon: "❤️",
      label: "찜",
      activeColor: "text-red-500 bg-red-50",
    },
    {
      path: "/mypage",
      icon: "👤",
      label: "마이페이지",
      activeColor: "text-indigo-500 bg-indigo-50",
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? item.activeColor
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavigation;

export const Background = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage:
          "url('/assets/images/background/background_afternoon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: 0.7,
      }}
    ></div>
  );
};

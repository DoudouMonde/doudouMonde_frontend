export async function initMsw() {
  if (typeof window === "undefined") return; // SSR 회피
  const { worker } = await import("./browser");
  await worker.start({
    onUnhandledRequest: "bypass", // 핸들러 없는 요청은 그냥 통과
    serviceWorker: {
      url: "/mockServiceWorker.js", // CRA/Next SPA면 기본 경로 OK
    },
  });
  console.log("[MSW] started");
}

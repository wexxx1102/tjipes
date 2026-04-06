async function bootTauriBridge() {
  if (!window.__TAURI_INTERNALS__) {
    return;
  }

  if (typeof window.__TAURI_INTERNALS__.invoke === "function") {
    window.__TAURI__.invoke = (command, args) => window.__TAURI_INTERNALS__.invoke(command, args);
  }
  if (typeof window.__TAURI_INTERNALS__.convertFileSrc === "function") {
    window.__TAURI__.convertFileSrc = window.__TAURI_INTERNALS__.convertFileSrc;
  }

  try {
    const core = await import("./node_modules/@tauri-apps/api/core.js");
    const event = await import("./node_modules/@tauri-apps/api/event.js");
    window.__TAURI__.invoke = core.invoke;
    if (typeof core.convertFileSrc === "function") {
      window.__TAURI__.convertFileSrc = core.convertFileSrc;
    }
    if (typeof event.listen === "function") {
      window.__TAURI__.listen = event.listen;
    }
    window.dispatchEvent(new Event("tauri-bridge-ready"));
  } catch (error) {
    console.warn("Tauri bridge load failed", error);
  }
}

bootTauriBridge();

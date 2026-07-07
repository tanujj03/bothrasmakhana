import { create } from "zustand";

interface UIState {
  welcomePopupOpen: boolean;
  setWelcomePopupOpen: (open: boolean) => void;
}

// Lets independent fixed-position overlays (WelcomePopup, CookieConsentBanner)
// coordinate visibility without one having to know the other's internals —
// avoids z-index/timing games between overlays that don't otherwise share state.
export const useUIStore = create<UIState>((set) => ({
  welcomePopupOpen: false,
  setWelcomePopupOpen: (open) => set({ welcomePopupOpen: open }),
}));

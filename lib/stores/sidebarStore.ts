import { createStore } from "zustand";

export type SidebarState = {
	expanded: boolean;
	minimized: boolean;
};

export type SidebarActions = {
	toggle: () => void;
	setExpanded: (newState: boolean) => void;
	setMinimized: (newState: boolean) => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const defaultInitState: SidebarState = {
	expanded: false, // is showing icons and text if true. If false it only shows icons
	minimized: true, // if true do not show any icons and text. if false it shows only icons
};

export const createSidebarStore = (
	initState: SidebarState = defaultInitState
) => {
	return createStore<SidebarStore>()((set) => ({
		...initState,
		toggle: () => set((state) => ({ expanded: !state.expanded })),
		setExpanded: (newState) => set(() => ({ expanded: newState })),
		setMinimized: (newState) => set(() => ({ minimized: newState })),
	}));
};

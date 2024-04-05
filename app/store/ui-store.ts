import { StateCreator } from 'zustand/vanilla';

export interface IUIData {
	mode: 'light' | 'dark';
}

export interface IUIActions {
	toggleMode: () => void;
}

export type TUIStore = IUIData & IUIActions;

export const createUiStore =
	<T extends TUIStore>(): StateCreator<T, [], [], TUIStore> =>
	(set) => ({
		mode: 'light',
		toggleMode: () =>
			set((state) => ({
				...state,
				mode: state.mode === 'light' ? 'dark' : 'light',
			})),
	});

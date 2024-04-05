import { create } from 'zustand';
import { persistNSync } from 'persist-and-sync';
// @stores
import { createAuthStore } from './store';
import { createUiStore, TUIStore } from './ui-store';
import { createDataStore } from './data-store';
import { TAuthStore, TDataStore } from './types';

export const useStore = create<TAuthStore>()(
	persistNSync(
		(...a) => ({
			...createAuthStore()(...a),
		}),
		{ name: 'store' }
	)
);

export const useUiStore = create<TUIStore>()(
	persistNSync(
		(...a) => ({
			...createUiStore()(...a),
		}),
		{ name: 'ui-store' }
	)
);

export const useDataStore = create<TDataStore>()(createDataStore());

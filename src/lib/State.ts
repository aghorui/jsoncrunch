import { writable, type Writable } from "svelte/store";
import { ViewportViewType, type ContextMenuEvent } from "./Types";

export let hightlightedJsonElement: object = null

export let pageTitle: Writable<string> = writable("JsonTx")

export let currentView: Writable<ViewportViewType> = writable(ViewportViewType.VISUAL)

export let contextMenuTargetSet: Writable<Map<string, ContextMenuEvent>> = writable(new Map<string, ContextMenuEvent>());

export let aboutPopupShown: Writable<boolean> = writable(false)

export let settingsPopupShown: Writable<boolean> = writable(false)

export let textInputError: Writable<string> = writable("")

export let filterText: Writable<string> = writable("")
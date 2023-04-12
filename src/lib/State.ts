import { writable, type Writable } from "svelte/store";
import { ViewportViewType } from "./Types";

export let hightlightedJsonElement: object = null

export let pageTitle: Writable<string> = writable("JsonTx")

export let currentView: Writable<ViewportViewType> = writable(ViewportViewType.VISUAL)

export let contextMenuTargetSet: Writable<Map<string, object>> = writable(new Map<string, object>());
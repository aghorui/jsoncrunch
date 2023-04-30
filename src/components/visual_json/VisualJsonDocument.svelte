<script lang="ts">
	import { onMount } from "svelte";
	import App from "../../App.svelte";
	import { pageTitle } from "../../lib/State";
	import VisualJsonObject from "./VisualJsonObject.svelte";
	import FilterTable from "../filter_table/FilterTable.svelte";
	import type { IndexEntry } from "../../lib/Types";

	export let targetDocumentName: string = "";
	export let targetDocument: object | Array<any> = {};
	export let filterMode: boolean = false
	export let shown: boolean = false;

	onMount(() => {
		$pageTitle = targetDocumentName + " - JsonTx";
	})


	$: $pageTitle = targetDocumentName + " - JsonTx";

	$: thing = targetDocument as Array<IndexEntry>
</script>

{#if !filterMode}

<div class="jsondocument" style:display={shown ? "flex" : "none"}>
	<slot />

	<div class="jsondocument-body">
		<ul class="objectwrapper">
			<VisualJsonObject
				on:contextEvent
				on:removeContextEvent
				on:clearContextEvent
				on:treeUpdatedEvent
				title={"root"}
				targetObject={targetDocument}
				parentPathString={""} />
		</ul>
	</div>
</div>

{:else}

<FilterTable filterList={thing} />

{/if}

<style>
	.jsondocument {
		font-size: 10px;
		padding: 5px;
		font-family: monospace;
		overflow-x: auto;
		overflow-y: auto;
		white-space: nowrap;
		flex: 1 0 1px;
		flex-direction: column;
		box-shadow: 0px 5px 5px -4px rgba(0,0,0,0.4) inset;
	}

	.objectwrapper {
		margin-left: 20px;
		padding-left: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		list-style: none;
		box-sizing: border-box;
		transition: background-color 0.1s;
	}
</style>
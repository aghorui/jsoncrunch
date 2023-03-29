<script lang="ts">
    import { onMount } from "svelte";
	import App from "../App.svelte";
    import { pageTitle } from "../lib/State";
	import VisualJsonObject from "./VisualJsonObject.svelte";

	export let targetDocumentName: string = "";
	export let targetDocument: object | [any] = {};

	onMount(() => {
		$pageTitle = targetDocumentName + " - JsonTx";
	})


	$: $pageTitle = targetDocumentName + " - JsonTx";
</script>

<div class="jsondocument">
	<h2>{targetDocumentName}</h2>

	<div class="jsondocument-body">
		<ul class="objectwrapper">
			<VisualJsonObject
				on:contextEvent
				title={"root"}
				targetObject={targetDocument}
				parentPath={""} />
		</ul>
	</div>
</div>

<style>
	.jsondocument {
		font-size: 10px;
		margin: 5px;
		padding: 5px;
		font-size: 10px;
		font-family: monospace;
		overflow: auto;
		white-space: nowrap;
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
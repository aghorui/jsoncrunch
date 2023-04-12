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
				on:removeContextEvent
				on:clearContextEvent
				title={"root"}
				targetObject={targetDocument}
				parentPath={""} />
		</ul>
	</div>
</div>

<style>
	.jsondocument {
		font-size: 10px;
		padding: 5px;
		font-family: monospace;
		overflow: auto;
		white-space: nowrap;
		flex: 1;
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
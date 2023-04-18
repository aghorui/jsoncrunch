<script lang="ts">
	import VisualJsonObject from "./visual_json/VisualJsonObject.svelte";
	export let targetDocumentName: string = "";
	export let targetDocument: object | [any] = {};

</script>

<div class="jsondocument">

	<h2>{targetDocumentName}</h2>

	<div class="jsondocument-body">
		<ul class="objectwrapper">
			<VisualJsonObject title={"root"} targetObject={targetDocument} />
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
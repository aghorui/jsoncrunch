<!--
	FilterTable.svelte: Creates a table for filter results.

	This file is part of JsonTx.
-->

<script lang="ts">
	import { JsonTypeNames, type IndexEntry } from "../../lib/Types";


export let filterList: Array<IndexEntry> = []

</script>

<table class="filter-table">
	<tr>
		<th>No.</th>
		<th>Path</th>
		<th>Key</th>
		<th>Type</th>
		<th>Value</th>
	</tr>

	{#each filterList as entry, i}
		<tr>
			<td>{i}</td>
			<td>{entry.path}</td>
			<td>{entry.key}</td>
			<td>{JsonTypeNames[entry.type]}</td>
			<td>{entry.data}</td>
		</tr>
	{/each}
</table>

<style>

table {
	margin: 5px;
	border-collapse: collapse;
	background: #CCCCCC;
}

th, td {
	border-bottom: 1px solid black;
	text-align: left;
	padding: 5px;
}

</style>
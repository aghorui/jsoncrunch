<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { ToggleSelectorOptions } from "../../lib/Types";
	import { makeArray } from "../../lib/Util";
	import { onMount } from "svelte";

	export let options: Array<ToggleSelectorOptions> = [];
	export let currentSelected: Array<boolean> = null;
	// export let radioMode: boolean = false;

	function updateCurrentSelected(length: number) {
		currentSelected = makeArray(length, false);
	}

	function selectOption(i: number) {
		if (i < 0) {
			return;
		}
		if (options[i].enabled === false) {
			return;
		}

		currentSelected[i] = !currentSelected[i];
		currentSelected = currentSelected;
	}

	function getOptionClass(currentSelected, i: number): string {
		console.log("here", i, options[i].enabled, currentSelected[i] )
		if (i < 0) {
			return;
		}
		if (!options[i].enabled) {
			return "toggle-option-disabled";
		} else if (currentSelected[i] === true) {
			return "toggle-option-active";
		} else {
			return "toggle-option";
		}
	}

	// For some reason if the variable on the lhs of '=' of a dollar block is
	// updated, the dollar blocks will execute. This is a workaround to that.
	$: updateCurrentSelected(options.length);

</script>

<div class="toggle-selector">
	{#each currentSelected as value, i}
		<div
			class={getOptionClass(currentSelected, i)}
			on:click={() => {selectOption(i)}}
			on:keypress={() => {selectOption(i)}}>{options[i].key}, {currentSelected[i] === true}</div>
	{/each}
</div>

<style>

	.toggle-selector {
		display: flex;
		font-size: 12px;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		background-color: #222222;
		color: white;
		box-sizing: border-box;
		overflow: hidden;
	}

	.toggle-option {
		padding: 2px 5px 2px 5px;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-option:hover {
		background-color:#444444;
	}

	.toggle-option-active {
		padding: 2px 5px 2px 5px;
		cursor: default;
		user-select: none;
		background-color: #334433;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-option-disabled {
		padding: 2px 5px 2px 5px;
		cursor: not-allowed;
		user-select: none;
		background-color: #484848;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-style: italic;
		color: #D0D0D0;
	}

</style>
<script lang="ts">
	import type { Writable } from "svelte/store";

	type ToggleSelectorOptions = { key: string, value: any, enabled: boolean };

	export let currentSelected: Writable<any> = null;
	export let options: Array<ToggleSelectorOptions> = [];

	function selectOption(option: ToggleSelectorOptions) {
		if (option.enabled === false) {
			return;
		}
		$currentSelected = option.value;
	}

	function getOptionClass(option: ToggleSelectorOptions, currentSelected) {
		if (!option.enabled) {
			return "toggle-option-disabled";
		} else if (option.value === currentSelected) {
			return "toggle-option-active";
		} else {
			return "toggle-option";
		}
	}
</script>

<div class="toggle-selector">
	{#each options as option}
		<div
			class={getOptionClass(option, $currentSelected)}
			on:click={() => {selectOption(option)}}
			on:keypress={() => {selectOption(option)}}>{option.key}</div>
	{/each}
</div>

<style>
	.toggle-selector {
		display: flex;
		font-size: 12px;
		align-items: stretch;
		justify-content: center;
		flex-direction: row;
		background-color: #A1A1A1;
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
		background-color:#C7C7C7;
	}

	.toggle-option-active {
		padding: 2px 5px 2px 5px;
		cursor: default;
		user-select: none;
		background-color: #7A7A7A;
		border-bottom: 2px solid #222222;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-option-disabled {
		padding: 2px 5px 2px 5px;
		cursor: not-allowed;
		user-select: none;
		background-color: #A1A1A1;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-style: italic;
		color: #D0D0D0;
	}
</style>
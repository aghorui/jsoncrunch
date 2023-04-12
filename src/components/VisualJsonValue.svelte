<script lang="ts">
    import { JsonTypeNames } from "../lib/Types";
    import { copyText, hasWhiteSpace, isInteger } from "../lib/Util";
	export let key: string = "";
	export let value: string|null = "";
	export let displayValue: boolean = true;
	export let displayKey: boolean = true;
	export let rightEdgeColor: string = "green";
	export let parentPath: string = "";
	export let valueType: string = "";

	export let isHighlighted: boolean = false;

	export let persistentHighlight: boolean = false;

	function getIndexRepresentation(s: string): string {
		// objects can also have empty strings as keys
		if (s === "" || hasWhiteSpace(s)) {
			return `['${s}']`;
		} else if (isInteger(s)) {
			return `[${s}]`;
		} else {
			return `.${s}`;
		}
	}

	$: currentPath =  parentPath + getIndexRepresentation(key);
	$: backgroundColor = persistentHighlight ? "rgba(0, 0, 0, 0.2)" :
							  (isHighlighted ? "rgba(0, 0, 0, 0.1)" :
							  "unset");
	$: titleColor = isHighlighted ? "lightyellow" : "#FAFAFA";

	$: valueLabelBackgroundColor = value === null ? "gray" : "unset";

</script>

<li class="valueblock-container"
	style:background-color={backgroundColor}
	on:mouseenter={() => {isHighlighted = true;}}
	on:mouseleave={() => {isHighlighted = false;}}>
	<div class="valueblock" style:border-right-color={rightEdgeColor}>
		{#if displayKey}<div class="valueblock-label">{key}</div>{/if}{#if displayValue}<div class="valueblock-value" style:background-color={valueLabelBackgroundColor}>{value}</div>{/if}
	</div>

	{#if isHighlighted}
		<div class="toolbar" style:display="inline-block">
			<button type="button">Info</button>
			<!-- <button type="button">Delete</button>
			<button type="button" on:click={() => { copyText(currentPath) }}>Copy Path</button>
			<button type="button" on:click={() => { copyText(key) }}>Copy Key</button>
			<button type="button" on:click={() => { copyText(value) }}>Copy Value</button> -->
			<div class="path" style:display="inline-block">{currentPath} : <i>{JsonTypeNames[valueType]}</i></div>
		</div>
	{/if}
</li>

<style>
	button {
		font-size: 10px;
	}

	.valueblock-label {
		border-right: 1px solid black;
		background-color: #E0E0E0;
		display: inline-block;
		padding: 4px;
	}

	.valueblock-container {
		margin-left: 8px;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.valueblock-value {
		font-style: italic;
		display: inline-block;
		padding: 4px;
		padding-left: 4px;
		padding-right: 4px;
	}

	.valueblock {
		border: 1px solid black;
		border-right: 5px solid green;
		border-radius: 2px;
		display: inline-block;
		background-color: #FAFAFA;
	}

	.valueblock-container:hover .valueblock {
		background-color: lightyellow;
	}

</style>
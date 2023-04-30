<script lang="ts">
	import { JsonType, JsonTypeNames, RightBorderStyle } from "../../lib/Types";
	import { copyText } from "../../lib/Util";


	export let titleColor: string = "";
	export let rightBorderColor: string = "blue";
	export let title: string = "";
	export let displayValue: boolean = true;
	export let value: string = "";
	export let rightBorderStyle: RightBorderStyle = RightBorderStyle.NORMAL;

	let rightBorderClass: string = "";

	$: switch(rightBorderStyle) {
		case RightBorderStyle.TRIANGLE: rightBorderClass = "right-border-triangle"; break;
		case RightBorderStyle.INVERSE_TRIANGLE: rightBorderClass = "right-border-inverse-triangle"; break;
		case RightBorderStyle.RECTANGLE: rightBorderClass = "right-border-rectangle"; break;
		case RightBorderStyle.NORMAL: break;
		default: break;
	}
</script>

<div class="title" style:background-color={titleColor}>
	<div class="label">{title}</div>
	{#if displayValue} <div class="value">{value}</div> {/if}
	<div class={`right-border ${rightBorderClass}`} style:background-color={rightBorderColor}></div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: row;
		cursor: pointer;
		user-select: none;
	}

	.label {
		flex: 1;
		border: 1px solid black;
		padding: 4px;
		border-right: none;
		background-color: #FAFAFA;
	}

	.value {
		flex: 1;
		border: 1px solid black;
		padding: 4px;
		border-right: none;
		background-color: #E0E0E0;
	}

	.right-border {
		content: "";
		width: 5px;
		min-width: 5px;
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		border-bottom-right-radius: 3px;
		border-top-right-radius: 3px;
	}

	.right-border-triangle {
		width: 8px;
		border-right: none;
		clip-path: polygon(0% 0%, 5% 0%, 100% 50%, 5% 100%, 0% 100%);
	}

	.right-border-rectangle {
		border-radius: 0;
	}

	.right-border-inverse-triangle {
		width: 8px;
		border-right: none;
		border-radius: 0;
		clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%);
	}
</style>
<script lang="ts">
	import { JsonType, JsonTypeNames } from "../../lib/Types";
	import { copyText } from "../../lib/Util";
	export let titleColor: string = ""
	export let title: string = ""

</script>

<div class="title-label" style:background-color={titleColor}>
	{title}
	<div class="right-border"></div>
</div>

<style>
	.title-label {
		padding: 4px;
		border: 1px solid black;
		border-right: 5px solid blue;
		display: inline-block;
		background-color: #FAFAFA;
	}

	.right-border {
		width: 5px;
		min-width: 5px;
		height: 100%;
		background-color: red;
	}
</style>
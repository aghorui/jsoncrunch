<script lang="ts">
	import VisualJsonValue from "./VisualJsonValue.svelte";
	export let key: string = "";
	export let value: string | null = null;
</script>

<VisualJsonValue
	key={key}
	value={value}
	displayValue={true}
	displayKey={true}
	rightEdgeColor={"magenta"}/>
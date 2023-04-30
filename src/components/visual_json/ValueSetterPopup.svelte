<script lang="ts">
	import { JsonType, type JsonValue } from "../../lib/Types";
	import Popup from "../Popup.svelte";
	import ValueSetterDialog from "./ValueSetterDialog.svelte";

	export let onSubmit: (value: JsonValue, type: JsonType) => void = null;
	export let valueString: string = ""
	export let valueType: JsonType = JsonType.NULL
	export let shown: boolean = false;
</script>

<Popup bind:shown={shown} title={"Set Value"}>
	<ValueSetterDialog
		valueString={valueString}
		valueType={valueType}
		onSubmit={(value, type) => {
			shown = false;
			onSubmit(value, type);
		}} />
</Popup>
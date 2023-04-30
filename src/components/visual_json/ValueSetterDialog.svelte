<script lang="ts">
	import { JsonType, JsonTypeNames, isNumber, type JsonValue, isObjectAndNotArray, isArray } from "../../lib/Types";

	export let valueString: string = "";
	export let valueType: JsonType = JsonType.NULL;
	export let onSubmit: (value: JsonValue, type: JsonType) => void = null;

	let submitDisabled: boolean = false;
	let dataInvalid: boolean = false;
	let errorText: string = "";

	function validateValue(valueString: string) {
		let value;

		if (valueString.length === 0) {
			errorText = "";
			return;
		}

		if (valueType != JsonType.STRING) {
			try {
				value = JSON.parse(valueString);
			} catch(e) {
				errorText = `Value is not a valid ${JsonTypeNames[valueType]}`;
				dataInvalid = true;
				return;
			}
		}

		switch(valueType) {
			case JsonType.NUMBER:
				if (!isNumber(value)) {
					errorText = "Value is not a valid Number.";
					dataInvalid = true;
					return;
				}
				break;

			case JsonType.OBJECT:
				if (!isObjectAndNotArray(value)) {
					errorText = "Value is not a valid Object.";
					dataInvalid = true;
					return;
				}
				break;

			case JsonType.ARRAY:
				if (!isArray(value)) {
					errorText = "Value is not a valid Array.";
					dataInvalid = true;
					return;
				}
				break;
		}

		errorText = "";
		dataInvalid = false;
		return;
	}

	$: validateValue(valueString)

	$: if (valueType === JsonType.NULL) {
		valueString = "null";
		errorText = "";
	} else if (valueType === JsonType.BOOLEAN) {
		valueString = "false";
		errorText = "";
	} else {
		valueString = "";
		errorText = "";
	}

	$: if ((valueString.length === 0 && valueType != JsonType.STRING) || dataInvalid) {
		submitDisabled = true;
	} else {
		submitDisabled = false;
	}
</script>

<div class="value-setter-dialog">
	<div class="top-row">

		<select bind:value={valueType}>
			{#each [
				JsonType.OBJECT,
				JsonType.ARRAY,
				JsonType.STRING,
				JsonType.NUMBER,
				JsonType.BOOLEAN,
				JsonType.NULL
			] as type}
				<option value={type}> {JsonTypeNames[type]} </option>
			{/each}
		</select>

		{#if valueType !== JsonType.NULL &&
			 valueType !== JsonType.INVALID &&
			 valueType !== JsonType.BOOLEAN }
			<input class="middle" type="text" bind:value={valueString} placeholder="enter value here"/>

		{:else if valueType === JsonType.BOOLEAN}
			<select class="middle" bind:value={valueString}>
				<option selected value={"false"}> false </option>
				<option value={"true"}> true </option>
			</select>

		{/if}

		<input type="button"
			on:click={() => onSubmit(valueType != JsonType.STRING ? JSON.parse(valueString) : valueString, valueType)}
			disabled={submitDisabled}
			value="Set"/>
	</div>

	<div class="bottom-row">
		{errorText}
	</div>
</div>

<style>
	.value-setter-dialog {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.top-row {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.bottom-row {
		color: coral;
	}

	.middle {
		flex: 1;
	}

	input[type="text"] {
		min-width: 0;
	}

	select {
		min-width: 70px;
	}


</style>
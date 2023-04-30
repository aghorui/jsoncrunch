<script lang="ts">
	import { filterText, initialDocument, finalDocument, overlayCursorStyle, overlayShown, filterMode, contextMenuTargetSet, sidebarWidth } from "../../lib/State";
	import { JsonTypeNames, type ContextMenuEvent, JsonType } from "../../lib/Types";
	import { buildIndex } from "../../lib/Util";
	import ValueSetterDialog from "../visual_json/ValueSetterDialog.svelte";
	import PropertyButton from "./PropertyButton.svelte";
	import PropertyLabel from "./PropertyLabel.svelte";
	import PropertySection from "./PropertySection.svelte";
	import PropertySelector from "./PropertySelector.svelte";
	import PropertyValueInput from "./PropertyValueInput.svelte";

	let targetKey: string = ""
	let targetType: JsonType = JsonType.INVALID
	let targetTypeString: string = ""
	let targetValue: any = null
	let targetChildrenCount: string = ""

	$: maxWidthInput = `${$sidebarWidth}px`

	$: {
		if ($contextMenuTargetSet.size === 1) {
			let target: ContextMenuEvent = $contextMenuTargetSet.values().next().value;
			console.log(target);
			targetKey = target.key;
			targetType = target.type;
			targetTypeString = JsonTypeNames[target.type];
			if (target.type === JsonType.ARRAY || target.type === JsonType.OBJECT) {
				targetChildrenCount = Object.keys(target.value).length.toString();
			} else {
				targetValue = target.value;
			}
		}
	}

	function updateValue(value: any) {
		let target: ContextMenuEvent = $contextMenuTargetSet.values().next().value;
	}
</script>

<div class="properties-view" style:max-width={maxWidthInput} style:width={maxWidthInput}>
	<div class="properties-view-inner">

		{#if $contextMenuTargetSet.size === 1}
		<PropertySection title={"Object Properties"}>
			<PropertyLabel>Key:</PropertyLabel>
			<PropertyValueInput readonly={true} value={targetKey} />

			<PropertyLabel>Type:</PropertyLabel>
			<PropertyValueInput readonly={true} value={targetTypeString} />

			{#if targetType === JsonType.ARRAY || targetType === JsonType.OBJECT}
				<PropertyLabel>Children:</PropertyLabel>
				<PropertyValueInput readonly={true} value={targetChildrenCount} />
			{:else}
				<PropertyLabel>Value:</PropertyLabel>
				<PropertyValueInput readonly={true} value={targetValue} />
			{/if}
		</PropertySection>
		{/if}

		<PropertySection title={"Filter"}>
			<PropertyValueInput bind:value={$filterText} placeholder="enter something"/>
			<!-- <PropertySelector options={[
				{ key: "Select One",   value: 1,   enabled: true  },
				{ key: "Select Two",   value: 2,   enabled: true  },
				{ key: "Select Three",   value: 3,   enabled: true  }
			]} /> -->

			<PropertyButton label="search query" onclick={() => {
				let index = buildIndex($initialDocument)
				console.log($filterText)
				$finalDocument = index.filter((k) => k.key.includes($filterText))
				$filterMode = true;
			 }}/>
			<PropertyButton label="reset" onclick={() => {
				$filterMode = false;
				$filterText = "";
				$finalDocument = $initialDocument;
			}}/>
		</PropertySection>
		<PropertySection title={"History"}>
			There will be history in the future.
		</PropertySection>

		<PropertySection title={"Message"}>
			Do you like using this? If you do I'd really appreciate it if you
			would consider starring the project's Github at:
			<a href="https://github.com/aghorui/jsoncrunch">https://github.com/aghorui/jsoncrunch</a>
		</PropertySection>
	</div>


</div>

<style>

.properties-view {
	display: flex;
	font-size: 12px;
	flex-direction: column;
	overflow: auto;
	min-width: 250px;
	max-width: 250px; /* ADJUST THIS VALUE  */
	min-height: 80px;
	height: 100%;
	background-color: #666666;
	color: white;
	box-sizing: border-box;
	border-left: 1px solid black;
}

.properties-view-inner {
	display: flex;
	flex-direction: column;
	overflow: auto;
	flex: 1 0 1px;
	padding: 10px;
	gap: 10px;
}

</style>
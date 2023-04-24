<script lang="ts">
	import { filterText, initialDocument, finalDocument, overlayCursorStyle, overlayShown, filterMode } from "../../lib/State";
    import { buildIndex } from "../../lib/Util";
	import PropertyButton from "./PropertyButton.svelte";
	import PropertyLabel from "./PropertyLabel.svelte";
	import PropertySection from "./PropertySection.svelte";
	import PropertySelector from "./PropertySelector.svelte";
	import PropertyValueInput from "./PropertyValueInput.svelte";

	let maxWidth: number = 250
	let maxWidthInput: string = maxWidth + "px";
	let splitterFocused: boolean = false;
	let resizeStarted: boolean = false;

	function updateWidth(e: MouseEvent) {
		e.stopPropagation()
		maxWidth = maxWidth - e.movementX;
	}

	function startUpdateWidth() {
		$overlayShown = true;
		$overlayCursorStyle = "ew-resize";
		addEventListener("mousemove", updateWidth);
		addEventListener("mouseup", stopUpdateWidth);
	}

	function stopUpdateWidth() {
		$overlayShown = false;
		resizeStarted = false;
		$overlayCursorStyle = "unset";
		removeEventListener("mousemove", updateWidth)
	}

	$: maxWidthInput = maxWidth + "px"
</script>

<div class="properties-view" style:max-width={maxWidthInput} style:width={maxWidthInput}>
	<div class="splitter-handle"
		on:mousedown={(e) => { e.stopPropagation(); if (splitterFocused) { startUpdateWidth(); } }}
		on:mouseenter={() => { splitterFocused = true; }}
		on:mouseleave={() => { splitterFocused = false; }}>
	</div>
	<div class="properties-view-inner">
		<PropertySection title={"Object Properties"}>
			<PropertyLabel>Key:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
			<PropertyLabel>Type:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
			<PropertyLabel>Children:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
		</PropertySection>
		<PropertySection title={"Filter"}>
			<PropertyValueInput bind:value={$filterText} placeholder="enter something"/>
			<PropertySelector options={[
				{ key: "Select One",   value: 1,   enabled: true  },
				{ key: "Select Two",   value: 2,   enabled: true  },
				{ key: "Select Three",   value: 3,   enabled: true  }
			]} />

			<PropertyButton label="search query" onclick={() => {
				let index = buildIndex($initialDocument)
				console.log($filterText)
				$finalDocument = index.filter((k) => k.key.includes($filterText))
				$filterMode = true;
			 }}/>
			<PropertyButton label="reset"/>
		</PropertySection>
		<PropertySection title={"History"}>
			There will be history in the future.
		</PropertySection>
	</div>
</div>

<style>

.properties-view {
	display: flex;
	font-size: 12px;
	flex-direction: row;
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

.splitter-handle {
	width: 3px;
	background-color: black;
	cursor: ew-resize;
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
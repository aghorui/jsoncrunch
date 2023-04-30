<script lang="ts">
	import { overlayCursorStyle, overlayShown, sidebarWidth } from "../../lib/State";

	let splitterFocused: boolean = false;

	function updateWidth(e: MouseEvent) {
		e.stopPropagation()
		$sidebarWidth = $sidebarWidth - e.movementX;
	}

	function startUpdateWidth() {
		$overlayShown = true;
		$overlayCursorStyle = "ew-resize";
		addEventListener("mousemove", updateWidth);
		addEventListener("mouseup", stopUpdateWidth);
	}

	function stopUpdateWidth() {
		$overlayShown = false;
		$overlayCursorStyle = "unset";
		removeEventListener("mousemove", updateWidth)
	}
</script>

<div class="splitter-handle"
	on:mousedown={(e) => { e.stopPropagation(); if (splitterFocused) { startUpdateWidth(); } }}
	on:mouseenter={() => { splitterFocused = true; }}
	on:mouseleave={() => { splitterFocused = false; }}>
</div>

<style>
	.splitter-handle {
		width: 3px;
		background-color: black;
		cursor: ew-resize;
		height: 100%;
	}
</style>
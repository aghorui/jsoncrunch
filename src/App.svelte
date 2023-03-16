<script lang="ts">
	import VisualJsonContextMenu from './components/VisualJsonContextMenu.svelte';
	import VisualJsonDocument from './components/VisualJsonDocument.svelte';
    import { pageTitle } from './lib/State';
	let sampleData: object = {"widget": {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "ima ge": {
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOff set": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
}};

	let contextMenuFocused: boolean = false;
	let contextMenuShown: boolean = false;
	let contextMenuX: number = 0;
	let contextMenuY: number = 0;
	let contextMenuTarget: any = null;
	let contextMenuDelete: () => void = null;
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={() => { if (!contextMenuFocused) { contextMenuShown = false; } }}>
	<VisualJsonContextMenu
		bind:contextMenuFocused={contextMenuFocused}
		bind:isShown={contextMenuShown}
		target={contextMenuTarget}
		x={contextMenuX}
		y={contextMenuY}/>
	<VisualJsonDocument on:contextEvent={(e) => {
		contextMenuShown = true;
		contextMenuX = e.detail.x;
		contextMenuY = e.detail.y;
		contextMenuTarget = e.detail.target;
		contextMenuDelete = e.detail.deleteObject;
		contextMenuFocused = true;
		console.log(e, contextMenuX, contextMenuY);
	}} targetDocument={sampleData} targetDocumentName={"sampleData"}  />
</main>
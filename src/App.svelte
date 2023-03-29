<script lang="ts">
    import MenuBar from './components/MenuBar.svelte';
import Notification from './components/Notification.svelte';
    import PropertiesView from './components/PropertiesView.svelte';
	import VisualJsonContextMenu from './components/VisualJsonContextMenu.svelte';
	import VisualJsonDocument from './components/VisualJsonDocument.svelte';
	import { pageTitle } from './lib/State';
	import { JsonType, type ContextMenuEvent } from './lib/Types';

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
	let contextMenuTargetPath: string = "(no path)";
	let contextMenuTargetType: JsonType = JsonType.INVALID;
	let contextMenuDelete: () => void = null;
	let contextMenuTogglePin: () => void = null;
	let contextMenuTargetSet: Map<string, object> = new Map<string, object>();

	function showContextMenu(e) {
		contextMenuShown = true;
		contextMenuX = e.detail.x;
		contextMenuY = e.detail.y;
		contextMenuTarget = e.detail.target;
		contextMenuTargetPath = e.detail.path;
		contextMenuTargetType = e.detail.type;
		contextMenuTogglePin = e.detail.togglePin;
		contextMenuDelete = e.detail.deleteObject;
		contextMenuFocused = true;
		console.log(e, contextMenuX, contextMenuY);
		contextMenuTargetSet.set(e.detail.path, e.detail);
		contextMenuTargetSet = contextMenuTargetSet
		console.log("thing: ", contextMenuTargetSet)
	}

	function clearContextMenu(e) {
		contextMenuShown = false;
		contextMenuTargetSet.clear();
		contextMenuTargetSet = contextMenuTargetSet
	}

	function contextMenuRemoveElement(e) {
		console.log("removing ", e.detail.key)
		contextMenuTargetSet.delete(e.detail.key)
		contextMenuTargetSet = contextMenuTargetSet
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={() => { if (!contextMenuFocused) { contextMenuShown = false; } }}>
<!-- 	<div style="width:100%; box-sizing: border-box; position: fixed:">
		<Notification text="test notification" />
	</div> -->

<div style="display: flex; flex-direction: column; max-height: 100vh;">
	<MenuBar />
	<div style="display: flex; flex-direction: row; flex: 1; max-height: calc(100vh - 30px);">
		<div style="flex: 1; display: flex; flex-direction: column; max-height: calc(100vh - 30px);">
			<VisualJsonContextMenu
				bind:contextMenuFocused={contextMenuFocused}
				bind:isShown={contextMenuShown}
				bind:targetSet={contextMenuTargetSet}
				target={contextMenuTarget}
				path={contextMenuTargetPath}
				targetType={contextMenuTargetType}
				togglePin={contextMenuTogglePin}
				deleteObject={contextMenuDelete}
				x={contextMenuX}
				y={contextMenuY} />
			<VisualJsonDocument
				on:contextEvent={showContextMenu}
				on:clearContextEvent={clearContextMenu}
				on:removeContextEvent={contextMenuRemoveElement}
				targetDocument={sampleData}
				targetDocumentName={"sampleData"}/>
		</div>

		<PropertiesView />
	</div>
</div>
</main>
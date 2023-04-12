<script lang="ts">
	import AboutPopup from './components/AboutPopup.svelte';
	import MenuBar from './components/MenuBar.svelte';
	import Notification from './components/Notification.svelte';
	import PropertiesView from './components/PropertiesView.svelte';
	import ContextMenu from './components/ContextMenu.svelte';
	import VisualJsonDocument from './components/VisualJsonDocument.svelte';
	import { contextMenuTargetSet, currentView, pageTitle } from './lib/State';
	import { JsonType, ViewportViewType, type ContextMenuEvent } from './lib/Types';
    import TextView from './components/TextView.svelte';
    import ToggleSelector from './components/ToggleSelector.svelte';

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

	let textInputJson: string = JSON.stringify(sampleData, null, 4)

	let contextMenuFocused: boolean = false;
	let contextMenuShown: boolean = false;
	let contextMenuX: number = 0;
	let contextMenuY: number = 0;
	let contextMenuTarget: any = null;
	let contextMenuTargetPath: string = "(no path)";
	let contextMenuTargetType: JsonType = JsonType.INVALID;
	let contextMenuDelete: () => void = null;
	let contextMenuTogglePin: () => void = null;

	let notificationShown:boolean = false;
	let notificationText = "";

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

		if (!e.detail.isMultiselect) {
			$contextMenuTargetSet.clear()
		}

		$contextMenuTargetSet.set(e.detail.path, e.detail);
		$contextMenuTargetSet = $contextMenuTargetSet

		console.log("thing: ", contextMenuTargetSet)
	}

	function clearContextMenu(e) {
		contextMenuShown = false;
		$contextMenuTargetSet.clear();
		$contextMenuTargetSet = $contextMenuTargetSet
	}

	function contextMenuRemoveElement(e) {
		console.log("removing ", e.detail.key)
		$contextMenuTargetSet.delete(e.detail.key)
		$contextMenuTargetSet = $contextMenuTargetSet
	}

	$: try {
		sampleData = JSON.parse(textInputJson)
	} catch (e) {
		console.log(e);
		notificationShown = true;
		notificationText = e.toString();
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={() => { if (!contextMenuFocused) { contextMenuShown = false; } }}>
	<div class="notification-container">
		<Notification bind:shown={notificationShown} bind:text={notificationText} />
	</div>

<!-- <AboutPopup /> -->

<div style="display: flex; flex-direction: column; flex-shrink: 0; max-height: 100vh; height: 100vh;">
	<MenuBar />
	<div style="display: flex; flex-direction: row; flex: 1;">
		<div style="flex: 1; display: flex; flex-direction: column; max-height: calc(100vh - 32px);">

			<div style="display: flex; flex-direction: row; border-bottom: 1px solid black;">
				<ContextMenu
					bind:contextMenuFocused={contextMenuFocused}
					bind:targetSet={$contextMenuTargetSet}
					target={contextMenuTarget}
					path={contextMenuTargetPath}
					targetType={contextMenuTargetType}
					togglePin={contextMenuTogglePin}
					deleteObject={contextMenuDelete}
					x={contextMenuX}
					y={contextMenuY} />
				<ToggleSelector
					options={
						[
							{ key: "Visual",   value: ViewportViewType.VISUAL,   enabled: true},
							{ key: "Source",   value: ViewportViewType.SOURCE,   enabled: true},
							{ key: "Metadict", value: ViewportViewType.METADICT, enabled: false}
						]
					}
					currentSelected={currentView} />
			</div>

			{#if $currentView === ViewportViewType.VISUAL}
				<VisualJsonDocument
					on:contextEvent={showContextMenu}
					on:removeContextEvent={contextMenuRemoveElement}
					targetDocument={sampleData}
					targetDocumentName={"sampleData"}/>

			{:else if $currentView === ViewportViewType.SOURCE}
				<TextView bind:code={textInputJson} />

			{:else if $currentView === ViewportViewType.METADICT}
				<TextView code={JSON.stringify(sampleData, null, 4)} />

			{:else}
				<p>Congratulations! You've found a bug!</p>

			{/if}
		</div>

		<PropertiesView />
	</div>
</div>
</main>

<style>
	.notification-container {
		position: fixed;
		width: 100%;
		z-index: 20000;
	}
</style>
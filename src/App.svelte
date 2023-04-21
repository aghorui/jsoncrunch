<script lang="ts">
	import AboutPopup from './components/AboutPopup.svelte';
	import MenuBar from './components/MenuBar.svelte';
	import Notification from './components/Notification.svelte';
	import PropertiesView from './components/sidebar/PropertiesView.svelte';
	import ContextMenu from './components/visual_json/ContextMenu.svelte';
	import VisualJsonDocument from './components/visual_json/VisualJsonDocument.svelte';
	import { aboutPopupShown, contextMenuTargetSet, currentView, filterText, pageTitle, settingsPopupShown, textInputError } from './lib/State';
	import { ViewportViewType, type ToggleSelectorOptions } from './lib/Types';
	import TextView from './components/text/TextView.svelte';
	import ToggleSelector from './components/ToggleSelector.svelte';
	import { buildIndex, type IndexEntry } from './lib/Util';
    import SettingsPopup from './components/SettingsPopup.svelte';

	let index: Array<IndexEntry> = null

	let sampleData: object =
	{
		"widget": {
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
		}
	};

	$: {
		index = buildIndex(sampleData)
		console.log(index)
		console.log(index.filter((k) => k.key.includes("e")))
	}


	let finalData: object = sampleData

	let toggleOptionVisual: ToggleSelectorOptions =
		{ key: "Visual",   value: ViewportViewType.VISUAL,   enabled: true  };
	let toggleOptionSource: ToggleSelectorOptions =
		{ key: "Source",   value: ViewportViewType.SOURCE,   enabled: true  };
	let toggleOptionMetadict: ToggleSelectorOptions =
		{ key: "Metadict", value: ViewportViewType.METADICT, enabled: true  };

	let toggleOptions: Array<ToggleSelectorOptions> = [
		toggleOptionVisual,
		toggleOptionSource,
		toggleOptionMetadict
	];

	let textInputJson: string = JSON.stringify(sampleData, null, 4);

	let notificationShown:boolean = false;
	let notificationText = "";

	function showContextMenu(e) {
		if (!e.detail.isMultiselect) {
			$contextMenuTargetSet.clear();
		}

		$contextMenuTargetSet.set(e.detail.path, e.detail);
		$contextMenuTargetSet = $contextMenuTargetSet;

		console.log("thing: ", contextMenuTargetSet);
	}

	function clearContextMenu(e) {
		$contextMenuTargetSet.clear();
		$contextMenuTargetSet = $contextMenuTargetSet;
	}

	function contextMenuRemoveElement(e) {
		console.log("removing ", e.detail.key);
		$contextMenuTargetSet.delete(e.detail.key);
		$contextMenuTargetSet = $contextMenuTargetSet;
	}

	$: try {
		sampleData = JSON.parse(textInputJson);
		$textInputError = "";
		toggleOptionMetadict.enabled = true;
		toggleOptionVisual.enabled = true;
		toggleOptions = toggleOptions;
	} catch (e) {
		$textInputError = e.message
		toggleOptionMetadict.enabled = false;
		toggleOptionVisual.enabled = false;
		toggleOptions = toggleOptions;
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main>

<div class="notification-container">
	<Notification bind:shown={notificationShown} bind:text={notificationText} />
</div>

<AboutPopup bind:shown={$aboutPopupShown} />
<SettingsPopup bind:shown={$settingsPopupShown} />

<div style="display: flex; flex-direction: column; flex-shrink: 0; max-height: 100vh; height: 100vh;">
	<MenuBar />
	<div style="display: flex; flex-direction: row; flex: 1;">
		<div style="flex: 1 0 1px; overflow: auto; display: flex; flex-direction: column; max-height: calc(100vh - 32px);">

			<div style="display: flex; flex-direction: row; border-bottom: 1px solid black;">
				<ContextMenu
					bind:targetSet={$contextMenuTargetSet}/>
				<ToggleSelector
					options={toggleOptions}
					currentSelected={currentView} />
			</div>

			<VisualJsonDocument
				on:contextEvent={showContextMenu}
				on:removeContextEvent={contextMenuRemoveElement}
				targetDocument={finalData}
				targetDocumentName={"sampleData"}
				shown={$currentView === ViewportViewType.VISUAL} />

			<TextView
				bind:code={textInputJson}
				bind:errorMessage={$textInputError}
				shown={$currentView === ViewportViewType.SOURCE} />

			<TextView
				code={JSON.stringify(sampleData, null, 4)}
				shown={$currentView === ViewportViewType.METADICT} />

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
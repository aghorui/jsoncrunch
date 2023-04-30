<!--
  --
  -- JsonTx - A Web UI for JSON querying, maipulating and transforming small to
  -- medium pieces of JSON data.
  --
  -- Copyright (C) 2023  Anamitra Ghorui
  --
  -- This program is free software: you can redistribute it and/or modify
  -- it under the terms of the GNU Affero General Public License as published by
  -- the Free Software Foundation, either version 3 of the License, or
  -- (at your option) any later version.
  --
  -- This program is distributed in the hope that it will be useful,
  -- but WITHOUT ANY WARRANTY; without even the implied warranty of
  -- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -- GNU Affero General Public License for more details.
  --
  -- You should have received a copy of the GNU Affero General Public License
  -- along with this program.  If not, see <https://www.gnu.org/licenses/>.
  --
  --
  -->

<script lang="ts">
	import AboutPopup from './components/AboutPopup.svelte';
	import MenuBar from './components/MenuBar.svelte';
	import Notification from './components/Notification.svelte';
	import PropertiesView from './components/sidebar/PropertiesView.svelte';
	import ContextMenu from './components/visual_json/ContextMenu.svelte';
	import VisualJsonDocument from './components/visual_json/VisualJsonDocument.svelte';
	import { aboutPopupShown, contextMenuTargetSet, currentView, filterMode, filterText, finalDocument, initialDocument, overlayCursorStyle, overlayShown, pageTitle, settingsPopupShown, textInputError, valueSetterPopupOnSubmit, valueSetterPopupShown, valueSetterPopupValueString, valueSetterPopupValueType } from './lib/State';
	import { ViewportViewType, type ToggleSelectorOptions, type IndexEntry } from './lib/Types';
	import TextView from './components/text/TextView.svelte';
	import ToggleSelector from './components/ToggleSelector.svelte';
	import { buildIndex } from './lib/Util';
	import SettingsPopup from './components/SettingsPopup.svelte';
	import Overlay from './components/Overlay.svelte';
	import FilterTable from './components/filter_table/FilterTable.svelte';
	import type { Writable } from 'svelte/store';
	import Config from './lib/Config';
	import PropertySplitter from './components/sidebar/PropertySplitter.svelte';
	import ValueSetterPopup from './components/visual_json/ValueSetterPopup.svelte';
	import IntroMessage from './components/IntroMessage.svelte';

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

	$initialDocument = sampleData;
	$finalDocument = $initialDocument;

	/*$: {
		index = buildIndex(sampleData)
		console.log(index)
		console.log(index.filter((k) => k.key.includes("e")))
		finalData2 = index.filter((k) => k.key.includes("e"))
	}*/

	let toggleOptionVisual: ToggleSelectorOptions =
		{ key: "Visual",   value: ViewportViewType.VISUAL,   enabled: true  };
	let toggleOptionSource: ToggleSelectorOptions =
		{ key: "Source",   value: ViewportViewType.SOURCE,   enabled: true  };
	let toggleOptionMetadict: ToggleSelectorOptions =
		{ key: "Metadict", value: ViewportViewType.METADICT, enabled: true  };

	let toggleOptions: Array<ToggleSelectorOptions> = [
		toggleOptionVisual,
		toggleOptionSource,
		/*toggleOptionMetadict*/
	];

	let textInputJson: string = JSON.stringify(sampleData, null, Config.JSONIndentSize);

	let notificationShown:boolean = false;
	let notificationText = "";

	function showContextMenu(e) {
		if (!e.detail.isMultiselect) {
			$contextMenuTargetSet.clear();
		}

		$contextMenuTargetSet.set(e.detail.path, e.detail);
		$contextMenuTargetSet = $contextMenuTargetSet;
	}

	function clearContextMenu(e) {
		$contextMenuTargetSet.clear();
		$contextMenuTargetSet = $contextMenuTargetSet;
	}

	function contextMenuRemoveElement(e) {
		$contextMenuTargetSet.delete(e.detail.key);
		$contextMenuTargetSet = $contextMenuTargetSet;
	}

	function updateSourceView(textInputJson: string) {
		if ($currentView === ViewportViewType.SOURCE) {
			try {
				sampleData = JSON.parse(textInputJson);
				$textInputError = "";
				toggleOptionMetadict.enabled = true;
				toggleOptionVisual.enabled = true;
				toggleOptions = toggleOptions;
				$finalDocument = sampleData;
			} catch (e) {
				$textInputError = e.message
				toggleOptionMetadict.enabled = false;
				toggleOptionVisual.enabled = false;
				toggleOptions = toggleOptions;
			}
		}
	}

	function treeUpdatedEventHandler(e) {
		console.log("Tree Updated", e)
		textInputJson = JSON.stringify($finalDocument, null, Config.JSONIndentSize)
	}

	$: updateSourceView(textInputJson);

</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main>

<div class="notification-container">
	<Notification bind:shown={notificationShown} bind:text={notificationText} />
</div>

<!-- blocks user input -->
<Overlay shown={$overlayShown} cursorStyle={$overlayCursorStyle}/>

<AboutPopup bind:shown={$aboutPopupShown} />
<SettingsPopup bind:shown={$settingsPopupShown} />
<ValueSetterPopup
	bind:shown={$valueSetterPopupShown}
	bind:valueString={$valueSetterPopupValueString}
	bind:valueType={$valueSetterPopupValueType}
	bind:onSubmit={$valueSetterPopupOnSubmit}
	/>

<div style="display: flex; flex-direction: column; flex-shrink: 0; max-height: 100vh; height: 100vh;">
	<MenuBar />
	<IntroMessage />
	<div style="display: flex; flex-direction: row; flex: 1;">
		<div style="flex: 1 0 1px; overflow: auto; display: flex; flex-direction: column;">

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
				on:treeUpdatedEvent={treeUpdatedEventHandler}
				filterMode={$filterMode}
				targetDocument={$finalDocument}
				targetDocumentName={"sampleData"}
				shown={$currentView === ViewportViewType.VISUAL}>
			</VisualJsonDocument>

			<TextView
				bind:code={textInputJson}
				bind:errorMessage={$textInputError}
				shown={$currentView === ViewportViewType.SOURCE} />

			<TextView
				code={JSON.stringify(sampleData, null, Config.JSONIndentSize)}
				shown={$currentView === ViewportViewType.METADICT} />

		</div>

		<PropertySplitter />

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
<script lang="ts">
	import AppInfo from "../lib/AppInfo";
	import { aboutPopupShown, settingsPopupShown } from "../lib/State";
</script>

<div class="menubar">
<item class="title" disabled={true}>JsonTx {AppInfo.appVersion}</item>
<div class="spacer"></div>
<button on:click={() => { $aboutPopupShown = true; }} class="item">About</button>
<button on:click={() => { $settingsPopupShown = true; }} class="item">Settings</button>
</div>

<style>
	.menubar {
		background-color: black;
		color: white;
		display: block;
		height: 30px;
		display: flex;
		align-items: center;
		align-content: center;
	}

	.title {
		flex-shrink: 0;
		font-weight: bold;
		margin-left: 5px;
		color: white;
	}


	.item {
		flex-shrink: 0;
		font-weight: bold;
		background: none;
		border: none;
		color: white;
		border-radius: 0;
		height: 100%;
	}

	.item:hover {
		background-color: #555555;
	}

	.spacer {
		width: 100%;
	}
</style>
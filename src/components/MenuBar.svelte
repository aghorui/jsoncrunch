<script lang="ts">
	import AppInfo from "../lib/AppInfo";
</script>

<div class="menubar">
<div class="item">JsonTx {AppInfo.appVersion}</div>

<div class="spacer"></div>


<div class="item">About</div>
<div class="item">Settings</div>
</div>

<style>
	.menubar {
		background-color: black;
		color: white;
		display: block;
		height: 24px;
		display: flex;
		align-items: center;
		align-content: center;
		padding: 3px;
	}

	.item {
		flex-shrink: 0;
		font-weight: bold;
		margin-left: 5px;
		margin-right: 5px;
	}

	.spacer {
		width: 100%;
	}
</style>
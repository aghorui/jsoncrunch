<script lang="ts">
    import AppInfo from "../lib/AppInfo";

	export let shown: boolean = false;
	export let title: string = AppInfo.appName;
</script>

{#if shown}

<div class="popup-container">
	<div class="popup">
		<div class="title">{title}</div>
		<hr />

		<div class="body">
			<slot />
		</div>
		<button class="close-button" on:click={() => { shown = false; }}>Close</button>
	</div>
</div>

{/if}

<style>
	.popup-container {
		background-color: rgba(0.25, 0.25, 0.25, 0.3);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 40000;
		width: 100vw;
		height: 100vh;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		max-width: 300px;
		width: 300px;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 3px;
		text-align: center;
	}

	.close-button {
		padding: 5px;
		margin: 5px;
		border: none;
		border-radius: 4px;
		font-weight: bold;
		background-color: #4260B6;
		color: white;
		display: inline-block;
		margin: auto;
	}

	.close-button:hover {
		background-color: #5D74B6;
	}

	.close-button:active {
		background-color: #3B6090;
	}

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		margin: 5px;
	}

	.body {
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>

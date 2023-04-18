<script lang="ts">
	export let shown: boolean = false
</script>

{#if shown}

<div class="about-popup-container">
	<div class="about-popup">
		<div class="title">JsonTx</div>
		<hr />

		<div class="body">
			© 2023 aghorui <br /><br />
			This software is available under the GNU Affero General Public License Version 3.<br /><br />
			<a href="aghorui.github.io">Website</a><br /><br />
			<a href="aghorui.github.io">Source Code</a><br /><br />

		</div>

		<button class="close-button" on:click={() => { shown = false; }}>Close</button>
	</div>
</div>

{/if}

<style>
	.about-popup-container {
		background-color: rgba(0.25, 0.25, 0.25, 0.3);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 40000;
		width: 100vw;
		height: 100vh;
	}

	.about-popup {
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

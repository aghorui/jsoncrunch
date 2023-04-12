<script lang="ts">
	export let text: string = ""
	export let shown: boolean = false
</script>

{#if shown}

<div class="notification" style:background-color="">
	<div class="notification-content">
		{text}
	</div>

	<button class="close" on:click={() => { shown = false; }}>x</button>
</div>

{/if}

<style>
	.notification {
		width: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		background-color: rgb(167, 42, 31, 0.9);
		color: white;
		padding: 4px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10px;
		margin-bottom: 10px;
		box-shadow: 0px 0px 4px 2px #00000044;
	}

	.notification-content {
		flex: 1;
	}

	.close {
		border: 1px solid black;
		background-color: rgb(160, 35, 24);
		color: white;
		font-weight: bold;
	}
</style>
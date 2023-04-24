<script lang="ts">
	export let shown: boolean = false;
	export let cursorStyle: string = "unset";
</script>

{#if shown}

<div class="overlay" style:cursor={cursorStyle}>

</div>

{/if}

<style>
	.overlay {
		background-color: rgba(0.0, 0.0, 0.0, 0.0);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 400000;
		width: 100vw;
		height: 100vh;
	}
</style>

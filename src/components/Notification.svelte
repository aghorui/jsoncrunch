<script lang="ts">
	export let text: string = ""

</script>

<div class="notification" style:background-color="">
{text}
</div>

<style>
	.notification {
		position: fixed;
		box-sizing: border-box;
		width: 100%;
		z-index: 10000;
		background-color: rgba(128, 128, 128, 0.9);
		color: white;
		padding: 5px;
		margin: 10px;
		/*box-shadow: 0px 0px 4px 2px #00000044;*/
	}
</style>
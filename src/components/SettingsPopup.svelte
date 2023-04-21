<script lang="ts">
	import Popup from "./Popup.svelte";
	export let shown: boolean = false;
</script>

<Popup bind:shown={shown}>
	Settings will be added later.
</Popup>

<script lang="ts">
	import Popup from "./Popup.svelte";
	export let shown: boolean = false;
</script>

<Popup bind:shown={shown}>
	© 2023 aghorui <br /><br />
	This software is available under the GNU Affero General Public License Version 3.<br /><br />
	<a href="https://aghorui.github.io">Website</a><br /><br />
	<a href="https://github.com/aghorui/jsoncrunch">Source Code</a><br /><br />
</Popup>

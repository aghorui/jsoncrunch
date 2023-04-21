<script lang="ts">
	export let labelFor: string = "";
</script>

<label for={labelFor} class="label"> <slot /> </label>

<style>
	.label {
		color: white;
	}
</style>
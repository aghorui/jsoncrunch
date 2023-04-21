<script lang="ts">
    import { filterText } from "../../lib/State";
    import PropertyButton from "./PropertyButton.svelte";
    import PropertyLabel from "./PropertyLabel.svelte";
import PropertySection from "./PropertySection.svelte";
    import PropertySelector from "./PropertySelector.svelte";
    import PropertyValueInput from "./PropertyValueInput.svelte";


</script>


<div class="properties-view">
	<div class="properties-view-inner">
		<PropertySection title={"Object Properties"}>
			<PropertyLabel>Key:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
			<PropertyLabel>Type:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
			<PropertyLabel>Children:</PropertyLabel>
			<PropertyValueInput readonly={true} value="a.b" />
		</PropertySection>
		<PropertySection title={"Filter"}>
			<PropertyValueInput bind:value={$filterText} placeholder="enter something"/>
			<PropertySelector options={[
				{ key: "Select One",   value: 1,   enabled: true  },
				{ key: "Select Two",   value: 2,   enabled: true  },
				{ key: "Select Three",   value: 3,   enabled: true  }
			]} />

			<PropertyButton label="search query"/>
			<PropertyButton label="reset"/>
		</PropertySection>
		<PropertySection title={"History"}>
			There will be history in the future.
		</PropertySection>
	</div>
</div>

<style>

.properties-view {
	display: flex;
	font-size: 12px;
	flex-direction: column;
	overflow: auto;
	min-width: 250px;
	max-width: 250px; /* ADJUST THIS VALUE  */
	min-height: 80px;
	height: 100%;
	background-color: #666666;
	color: white;
	box-sizing: border-box;
	border-left: 1px solid black;
}

.properties-view-inner {
	display: flex;
	flex-direction: column;
	overflow: auto;
	flex: 1 0 1px;
	padding: 10px;
	gap: 10px;
}

</style>
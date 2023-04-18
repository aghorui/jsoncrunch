<script lang="ts">
    import PropertyButton from "./PropertyButton.svelte";
import PropertySection from "./PropertySection.svelte";
    import PropertyValueInput from "./PropertyValueInput.svelte";


</script>


<div class="properties-view">
	<div class="properties-view-inner">
		<PropertySection title={"Object Properties"}>
			asdasdkasld <br />
			asdka;lskd <br />
			asdkk <br />
		</PropertySection>
		<PropertySection title={"Filter"}>
			<PropertyValueInput placeholder="enter something"/>

			<PropertyValueInput placeholder="enter something"/>

			<PropertyValueInput placeholder="enter something"/>

			<PropertyButton label="search query"/>
		</PropertySection>
		<PropertySection title={"History"}>
			asdasdkasld <br />
			asdka;lskd <br />
			asdkk <br />
		</PropertySection>
	</div>
</div>

<style>

.properties-view {
	display: flex;
	flex-direction: column;
	overflow: auto;
	min-width: 250px;
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
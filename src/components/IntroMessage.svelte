<script lang="ts">
	import AppInfo from "../lib/AppInfo";
	import { hasCookie, setCookie } from "../lib/Cookies";

	let shown: boolean = true;

	if (hasCookie("intro")) {
		shown = false;
	}

	function closeIntroMessage() {
		setCookie("intro", "1");
		shown = false;
	}
</script>

<div class="message" style:display={shown ? "flex" : "none"}>
<div class="title">Hi, Welcome to JsonTx! To visualize your own JSON, click on the "Source" tab below and paste your data.</div>
<div class="spacer"></div>
<button on:click={closeIntroMessage} class="item">Close [X]</button>
</div>


<style>
	.message {
		background-color: #6FCCA2;
		border: 1px solid #5FB08B;
		display: block;
		height: 30px;
		display: flex;
		align-items: center;
		align-content: center;
	}

	.title {
		flex-shrink: 0;
		margin-left: 5px;
		line-height: 0;
	}

	.item {
		flex-shrink: 0;
		background: none;
		border: none;
		border-radius: 0;
		height: 100%;
	}

	.item:hover {
		background-color: #FFFFFF55;
	}

	.spacer {
		width: 100%;
	}
</style>
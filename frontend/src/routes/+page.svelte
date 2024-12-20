
<script lang="ts">
	import Blog from '$lib/sections/blog.svelte';
	let { data } = $props();
	
</script>


<Blog articles={data.articles} />



<template>
	<div class='pro-container'>
		<img :src="imgSrc">
		<p>Go Pro to enjoy unlimited likes per day</p>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
			return{
			imgSrc: "../../img/verified_user.png",
		}
	}
}
</script>

<style>
.pro-container{
	padding-top: 80px;
	text-align: center;
}
.pro-logo{
	font-size: 100px;
}	
</style>
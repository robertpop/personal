<script>

	var fn3 = 2, fn6 = 0, fn = 2, sum = 0;

	while (fn < 4000000) { //see attached paper notes photo for explanation
		
		sum += fn;
		fn = 4*fn3 + fn6;
		fn6 = fn3;
		fn3 = fn;
		
	}
	
	console.log(sum);
	//return sum;

</script>
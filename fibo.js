<script>

	var fibo = function() {
		
		var fn3 = 2, fn6 = 0, fn = 2, sum = 0;
		// fn3 = F(n-3), fn6 = F(n-6), fn = Fn;

		while (fn < 4000000) { //see attached paper notes photo for explanation
			sum += fn;
			fn = 4 * fn3 + fn6;
			fn6 = fn3;
			fn3 = fn;
		}
		
		//console.log(sum);
		return sum;
	};
	//fibo();

</script>
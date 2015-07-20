<script>

var fizzBuzz = function() {

	var i, result;
	
	for (i = 1; i <= 100; i++) {
	
		result = '';
		
		if (!(i % 3)) //if 'i' divided by 3 has no remainder, that means 'i' is a multiply of 3
			result += 'Fizz';
			
		if (!(i % 5)) //if 'i' divided by 5 has no remainder, that means 'i' is a multiply of 5
			result += 'Buzz';
			
		console.log(result || i); // if the variable 'result' is empty, it's read as false so 'i' will be returned
		
	}
	
};

//fizzBuzz();

</script>
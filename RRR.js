function getFirstpart(){
	var result = '';
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	if(Math.random() > 0.5) {
		for( var i=0; i < Math.floor(Math.random()*10); i++ )
			result += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return result;
};
function getDoggy(){
	var result = '';
	if(Math.random() > 0.5) {
		result += '@';
	}
	return result;
};
function makeRandomEmail() {
	var result = '';
	return result = getDogg
};
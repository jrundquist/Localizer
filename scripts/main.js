function doOnEnter(field, e, callback){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 13){
		callback();
		return false;
	}else{
		return true;
	}
}
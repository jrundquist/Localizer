jQuery.create = function() {
    if (arguments.length == 0) return [];
    var args = arguments[0] || {}, elem = null, elements = null;
    var siblings = null;

    // In case someone passes in a null object,
    // assume that they want an empty string.
    if (args == null) args = "";
    if (args.constructor == String) {
        if (arguments.length > 1) {
            var attributes = arguments[1];
                if (attributes.constructor == String) {
                            elem = document.createTextNode(args);
                            elements = [];
                            elements.push(elem);
                            siblings =
        jQuery.create.apply(null, Array.prototype.slice.call(arguments, 1));
                            elements = elements.concat(siblings);
                            return elements;

                    } else {
                            elem = document.createElement(args);

                            // Set element attributes.
                            var attributes = arguments[1];
                            for (var attr in attributes)
                                jQuery(elem).attr(attr, attributes[attr]);

                            // Add children of this element.
                            var children = arguments[2];
                            children = jQuery.create.apply(null, children);
                            jQuery(elem).append(children);

                            // If there are more siblings, render those too.
                            if (arguments.length > 3) {
                                    siblings =
        jQuery.create.apply(null, Array.prototype.slice.call(arguments, 3));
                                    return [elem].concat(siblings);
                            }
                            return elem;
                    }
            } else return document.createTextNode(args);
      } else {
              elements = [];
              elements.push(args);
              siblings =
        jQuery.create.apply(null, (Array.prototype.slice.call(arguments, 1)));
              elements = elements.concat(siblings);
              return elements;
      }
};



function respondTo(id){
	
	var mbox_width, mbox_height, mbox_opacity, mbox_left, mbox_marginLeft;

	$('#settings-underlay').fadeIn();
	$('#settings-underlay').click(function(){
		closeRespondTo();
	});


	mbox_width = $('#message-box').css('width');
	mbox_height = $('#message-box').css('height');
	mbox_opacity = $('#message-box').css('opacity');
	mbox_left = $('#message-box').css('left');
	mbox_marginLeft = $('#message-box').css('margin-left');

	$('#message-box').load('/ajax/respond-form.html', function(){$('#message-box #question-to-answer').html(masterList[id].text);}).fadeOut('fast').css({
	    'width': "460px",
		'height': "300px",
		'left': "50%",
		'top' : "100px",
	    'marginLeft': "-230px"
	  }).fadeIn(500);
	$('#activity-box').fadeOut(500);
}

function closeRespondTo(){
	$('#settings-underlay').fadeOut();
	$('#activity-box').fadeIn(500);

	$('#message-box').fadeOut('normal',function(){$(this).css({
	    'width': '',
		'height': '',
		'left': '',
		'top': '',
	    'margin-left': ''
	  });});
}
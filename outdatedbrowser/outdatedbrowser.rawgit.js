/*!--------------------------------------------------------------------
 JAVASCRIPT "Outdated Browser"
 Version:    1.1.0 - 2014
 author:     Burocratik
 website:    http://www.burocratik.com
 * @preserve

 Modified by Song Hyo Jin (shj at xenosi.de) for use CDN
 -----------------------------------------------------------------------*/

window.__outdated_HTMLTEXT = '<h6>Your browser is out-of-date!</h6>'
+ '<p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>'
+ '<p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';

var outdatedBrowser = function(options) {

	//Variable definition (before ajax)
	var outdated = document.createElement('div');
	outdated.id = 'outdated';
	outdated.style.display = 'none';
	document.body.insertBefore(outdated, document.body.firstChild);

	// Default settings
	this.defaultOpts = {
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform'
	}

	if (options) {
		//assign css3 property to IE browser version
		if(options.lowerThan) {
			if(options.lowerThan == 'IE8' || options.lowerThan == 'borderSpacing') {
				options.lowerThan = 'borderSpacing';
			} else if(options.lowerThan == 'IE9' || options.lowerThan == 'boxShadow') {
				options.lowerThan = 'boxShadow';
			} else if(options.lowerThan == 'IE10' || options.lowerThan == 'transform' || options.lowerThan == '' || typeof options.lowerThan === "undefined") {
				options.lowerThan = 'transform';
			} else if(options.lowerThan == 'IE11' || options.lowerThan == 'borderImage') {
				options.lowerThan = 'borderImage';
			}
			this.defaultOpts.lowerThan = options.lowerThan;
		}
		//all properties
		if(options.bgColor) this.defaultOpts.bgColor = options.bgColor;
		if(options.color) this.defaultOpts.color = options.color;


		bkgColor = this.defaultOpts.bgColor;
		txtColor = this.defaultOpts.color;
		cssProp = this.defaultOpts.lowerThan;
	} else {
		bkgColor = this.defaultOpts.bgColor;
		txtColor = this.defaultOpts.color;
		cssProp = this.defaultOpts.lowerThan;
	};//end if options


	//Define opacity and fadeIn/fadeOut functions
	var done = true;

	function function_opacity(opacity_value) {
		outdated.style.opacity = opacity_value / 100;
		outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
	}

	// function function_fade_out(opacity_value) {
	//     function_opacity(opacity_value);
	//     if (opacity_value == 1) {
	//         outdated.style.display = 'none';
	//         done = true;
	//     }
	// }

	function function_fade_in(opacity_value) {
		function_opacity(opacity_value);
		if (opacity_value == 1) {
			outdated.style.display = 'block';
		}
		if (opacity_value == 100) {
			done = true;
		}
	}

	//check if element has a particular class
	// function hasClass(element, cls) {
	//     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	// }

	var supports = (function() {
		var vendors = 'Khtml Ms O Moz Webkit'.split(' '),
			len = vendors.length;

		return function(prop) {
			if ( prop in outdated.style ) return true;

			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});

			while(len--) {
				if ( vendors[len] + prop in outdated.style ) {
					return true;
				}
			}
			return false;
		};
	})();

	//if browser does not supports css3 property (transform=default), if does > exit all this
	if ( !supports(''+ cssProp +'') ) {
		if (done && outdated.style.opacity !== '1') {
			done = false;
			for (var i = 1; i <= 100; i++) {
				setTimeout((function (x) {
					return function () {
						function_fade_in(x);
					};
				})(i), i * 8);
			}
		}
	}else{
		return;
	};//end if

	var csstag = document.createElement('link');
	csstag.rel = 'stylesheet';
	csstag.href = '//cdn.rawgit.com/crucifyer/outdated-browser/develop/outdatedbrowser/outdatedbrowser.min.css';
	outdated.innerHTML = window.__outdated_HTMLTEXT;
	startStylesAndEvents();

	//events and colors
	function startStylesAndEvents(){
		var btnClose = document.getElementById("btnCloseUpdateBrowser");
		var btnUpdate = document.getElementById("btnUpdateBrowser");

		//check settings attributes
		outdated.style.backgroundColor = bkgColor;
		//way too hard to put !important on IE6
		outdated.style.color = txtColor;
		outdated.children[0].style.color = txtColor;
		outdated.children[1].style.color = txtColor;

		//check settings attributes
		btnUpdate.style.color = txtColor;
		// btnUpdate.style.borderColor = txtColor;
		if (btnUpdate.style.borderColor) btnUpdate.style.borderColor = txtColor;
		btnClose.style.color = txtColor;

		//close button
		btnClose.onmousedown = function() {
			outdated.style.display = 'none';
			return false;
		};

		//Override the update button color to match the background color
		btnUpdate.onmouseover = function() {
			this.style.color = bkgColor;
			this.style.backgroundColor = txtColor;
		};
		btnUpdate.onmouseout = function() {
			this.style.color = txtColor;
			this.style.backgroundColor = bkgColor;
		};
	}//end styles and events

////////END of outdatedBrowser function
};

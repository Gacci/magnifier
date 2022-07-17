(function() {
	/*
	 * Helper function to extend an object
	 */
	function extend(out) {
		let args = Array.prototype.slice.call(arguments);
		
		for (let i = 1 ; i < args.length; i++) {
			
			let object = args[i];
			if (!isOfType(object, 'undefined')) {
				
				for (let key in object) {
					let value = object[key];
					if ( isOfType(value, 'object') ) {
						out[key] = extend({}, value)
					}  
					else {
						out[key] = value;
					}
				}
			}
		}
		
		return out;
	}
	
	/*
	 * Build a string following the built-in type pattern of javascript toString method  
	 */
	function toStringType(type) {
		return '[object ' + type + ']';
	}
	
	/*
	 * Get the built-in type of an object
	 */
	function getType(object) {
		return Object.prototype.toString.call(object);
	}
	
	/*
	 * Test if an object is of type object, string, integer, double, etc.
	 * i.e., is(object, 'string'), is(object, 'object')
	 */
	function isOfType(object, type) {
		return getType(object).toLowerCase() === toStringType(type).toLowerCase();
	}
	


	/*
	 * Set magnifier's position to follow the mouse cursor
	 */
	function setMagnifierPosition(x, y) {
		const rect = this.lens.getBoundingClientRect();
		
		const midx = rect.width / 2;
		const midy = rect.height / 2;
		
		this.lens.style.left = x - midx + "px";
		this.lens.style.top = y - midy + "px";
	}

	/*
	 * set the image on the lens corresponding to the portion of the area 
	 * pointing on the mouse 
	 */
	function setMagnifiedImagePosition(xperc, yperc) {
			// Set the background of the magnified image horizontal
			this.lens.style.backgroundPositionX = xperc - 0 + "%";
			
			// Set the background of the magnified image vertical
			this.lens.style.backgroundPositionY = yperc - 0 + "%";
	}
	
	/*
	 * Convenient function to get an element by ID
	 */
	function get(selector) {
		return document.getElementById(selector);
	}

	/*
	 * Create magnifying lens and apply any custom styling
	 */
	function createMagnifierLens(styling) {
		this.lens = document.createElement('div');
		this.lens.classList.add("lens");
		
		this.image.parentNode.appendChild(this.lens);
		styles = extend({}, styling, {
			'background-image': 'url(' + this.image.src + ')'
		});
		
		extend(this.lens.style, styles);
	}

	let Magnifier = function(image, styling = {}) {
		let self = this;
		if ( isOfType(image, 'undefined') ) {
			throw new Error("No image found!");
		}
		
		if ( image instanceof HTMLDivElement ) {
			self.image = image;
		}
		else if ( isOfType(image, 'string') ) {
			self.image = get(image);
		}
		
		createMagnifierLens.call(this, styling);
		this.image.parentNode.addEventListener("mousemove", function (e) {	
			let rect = this.getBoundingClientRect();
			let x = e.pageX - rect.x; //this.offsetLeft;
			let y = e.pageY - rect.y //this.offsetTop;
			let imgWidth = self.image.width;
			let imgHeight = self.image.height;
			let xPerc = (x / imgWidth) * 100;
			let yPerc = (y / imgHeight) * 100;


			setMagnifiedImagePosition.call(self, xPerc, yPerc);
			setMagnifierPosition.call(self, x, y);
		});
		this.image.addEventListener("mouseenter", function(e) {
			self.lens.style.opacity = 1;
		});
		this.image.addEventListener("mouseleave", function(e) {
			self.lens.style.opacity = 0;
		});
	};
	
	
	window.Magnifier = Magnifier;
} ());
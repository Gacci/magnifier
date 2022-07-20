# magnifier
Simple lightweight vanilla JavaScript plugin that adds a magnifying glass style zoom functionality to images.


![magnifier example](https://github.com/Gacci/magnifier/blob/main/screenshots/Screenshot%202022-07-19%20212029.png)


## Basic usage

```

<!-- if absolute positioning is required wrap image in a div element; apply the absolute positioning to the parent container rather than to the image -->
<div id="zoom">
    <img id="g2d" src="https://images.unsplash.com/photo-1567705781280-0e03ffb323f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80" />
</div>

<link type="text/css" rel="stylesheet" href="css/magnifier.css">
<script type="text/javascript" src="js/magnifier.js"></script>

<script type="text/javascript">
new Magnifier('g2d', {
	'border-radius': '100%',
	'width': 160,
	'height': 160
});
</script>

```

## Options

### border-radius
set border radius on the magnifying glass (default 0). Set to 100% to make it round.

### width
set magnifying glass width (default 200px)

### height

set magnifying glass height (default 200px)

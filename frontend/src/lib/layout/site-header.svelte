<div class="navbar h-16 w-full">
	<!-- TODO: Logo einfügen !-->
	<div class="dropdown">
		
		
		<button  class="dropbtn"> Produkte<i class="fa fa-caret-down"></i> <!-- on:click={} function für knopf zum öffnen des Menüs anstatt hover-->
		</button>
		<div class="dropdown-content">
			
			<!-- <div> class="header" falls doch was -->
			
			<div class="row">
			  <div class="column">
				<h3>Portalfräsmaschinen</h3>
				<a href="/">FS 10</a>
				<a href="/">FS 15</a>
				<a href="/">FS 20</a>
				<a href="/">Hybrid - 3D</a>
				<a href="/">Vorratsmaschinen</a>
			</div>
			  <div class="column">
				<h3>Spänepressen</h3>
				<a href="/">Metalle</a>
				<a href="/">Kunststoffe</a>
				<a href="/">Styropor</a>
			  </div>
			  <div class="column">
				<h3>Styroporbearbeitung</h3>
				<a href="/">Fräswerkzeuge</a>
				<a href="/">Hohlfrässpindeln</a>
				<a href="/">Zerkleinerer</a>
				<a href="/">Pressen</a>
				<a href="/">Absaugungen</a>
				<a href="/">Rohmaterial</a>
				<a href="/">Kleber</a>
			  </div>
			  <div class="column">
				<h3>Gebrauchtmaschinen</h3>
				<a href="/">CNC-Maschinen</a>
				<a href="/">CNC-Zubehör</a>
				<a href="/">Modellbaumaschinen</a>
				<a href="/">Holzbearbeitungsmaschinen</a>
			  </div>
			</div>
		  </div>
	</div>

	<div class="dropdown">
	  <button class="dropbtn">Dienstleistungen
		<i class="fa fa-caret-down"></i>
	  </button>
	  <div class="dropdown-content">
		
		<!-- <div> class="header" falls doch was -->

		<div class="row">
		  <div class="column">
			<h3>Maschinenerhaltung</h3>
			<a href="/">Spindelservice</a>
			<a href="/">Wartungen</a>
			<a href="/">Reparaturen</a>
			<a href="/">Maschinenumzüge</a>
		  </div>
		  <div class="column">
			<h3>Maschinenvermarktung</h3>
			<a href="/">Bewertung</a>
			<a href="/">Vermittlung</a>
			<a href="/">Ankauf</a>
		  </div>
		  <div class="column">
			<h3>Maschinenmodernisierung</h3>
			<a href="/">Retrofit</a>
			<a href="/">Überholung</a>
		  </div>
		</div>
	  </div>
	</div>


	<div class="dropdown">
		<button class="dropbtn">Branchen
		  <i class="fa fa-caret-down"></i>
		</button>
		<div class="dropdown-content">
		  
		  <!-- <div> class="header" falls doch was -->
  
		  <div class="row">
			<div class="column">
			  <h3>Maschinenerhaltung</h3>
			  <a href="/">Spindelservice</a>
			  <a href="/">Wartungen</a>
			  <a href="/">Reparaturen</a>
			  <a href="/">Maschinenumzüge</a>
			</div>
			<div class="column">
			  <h3>Maschinenvermarktung</h3>
			  <a href="/">Bewertung</a>
			  <a href="/">Vermittlung</a>
			  <a href="/">Ankauf</a>
			</div>
			<div class="column">
			  <h3>Maschinenmodernisierung</h3>
			  <a href="/">Retrofit</a>
			  <a href="/">Überholung</a>
			</div>
		  </div>
		</div>
	  </div>
  </div>



<style>
	/* Navbar container */
	.navbar {
	overflow: hidden;
	background-color: #33312e;
	font-family: Arial;
	}

	/* Links inside the navbar */
	.navbar a {
	float: left;
	font-size: 16px;
	color: #f6edde;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	}

	/* The dropdown container */
	.dropdown {
	background-color: #33312E;
	color:#f6edde;
	float: left;
	overflow: hidden;
	}

	/* Dropdown button */
	.dropdown .dropbtn {
	font-size: 16px;
	border: none;
	outline: none;
	color: #f6edde;
	padding: 14px 16px;
	background-color: inherit;
	font: inherit; /* Important for vertical align on mobile phones */
	margin: 0; /* Important for vertical align on mobile phones */
	}

	/* Add a red background color to navbar links on hover */
	.navbar a:hover, .dropdown:hover .dropbtn {
	background-color: #f6edde;
	color: #33312E;
	
	}

	/* Dropdown content (hidden by default) */
	.dropdown-content {
	display: none;
	position: absolute;
	opacity: 80%;
	background-color: #f9f9f9;
	padding-left: 2%;
	padding-right: 2%;
	width: 100%;
	height: 100%;
	left: 0;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
	}

	/* Mega Menu header, if needed */
	.dropdown-content .header {
	background: #f6a312;
	padding: 16px;
	color: #f6edde;
	}

	h3 {
		font-size: large;
		font-style: italic;
		color:#F6edde;
		padding-bottom: 5%;
	}

	/* Show the dropdown menu on hover */
	.dropdown:hover .dropdown-content {
	display: block;
	}

	/* Create three equal columns that floats next to each other */
	.column {
	float: left;
	width: 25%;
	padding: 10px;
	background-color: #33312E;
	color:#f6edde;
	height: full;
	}

	/* Style links inside the columns */
	.column a {
	float: none;
	color: #F6edde;
	padding: 16px;
	text-decoration: none;
	display: block;
	text-align: left;
	}

	/* Add a background color on hover */
	.column a:hover {
	background-color: #f6edde;
	color:#33312E;
	
	}

	/* Clear floats after the columns */
	.row:after {
	content: "";
	display: table;
	clear: both;
	}
</style>
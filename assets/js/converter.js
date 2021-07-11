var vertpos = 1;
var horipos = 1;
var ranerror = false;
var i1 = 0; // main loop counter
function startconvert(gscode) {
	ranerror = false;
	i1 = 0;
	vertpos = 1;
	horipos = 1; // i love spaghetti code, idek what to say about this
	document.getElementById("mednafenoutput").value = ""
	var mainoutput = "";
	var ifpart = "";
	var i2 = 0; // not even a loop, just a mess.
	var i3 = 0; // loop counter for each code (address and value)
	var i4 = 0; // counts the amount of cheats because mednafen requires names for each cheat code
	var i5 = 0; // ill prolly need this
	var readlength = 0;
	var gsiffunc = false;
	do {
		if (gscode[i1] == "8" && gscode[i1 + 1] == "0" || gscode[i1] == "3" && gscode[i1 + 1] == "0" || gscode[i1] == "D" && gscode[i1 + 1] == "0" || gscode[i1] == "d" && gscode[i1 + 1] == "0") {
			if (gscode[i1] == "8" && gscode[i1 + 1] == "0") {
				mainoutput = mainoutput + "R A 2 L 0 00";
				readlength = 2;
			} else if (gscode[i1] == "3" && gscode[i1 + 1] == "0") {
				mainoutput = mainoutput + "R A 1 L 0 00";
				readlength = 1;
			} else if (gscode[i1] == "D" && gscode[i1 + 1] == "0" || gscode[i1] == "d" && gscode[i1 + 1] == "0") {
				ifpart = ifpart + "2 L 0x00";
				readlength = 2;
				i1 = i1 + 2;
				horipos = horipos + 2;
				ifpart = ifpart + makeacode(gscode, readlength, i4, true, false);
				i4++;
				i2 = 0;
				readlength = 0;
				gsiffunc = true;
				do {
					i1++;
				} while (gscode[i1] != "8" && gscode[i1 + 1] != "0" || gscode[i1] != "3" && gscode[i1 + 1] != "0" || gscode[i1] != "D" && gscode[i1 + 1] != "0" || gscode[i1] != "d" && gscode[i1 + 1] != "0")
				if (gscode[i1] == "8" && gscode[i1 + 1] == "0") {
					mainoutput = mainoutput + "R A 2 L 0 00";
					readlength = 2;
				} else if (gscode[i1] == "3" && gscode[i1 + 1] == "0") {
					mainoutput = mainoutput + "R A 1 L 0 00";
					readlength = 1;
				} else {
					converterror(6);
				}
				i1 = i1 + 2;
				horipos = horipos + 2;
				mainoutput = mainoutput + makeacode(gscode, readlength, i4, false, false) + ifpart;
				i4++;
				i2 = 0;
				readlength = 0;
			} else {
				converterror(1);
			}
			if (!gsiffunc) {
				i1 = i1 + 2;
				horipos = horipos + 2;
				mainoutput = mainoutput + makeacode(gscode, readlength, i4, false, true);
				i4++;
				i2 = 0;
				readlength = 0;
			}
			gsiffunc = false;
			ifpart = "";
		} else {
			i1++;
		}
	} while (i1 < gscode.length && !ranerror);
	if (!ranerror) {
		document.getElementById("mednafenoutput").value = mainoutput;
	} 
}
function makeacode(gscode, readlength, i4, gsiffunc, anotherstupidvariable) { // main output isnt main output so this code is an even bigger mess but hey i hope it works...
	var mainoutput = "";
	var i3 = 0;
	i3 = i1;
	do {
		i3++;
	} while ((i3 - i1) < 6);
	if (gscode[i3] == " ") {
		mainoutput = mainoutput + gscode.substring(i1, i3);
	} else {
		converterror(2);
	}
	horipos = horipos + 7;
	i3++;
	i1 = i3;
	if (!gsiffunc) {
		mainoutput = mainoutput + " ";
	} else {
		mainoutput = mainoutput + " == 0x";
	}
	do {
		i3++;
	} while ((i3 - i1) < 4);
	if (readlength == 2) {
		mainoutput = mainoutput + gscode.substring(i1, i3);
	} else if (readlength == 1) {
		mainoutput = mainoutput + gscode.substring(i1, i3);
	} else {
		converterror(4);
	}
	if (!gsiffunc) {
		mainoutput = mainoutput + " Converted Cheat " + i4 + "\n";
	} else {
		mainoutput = mainoutput + "\n";
	}
	if (anotherstupidvariable) {
		mainoutput = mainoutput + "\n";
	}
	i1 = i1 + 5;
	horipos = 1;
	vertpos++;
	return (mainoutput);
}
function converterror(ec) {
	var ectext = "Error while running the program in Line " + vertpos + " Column " + horipos + ". Error code: " + ec + "\n";
	if (ec == 1) {
		document.getElementById("mednafenoutput").value = ectext + "Currently supported Gameshark operations are only '80', '30' and 'D0'."
	} else if (ec == 2) {
		document.getElementById("mednafenoutput").value = ectext + "Incorrect length of memory address in gameshark code."
	} else if (ec == 3) {
		document.getElementById("mednafenoutput").value = ectext + "Incorrect length of memory value in gameshark code."
	} else if (ec == 4 || ec == 5) {
		document.getElementById("mednafenoutput").value = ectext + "This should not have happened. Please check your gameshark code. If you are sure it is correct, contact lucx40 about this error."
	} else if (ec == 6) {
		document.getElementById("mednafenoutput").value = ectext + "After a condition you can only use the operations '80' and '30'."
	}
	ranerror = true;
}
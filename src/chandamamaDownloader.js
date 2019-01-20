// Resource URL structure: http://chandamama.in/resources/telugu/1947-1949/Chandamama-1947-7.pdf
// New resource URL structure: http://chandamama.in/resources/telugu/1947/Chandamama-1947-7.pdf

let fileCount = 1;

export default function generateURL() {
	let startYear = 1947;
	let endYear = 2007;
	let baseURL = "http://chandamama.in/resources";
	let language = "telugu";
	let yearRangeStart = startYear; // For first time year range which is 1947-1949
	let yearRangeEnd = yearRangeStart % 10 === 0 ? yearRangeStart + 3 : yearRangeStart + 2; // For first time year range which is 1947-1949

	for (let i = 0; i < (endYear-startYear+1); i++) { // Loop through all the years from 1947 - 2007
		let currentYear = startYear + i;

		// this format is not used anymore
		if (currentYear - 1 === yearRangeEnd) { // If currentYear JUST exceeded previous yearRangeEnd, construct a new yearRange
			yearRangeStart = currentYear;
			yearRangeEnd =
				yearRangeStart % 10 === 0
					? yearRangeStart + 3
					: yearRangeStart === 2007 // to include 'today' in the year range if it starts with 2007
					? "today"
					: yearRangeStart + 2;
		}
		let yearRange = `${yearRangeStart}-${yearRangeEnd}`;

		for (let j = 0; j < 12; j++) { // Loop through 12 months of a particular year coming from upper Loop
			let currentMonth = j + 1;
			let fileURL = `${baseURL}/${language}/${currentYear}/Chandamama-${currentYear}-${currentMonth}.pdf`;
			console.log(fileURL);
            saveFile(fileURL, `${fileCount}-Chandamama-${currentYear}-${currentMonth}.pdf`);
            fileCount++;
		}
	}
}

function saveFile(url, filename) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = "blob";
	xhr.onload = function() {
		var a = document.createElement("a");
		a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
		a.download = filename; // Set the file name.
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
	};
	xhr.open("GET", `https://cors-anywhere.herokuapp.com/${url}`); // 
	xhr.send();
}

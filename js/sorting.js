var repetition = null;

function bubbleSort() {

	disableSortingButtons();

	unsortedArray.map(x => d3.select("#rect" + x).attr("class", "testing-black"));

	var begin = 0;
	var index = 0;

	function beginRepetition() {
		if (index > 0)
			index = 0;

		repetition = setInterval(comparation,  50);
	}

	function comparation() {
		testingColor(index, index + 1);
		if (unsortedArray[index] > unsortedArray[index + 1]) {
			swap(unsortedArray, index, index + 1);
		}

		index++;

		if (index === unsortedArray.length - 1) {
			d3.select("#rect" + unsortedArray[index]).attr("class", "");
			unsortedArray.pop();
			clearInterval(repetition);
			beginRepetition();
		}

	}
	beginRepetition();
}

function swap(array, x, y) {
	const aux = array[x];
	array[x] = array[y];
	array[y] = aux;
	changeArray(x, y);
}

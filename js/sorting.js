function swap(array, x, y) {
	const aux = array[x];
	array[x] = array[y];
	array[y] = aux;
	changeArray(x, y);
}

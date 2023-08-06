export default function updateData(data1, data2) {
	let updatedData = {};

	for (let key in data2) {
		if (
			typeof data2[key] === "object" &&
			data2[key] !== null &&
			!Array.isArray(data2[key])
		) {
			if (!data1[key]) {
				data1[key] = {};
			}
			updatedData[key] = updateData(data1[key], data2[key]); // recursively update nested objects
			Object.keys(updatedData[key]).length == 0 &&
				delete updatedData[key];
		} else if (Array.isArray(data2[key])) {
			updatedData[key] = data2[key]; // update array values directly
		} else if (data2[key] != data1[key]) {
			updatedData[key] = data2[key]; // update or add new key-value pair
		}
	}

	return updatedData;
}

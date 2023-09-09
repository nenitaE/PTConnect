
export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8d959314ecmsha889e1266705b2cp1ae4fcjsn957078b3f562',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

export const fetchExercises = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}


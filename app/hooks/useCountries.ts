const ethiopianCities = [
    "Addis Ababa",
    "Dire Dawa",
    "Mekelle",
    "Gondar",
    "Bahir Dar",
    "Arba Minch",
    "Jimma",
    "Hawassa",
    "Shashamene",
    "Dessie",
    "Jijiga",
    // Add more cities as needed
];

// Format cities into value/label pairs (adjust as needed)
const formattedCountries = ethiopianCities.map((city) => ({
    value: city,
    label: city
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    };

    return {
        getAll,
        getByValue
    };
};

export default useCountries;
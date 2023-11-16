exports.retrieve = (answer) => {
    for (const key in answer) {
        console.log(key);
        if (key.includes("db")) {
            try {
                const parsedValue = JSON.parse(answer[key]);
                return parsedValue;
            } catch (error) {
                // If parsing fails, return the original value
                return answer[key];
            }
        }
    }
};

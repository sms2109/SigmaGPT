const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (
    endpoint,
    options = {}
) => {

    const response = await fetch(
        API_URL + endpoint,
        {
            ...options,

            credentials: "include",

            headers: {
                "Content-Type":
                    "application/json",

                ...options.headers
            }
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            data.error ||
            "Something went wrong"
        );
    }

    return data;
};
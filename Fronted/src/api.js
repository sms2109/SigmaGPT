// Backend URL.
//
// During development:
const API_URL =
    "http://localhost:8080";


// ========================================
// COMMON API FUNCTION
// ========================================

export const apiFetch =
    async (
        endpoint,
        options = {}
    ) => {

        // Send request to backend.
        const response =
            await fetch(

                API_URL + endpoint,

                {

                    ...options,

                    // IMPORTANT:
                    // Allows browser to send
                    // authentication cookies.
                    credentials:
                        "include",

                    headers: {

                        "Content-Type":
                            "application/json",

                        // Keep any custom headers
                        // passed by caller.
                        ...options.headers,

                    },

                }

            );


        // Convert response to JSON.
        const data =
            await response.json();


        // If backend returned error,
        // throw it so frontend can handle it.
        if (!response.ok) {

            throw new Error(

                data.message ||
                data.error ||
                "Something went wrong"

            );

        }


        return data;

    };
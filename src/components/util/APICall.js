
const baseUrl = 'http://localhost:8383/';
export async function postInfo(data) {

    try {
        const result = await fetch(baseUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Headers": 'Content-Type',
                    "Access-Control-Allow-Credentials": 'true'
                },
                body: JSON.stringify(data)
            });
        const dataResult = await result;
        if (dataResult.status === 200) {
            return 'success'
        }

    } catch (e) {
        return "error"
    }
}
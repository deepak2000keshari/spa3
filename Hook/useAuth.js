export default async function useAuth() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/login`,{
        method:'POST',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             email:import.meta.env.VITE_APP_EMAIL,
             password:import.meta.env.VITE_APP_PASSWORD,
             key_pass:import.meta.env.VITE_APP_KEYPASS
        })
    })
    const data = await res.json();
    return data
}
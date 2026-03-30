async function user(token,page) {
    const res = await API(`api/v1/users?pagination=${page}`,'GET',
        null,
        token
    );
    return res;
}

async function therapist(token,date) {
    const res = await API(`api/v1/therapists?availability=1&outlet=1&service_at=${date}&services=1&status=1&pagination=0&panel=outlet&outlet_type=2&leave=0`,'GET',
        null,
        token
    );
    return res;
}

async function outlet(token) {
    const res = await API('api/v1/therapists?availability=1&outlet=1&service_at=22-03-2026 16:45:00&services=1&status=1&pagination=0&panel=outlet&outlet_type=2&leave=0','GET',
        null,
        token
    );
    return res;
}

async function service(token,page,therapist) {
    const res = await API(`api/v1/service-category?therapist=${therapist}&pagination=${page}&panel=outlet`,'GET',
        null,
        token
    );
    return res;
}

async function  room (token,date,duration,service_id) {
    const res = await API(`api/v1/room-bookings/outlet/1?date=${date}&panel=outlet&duration=${duration}&service_id=${service_id}`,'GET',
        null,       
        token);
        return res;
    }


async function  BookCreate(token,data) {
const res = await API(`api/v1/bookings/create`,'POST',
    data,
    token);
    return res;
}

async function API(url,method,body,token) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`,{
        method:method,
        headers: {
             'Content-Type': 'application/json',
             'Authorization' :`Bearer ${token}`
        },
        ...(method != 'GET' && {body: JSON.stringify(body)})
    })
    console.log(res);
    const data = await res.json();
    return data
}

export {user,therapist,service,room,BookCreate};
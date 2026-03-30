import { useState } from "react";
import "./Booking.css";
import Client from "../client/Client";
import { Card, CardHeader, CardContent, Grid, TextField, Button, Avatar, Select, MenuItem, FormControlLabel, Switch, Typography, Box, Modal,NativeSelect,InputLabel,FormControl, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Service from "../Services/Service";
import ServicesModal from "../ServicesModal";
import { BookCreate } from "../../../API/API";
export default function Booking({ open, onClose, currentTimeDate,currenttherapist }) {
    //   const [close, setClose] = useState(false);
    const token = import.meta.env.VITE_APP_TOKEN;
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        phone: '',
    });
    const [servicesArrayList, setServicesArrayList] = useState([]);
    const [ServiceData, setServiceData] = useState({});

    const [modelopen, setModelOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [bookingtype, setBookingType] = useState("Online");

    const [status, setStatus] = useState({
        confirmed: true,
        unconfirmed: true,
        checkedIn: true,
        completed: true,
        cancelled: false,
        noShow: false,
        holding: true,
        progress: true,
    });
    const [ServiceOpen, setServiceOpen] = useState(false);
    const d = new Date(currentTimeDate);

    const date = d.toDateString();
    const time = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    let currentDateTime = `${date.split(" ")[0]}, ${date.split(" ")[1]} ${date.split(" ")[2]}`; // Tue Aug 08 2023
    const submitHandler = () => {
        setLoading(true);
        if (servicesArrayList.length === 0) {
            console.error('No services selected');
            setLoading(false);
            return;
        } else {
            let data = [];
            const starttime = currentTimeDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
            servicesArrayList.forEach((service) => {
                let endTime;
                if (service.services.servicedata.services[0]?.duration) {
                    const duration = service.services.servicedata.services[0].duration;
                    const start = new Date(currentTimeDate);
                    const end = new Date(start.getTime() + duration * 60000);
                    endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                data.push({
                    "service": service.services.servicedata.id,
                    "start_time": starttime|| '',
                    "end_time": endTime || '',
                    "duration": service.services.servicedata.services[0]?.duration || 0,
                    "therapist": service.services.servicedata.services[0]?.therapist || 0,
                    "requested_person": 0,
                    "price": service.services.servicedata.services[0]?.price || '0.00',
                    "quantity": service.services.servicedata.services[0]?.quantity || '1',
                    "service_request": service.services.servicedata.services[0]?.service_request || '',
                    "commission": service.services.servicedata.services[0]?.commission || null,
                    "customer_name": userData.name || 'Guest',
                    "primary": 1,
                    "item_number": 1,
                    "room_segments": [{
                        "room_id": service.room.roomdata?.room_id || 0,
                        "item_type": service.room.roomdata?.item_type || 'single-bed',
                        "meta_service": service.room.roomdata?.meta_service || null,
                        "start_time": starttime|| '',
                        "end_time": endTime || '',
                        "duration": service.services.servicedata.services[0]?.duration || 0,
                        "priority": 1
                    }]
                });
            });
            if (data.length > 0) {
            setServiceData({
                        company: 1,
                        outlet: 1,
                        outlet_type: 2,
                        booking_type: 1,
                        customer: 980,
                        created_by:229061,
                        items:data,
                        currency:"SGD",
                        source:"WhatsApp",
                        payment_type:"payatstore",
                        service_at: currentTimeDate ? currentTimeDate.toISOString() : '',
                        note:"Test",
                        membership:0,
                        panel:"outlet",
                        type:"manual",
                    });
            }
        }
        // console.log('servicesArrayList before setting', servicesArrayList); //--- IGNORE ---
       
        if (setServiceData) {
            console.log('ServiceData', ServiceData); //--- IGNORE ---
             const CreateBook = async ()=> {
                    const result = await BookCreate(token, ServiceData);
                    console.log(result,'booking create response');
                    setLoading(false);
             } 
             CreateBook();
        }
        
    }
    if (!open) return null;

    return (
        <div className="filter-overlay">
            <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn cursor-pointer" onClick={onClose}>
                    ✕
                </button>
                <div className="header">
                    <h2>New Booking</h2>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>

                <div className="section">
                    <span className="label">Outlet</span>
                    <strong>Liat Towers</strong>
                </div>
                <div className="datetime">
                    <div>
                        <span className="label">On</span>
                        <strong>{currentDateTime}</strong>
                    </div>

                    <div>
                        <span className="label">At</span>
                        <strong>{time}</strong>
                    </div>
                </div>



                <Grid>
                    {userData.id ?
                        (<>
                            <Grid item xs={12} sx={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', paddingY: 3 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ bgcolor: "blue", width: 60, height: 60, marginRight: 2, position: 'relative' }}>
                                            <Typography variant="h5" color="white" fontWeight="medium">{userData.name.split(" ")[0].charAt(0).toUpperCase()}{userData.name.split(" ")[1].charAt(0).toUpperCase()}</Typography>
                                            {true && (
                                                <Box component="span" sx={{
                                                    position: 'absolute', top: -3, right: -3,
                                                    backgroundColor: '#FFA000', color: 'white', borderRadius: '50%',
                                                    width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '12px', fontWeight: 'bold'
                                                }}>
                                                    🏆
                                                </Box>
                                            )}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">{userData.phone} (#{userData.id})</Typography>
                                            <Typography variant="subtitle1" fontWeight="medium">{userData.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">Client since {userData.clientSince}</Typography>
                                        </Box>
                                    </Box>
                                    <DeleteIcon color="action" className="cursor-pointer" onClick={() => setUserData({
                                        id: '',
                                        name: '',
                                        phone: '',
                                    })} />
                                </Box>
                                <Box display="flex" justifyContent="flex-end" marginTop={1}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={'booking.membershipDiscount'}
                                                onChange={'handleMembershipChange'}
                                                name="membershipDiscount"
                                                color="warning"
                                            />
                                        }
                                        label="Apply membership discount:"
                                        labelPlacement="start"
                                        sx={{ color: '#D1914C', fontWeight: 'medium' }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                                <Button startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', color: '#616161' }} onClick={() => setServiceOpen((prev) => !prev)}>Add service</Button>
                                <Button startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', color: '#616161' }}>Add pax</Button>
                            </Grid>

                            {/* {ServiceOpen && ( */}
                                {/* <Service setUserData={setUserData} /> */}
                            {/* )} */}
                        </>) : <Client setUserData={setUserData} />}
                    {/* console.log('dd', servicesArrayList); */}
                    {console.log("servicesArrayList",servicesArrayList)}
                    {servicesArrayList.length > 0 && servicesArrayList?.map((service, index) => (
                    <Grid item xs={12} sx={{ borderBottom: '1px solid #e0e0e0', paddingY: 3 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
                            <Typography variant="h6" fontWeight="bold">{service.services.servicedata.name}</Typography>
                            <DeleteIcon color="action" className="cursor-pointer" onClick = {() => {
                                const newServicesArrayList = [...servicesArrayList];
                                newServicesArrayList.splice(index, 1);
                                setServicesArrayList(newServicesArrayList);
                            }}/>
                        </Box>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item><Typography variant="body2" color="text.secondary">With:</Typography></Grid>
                            <Grid item>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: currenttherapist?.extendedProps.gender === 'male' ? '#3B82F6' : '#EC4899', width: 24, height: 24 }}>
                                        <Typography fontSize={'10px'}>{currenttherapist?.id}</Typography>
                                    </Avatar>
                                    <Typography variant="body1">{currenttherapist?.title}</Typography>
                                </Box>
                            </Grid>
                            {/* {service.requested && ( */}
                            <Grid item>
                                <FormControlLabel
                                    control={<Switch checked={"service.requested"} name="requested" color="warning" size='small' />}
                                    label="Requested Therapist"
                                    labelPlacement="end"
                                    sx={{ margin: 0, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                                />
                            </Grid>
                            {/* )} */}
                            <Grid item><InfoIcon color="action" fontSize="small" /></Grid>
                        </Grid>
                        <Grid container spacing={3} marginTop={1}>
                            <Grid item><Typography variant="body2" color="text.secondary">For:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.services.servicedata.services[0]?.duration} min</Typography></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">At:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{currentTimeDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Typography></Grid>
                        </Grid>
                        <Grid container marginTop={1}>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Using:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.room.roomdata?.room_name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                     ))}
                    {/* Source */}
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="source-label" sx={{ color: 'rgba(0,0,0,0.6)' }}>Select Source</InputLabel>
                            <Select
                                labelId="source-label"
                                id="source"
                                value={bookingtype}
                                label="Select Source"
                                onChange={(e) => setBookingType(e.target.value)}
                            >
                                <MenuItem value={'Online'}>Online</MenuItem>
                                <MenuItem value={'Walk-in'}>Walk-in</MenuItem>
                                <MenuItem value={'Phone'}>Phone</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                 <Button sx={{width: '100%',marginTop: 2}} variant="contained" size="large" onClick={()=>submitHandler()}>{Loading ? 'Submitting...' : 'Submit'}</Button>
            </div>
            {ServiceOpen && (
               <ServicesModal currentTimeDate = {currentTimeDate} setServicesArrayList = {setServicesArrayList} setServiceOpen = {setServiceOpen}/>
            )}
        </div>
    );
}
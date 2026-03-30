import { Card, CardHeader, CardContent, Grid, TextField, Button, Avatar, Select, MenuItem, FormControlLabel, Switch, Typography, Box, Modal,NativeSelect,InputLabel,FormControl, } from '@mui/material';
import { use, useEffect,useState } from 'react';
import { therapist,service,room } from '../../API/API';

export default function ServicesModal({currentTimeDate,setServicesArrayList,setServiceOpen}) {
    const [ServicesList, setServicesList] = useState([]);
    const [RoomList, setRoomList] = useState([]);
    const [selectedService, setSelectedService] = useState({});
    const [selectedRoom, setSelectedRoom] = useState('');
    const [open,setopen] = useState(true);
    useEffect(() => {
            const services = async () => {
                const token = import.meta.env.VITE_APP_TOKEN;
                const res = await service(token, 0, 517);
                console.log(res,'service response');
                setServicesList(res?.data?.data?.list || res?.data || []);
            }
            services();
    }, []);
    useEffect(() => {
        console.log('selectedService changed:', selectedService); //--- IGNORE ---
         const rooms = async () => {
                const token = import.meta.env.VITE_APP_TOKEN;
                const d = new Date(currentTimeDate);
                const formattedDate =
                  String(d.getDate()).padStart(2, "0") +
                  "-" +
                  String(d.getMonth() + 1).padStart(2, "0") +
                  "-" +
                  d.getFullYear();
                const res = await room(token, formattedDate, selectedService.duration, selectedService.id);
                console.log(res,'room response');
                setRoomList(res?.data || res?.data || []);
            }
            rooms();
    }, [selectedService]);

    const submitHandler = () => {
        setServicesArrayList((prev) => [...prev, 
            {
                services:selectedService,
                room:selectedRoom
            }
        ]);
        setopen(false);
        setServiceOpen(false);
    }
    return (
         <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Services
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Services
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'services',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(e)=>  {
                                    const selectedOption = e.target.selectedOptions[0];
                                    const servicedata = ServicesList.category.find(service => service.id === parseInt(e.target.value));
                                    console.log(servicedata,'servicedatanmn');
                                    setSelectedService({
                                       servicedata
                                    })}}
                            >
                                  <option key={0} value={''}>
                                        please select a service
                                    </option>
                                {ServicesList?.category?.map((service) => (
                                    <option key={service.id} value={service.id} data-name = {service.name} data-duration = {service?.services[0]?.duration ?? ''}>
                                        {service.name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                         <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Room
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'room',
                                    id: 'uncontrolled-native',
                                }}
                                 onChange={(e)=>  {
                                    const selectedOption = e.target.selectedOptions[0];
                                    const roomdata = RoomList.find(room => room.room_id === parseInt(e.target.value));
                                    setSelectedRoom({
                                       roomdata
                                    })}}
                            >
                                  <option key={0} value={''}>
                                        please select a Room
                                    </option>
                                {RoomList?.map((room) => (
                                    <option key={room.room_id} value={room.room_id} data-name={room.room_name}>
                                        {room.room_name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={submitHandler} style={{ marginTop: '20px' }}>
                            Book Now
                        </Button>
                    {/* </Typography> */}
                </Box>
            </Modal>
    )
}
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, TextField, Button, Avatar, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const therapistColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4',
    '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
    '#ff9800', '#ff5722'
];

export default function BookingInterface() {
    const [booking, setBooking] = useState({
        outlet: 'Liat Towers',
        date: 'Tue, Aug 8',
        time: '09:30 PM',
        client: {
            phone: '92214868',
            id: '9221',
            name: 'Victoria Baker',
            clientSince: 'December 2023',
            isVip: true,
            avatarColor: '#D1914C', // Color of VB Avatar
        },
        services: [
            {
                name: '60 Mins Body Therapy',
                therapist: { name: 'Lily', colorId: 1 }, // Color ID for red
                requested: true,
                duration: 60,
                time: '9:30 AM',
                room: '806 Couples Room',
                requests: 'Soft, China',
            },
        ],
        membershipDiscount: true,
        source: '',
        notes: '',
    });

    const handleMembershipChange = (event) => {
        setBooking(prevBooking => ({ ...prevBooking, membershipDiscount: event.target.checked }));
    };

    return (
        <Card sx={{ maxWidth: 800, margin: '20px auto', borderRadius: 0, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardHeader
                title="New Booking"
                action={
                    <Button variant="outlined" color="primary">
                        Cancel
                    </Button>
                }
                sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}
            />
            <CardContent>
                <Grid container spacing={3}>
                    {/* Outlet/Location */}
                    <Grid item xs={12} sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: 2 }}>
                        <Typography variant="body2" color="text.secondary">Outlet</Typography>
                        <Typography variant="subtitle1" fontWeight="bold">{booking.outlet}</Typography>
                    </Grid>

                    {/* Date and Time */}
                    <Grid item xs={6} sx={{ borderRight: '1px solid #e0e0e0' }}>
                        <Typography variant="body2" color="text.secondary">On</Typography>
                        <Typography variant="h6">{booking.date}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">At</Typography>
                        <Typography variant="h6">{booking.time}</Typography>
                    </Grid>

                    {/* Client Information */}
                    <Grid item xs={12} sx={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', paddingY: 3 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <Avatar sx={{ bgcolor: booking.client.avatarColor, width: 60, height: 60, marginRight: 2, position: 'relative' }}>
                                    <Typography variant="h5" color="white" fontWeight="medium">VB</Typography>
                                    {booking.client.isVip && (
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
                                    <Typography variant="h6" fontWeight="bold">{booking.client.phone} (#{booking.client.id})</Typography>
                                    <Typography variant="subtitle1" fontWeight="medium">{booking.client.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">Client since {booking.client.clientSince}</Typography>
                                </Box>
                            </Box>
                            <DeleteIcon color="action" />
                        </Box>
                        <Box display="flex" justifyContent="flex-end" marginTop={1}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={booking.membershipDiscount}
                                        onChange={handleMembershipChange}
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

                    {/* Services */}
                    {booking.services.map((service, index) => (
                        <Grid item xs={12} key={index} sx={{ borderBottom: '1px solid #e0e0e0', paddingY: 3 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
                                <Typography variant="h6" fontWeight="bold">{service.name}</Typography>
                                <DeleteIcon color="action" />
                            </Box>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item><Typography variant="body2" color="text.secondary">With:</Typography></Grid>
                                <Grid item>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar sx={{ bgcolor: therapistColors[service.therapist.colorId], width: 24, height: 24 }}>
                                            <Typography fontSize={'10px'}>{service.therapist.colorId + 1}</Typography>
                                        </Avatar>
                                        <Typography variant="body1">{service.therapist.name}</Typography>
                                    </Box>
                                </Grid>
                                {service.requested && (
                                    <Grid item>
                                        <FormControlLabel
                                            control={<Switch checked={service.requested} name="requested" color="warning" size='small'/>}
                                            label="Requested Therapist"
                                            labelPlacement="end"
                                            sx={{ margin: 0, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                                        />
                                    </Grid>
                                )}
                                <Grid item><InfoIcon color="action" fontSize="small" /></Grid>
                            </Grid>
                            <Grid container spacing={3} marginTop={1}>
                                <Grid item><Typography variant="body2" color="text.secondary">For:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.duration} min</Typography></Grid>
                                <Grid item><Typography variant="body2" color="text.secondary">At:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.time}</Typography></Grid>
                            </Grid>
                            <Grid container marginTop={1}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">Using:</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.room}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">Select request(s)</Typography> <Typography component="span" variant="subtitle2" fontWeight="medium">{service.requests}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}

                    {/* Add Buttons */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                        <Button startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', color: '#616161' }}>Add service</Button>
                        <Button startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', color: '#616161' }}>Add pax</Button>
                    </Grid>

                    {/* Source */}
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="source-label" sx={{ color: 'rgba(0,0,0,0.6)' }}>Select Source</InputLabel>
                            <Select
                                labelId="source-label"
                                id="source"
                                value={booking.source}
                                label="Select Source"
                                // onChange={...}
                            >
                                <MenuItem value={'Online'}>Online</MenuItem>
                                <MenuItem value={'Walk-in'}>Walk-in</MenuItem>
                                <MenuItem value={'Phone'}>Phone</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Notes */}
                    <Grid item xs={12} sx={{ marginTop: 2, paddingBottom: 10 }}> {/* Adjust padding to simulate space */}
                        <TextField
                            fullWidth
                            id="notes"
                            label="Notes (Optional)"
                            variant="standard"
                            value={booking.notes}
                            multiline
                            // onChange={...}
                            InputLabelProps={{ sx: { color: 'rgba(0,0,0,0.6)' } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Booking data:', data);
          setBooking(data);
        } catch (error) {
          setError('Error fetching booking details');
          console.error('Error fetching booking:', error);
        }
      };
      fetchBooking();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details for {booking.service}</h1>
      <p>Doctor: {booking.doctor_name}</p>
      <p>Start Time: {booking.start_time}</p>
      <p>End Time: {booking.end_time}</p>
      <p>Date: {booking.date}</p>
    </div>
  );
};

export default BookingDetail;

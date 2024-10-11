"use client";  

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('http://localhost:5000/api/bookings');
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      {bookings.map((booking) => (
        <Link key={booking.id} href={`/booking/${booking.id}`}>
          A Booking on {booking.date} starting at {booking.start_time}
        </Link>
      ))}
    </div>
  );
};

export default BookingList;

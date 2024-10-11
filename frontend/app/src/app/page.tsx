
"use client"; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
    
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBookings().catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Current booking count: {bookings.length}</h1>
      <h2>Booking List:</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
           A Booking on{' '}
            <Link href={`/booking/${booking.id}`}>
              {booking.date}
            </Link>{' '}
            starting at{' '}
            <Link href={`/booking/${booking.id}`}>
              {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/create-booking">Create a New Booking</Link>
    </div>
  );
};

export default Home;

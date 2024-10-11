"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateBooking: React.FC = () => {
  const router = useRouter();
  const [doctorName, setDoctorName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { doctor_name: doctorName, service, date, start_time: startTime, end_time: endTime };

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error('Failed to create booking');
      }

      router.push('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-300 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-fade-in">Create a New Booking</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor Name:
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service:
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;

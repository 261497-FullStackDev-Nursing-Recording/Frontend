"use client";
import { useState } from 'react'
import Head from 'next/head'
import "./LoginPage.css"
import { PasswordInput,TextInput } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import axios from 'axios';

export default function Login() {
  const [username, Setusername] =useState('');
  const [password, Setpassword] =useState('');
  const [data, setData] = useState(null);

  const handleLogin = async (e:any)=> {
    e.preventDefault();
    console.log("logging in..." + username + "..." + password);

    try {
      const response = await axios.post('http://localhost:5001/auth/signin', {username: username, password: password});
      setData(response.data);
      console.log("Login successful!");
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }

  return (
    <div>
      <Head>
        <title>Nursingrecord</title>
      </Head>
        <div className='LoginText'>
            <span >NURSING</span>
            <span> RECORD</span>
        </div>
            <div onSubmit={handleLogin}>
              <div className='Container'>
                    <TextInput
                    className='Username'
                      placeholder="Username"
                      withAsterisk
                      value={username}
                      onChange={(event) => Setusername(event.currentTarget.value)}
                    />
                    <PasswordInput
                      className='Password'
                      placeholder="Password"
                      withAsterisk
                      value={password}
                      onChange={(event) => Setpassword(event.currentTarget.value)}
                      icon={<IconLock size="1rem" />}
                    />
                <button type="submit" className='LoginButton' onClick={handleLogin}>Login</button>
              </div>
            </div>
    </div>
  )
}

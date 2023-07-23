"use client";
import { useState } from 'react'
import Head from 'next/head'
import "./LoginPage.css"
import { PasswordInput,TextInput } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

export default function Login() {
  const [username, Setusername] =useState('');
  const [password, Setpassword] =useState('');

  const handleLogin =(e:any)=> {
    e.preventDefault()
    console.log("logging in..." + username + "..." + password)
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

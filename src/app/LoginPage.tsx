"use client";
import { useState } from 'react'
import Head from 'next/head'
import "./LoginPage.css"

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
                <input
                className='Username'
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => Setusername(e.target.value)}
                    placeholder='Username'
                    />
                <input
                    className='Password'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => Setpassword(e.target.value)}
                    placeholder='Password'
                />
                <button type="submit" className='LoginButton' onClick={handleLogin}>Login</button>
              </div>
            </div>
    </div>
  )
}

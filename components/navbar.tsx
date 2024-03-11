// 'use client'


import Link from 'next/link'
import React from 'react'
import AuthLink from './auth-link'
import BackLink from './back-link'

export default function Navbar() {
  return (
    <>
      <AuthLink />
      <BackLink />
    </>
  )
}

import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useRouter } from 'next/router'
import * as React from 'react'
import Button from '@mui/material/Button'
import useUser from '@/_hooks/user'

export default function CompsLayoutsNavbar() {
  const { user } = useUser()
  const { apiLogout } = useUser()
  const router = useRouter()
  const handleLogout = () => {
    apiLogout().then(() => {
      router.push('/')
    })
  }
  return (
    <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/"><a className="navbar-brand">To do List</a></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/all-lists"><a className="nav-link">Browse lists</a></Nav.Link>
            <Nav.Link as={Link} href="/private"><a className="nav-link">Private</a></Nav.Link>
            {
              !user ? (
                <>
                  <Nav.Link as={Link} href="/auth/signup"><a className="nav-link">Sign up</a></Nav.Link>
                  <Nav.Link as={Link} href="/auth/login"><a className="nav-link">Login</a></Nav.Link>
                </>
              ) : (
                <Button variant="outlined" className="nav-link" onClick={handleLogout}>Logout</Button>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

'use client'
import { Box, Typography } from '@mui/material'
import TableComponent from '../../../../components/dashboard/TableComponent'
import { useState, useEffect } from 'react'

export default function Archived() {
  const [applications, setApplications] = useState([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getUserApplications = async () => {
    try {
      const response = await fetch('/api/latestapplications/1')
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await response.json()
      console.log(data)
      setApplications(data)
    } catch (err) {
      console.error(err)
      setError('Error fetching applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserApplications()
  }, [])
  return (
    <Box sx={{}}>
      <Typography variant="h3">Archived</Typography>
      <TableComponent applications={applications} />
      <button onClick={getUserApplications}>Reload</button>
    </Box>
  )
}

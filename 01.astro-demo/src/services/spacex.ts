import { type APISpaceXRespose, type Doc } from '../types/api'

export const getLastLaunches = async () => {
  const res = await fetch('https://api.spacexdata.com/v5/launches/query', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: 'asc'
        },
        limit: 6
      }
    })
  })

  const { docs: launches } = await res.json() as APISpaceXRespose

  return launches
}
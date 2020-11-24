import React, { useState, useEffect, useMemo } from 'react'
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState('')
  const [input, setInput] = useState('')
  const [links, setLinks] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(response => response.text())
      .then(data => setLinks(JSON.parse(data)));
  }, [])

  useMemo(() => {
    fetch("http://localhost:5000")
      .then(response => response.text())
      .then(data => setLinks(JSON.parse(data)));
  }, [url])

  const pushData = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(input))
    fetch('http://localhost:5000', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST", 
      body: JSON.stringify({
        longLink: input
      }),
    })
    .then(res => res.text())
    .then(data => console.log(JSON.parse(data)))
    setInput('')
    setUrl(input)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={(e) => pushData(e)} >
            <div className="row">
              <div className="col-md-10 offset-md-0">
                <input type="text" name="link" id="" style={{width: '100%'}} value={input} onChange={(e) => setInput(e.target.value)} />
              </div>
              <div className="col-md-2 offset-md-0">
                <button type="submit" style={{width: '100%'}}>Generate</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Long Link</th>
                <th>Short Link</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {
                links && Object.keys(links[0] || {}) ? 
                  Object.values(links[0] || {}).map(link => {
                    return (
                      <tr>
                        <td><a href={link.longLink}>{link.longLink}</a></td>
                        <td><a href={`http://localhost:5000/${link.shortLink}`}>{`localhost:5000/${link.shortLink}`}</a></td>
                        <td>{link.clicks}</td>
                      </tr>
                    )
                  })
                : null
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default App

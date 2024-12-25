import express from "express"
import cors from "cors"
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';




import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { error } from "console";
config(); // Load environment variables

const supabaseUrl = 'https://gbjtqylynbmhrxietpxt.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);






const app=express();

const prisma = new PrismaClient(); 

app.use(express.json())
app.use(cors())



app.get('/api/notes', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*'); // Fetch all notes
  
      if (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
      } else {
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err });
    }
  });

  app.post('/api/notes', async (req, res) => {
    try {
      const { title, content } = req.body; // Destructure the title and content from the request body
        if(!title||!content)    return res.status(400).send('Title and content are required');
      // Insert new note into the 'notes' table
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content }]); // Insert data
  
      if (error) {
        res.status(500).json({ message: 'Error creating note', error });
      } else {
        res.status(201).json(data); // Return the newly created record
      }
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err });
    }
  });


  app.delete('/api/notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id); // Use the ID to find and delete the specific note
  
      if (error) {
        res.status(500).json({ message: 'Error deleting note', error });
      } else {
        res.status(200).json({ message: 'Note deleted successfully', data });
      }
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err });
    }
  });

  app.put('/api/notes/:id', async (req, res) => {

    const id = Number(req.params.id);
  
    if (isNaN(id) || id <= 0) {
      return res.status(400).send("Invalid id");
    }
  
    try {
      const { title, content } = req.body;
      const { data, error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', id);
  
      if (error) {
        return res.status(500).json({ message: 'Error updating note', error });
      }
  
      res.status(200).json({ message: 'Note updated successfully', data });
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error occurred', error: err });
    }
  });
  
 // app.use(express.static('dist'));


app.listen(5000,()=>{
    console.log("server running on port 5000")
})



























// const fs = require('fs');
// const pg = require('pg');
// const url = require('url');

// const config = {
//     user: "avnadmin",
//     password: "AVNS_AmK3sZUHLsMrPvQZghy",
//     host: "noted-sql-noted.b.aivencloud.com",
//     port: 20199,
//     database: "defaultdb",
//     ssl: {
//         rejectUnauthorized: true,
//         ca: `-----BEGIN CERTIFICATE-----
// MIIEQTCCAqmgAwIBAgIUESSV9IoZtg8GZnau6il9Kbu+P00wDQYJKoZIhvcNAQEM
// BQAwOjE4MDYGA1UEAwwvZjkzYzdjNDMtNTQ4My00NTI2LTkzOGUtYmExMzE2MTUw
// NDEzIFByb2plY3QgQ0EwHhcNMjQxMjI1MTMwNzIxWhcNMzQxMjIzMTMwNzIxWjA6
// MTgwNgYDVQQDDC9mOTNjN2M0My01NDgzLTQ1MjYtOTM4ZS1iYTEzMTYxNTA0MTMg
// UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALE/WCAa
// +ML+S5zQhfiM55sNrbQ4bt3dQiY4NwtW+xH1fZvtoswjwoBdNyTBDGA3ygratCXj
// +HuOr4xqSw7E8j9FLBZblArZK4tVC7FOvqb+845kdZ31j3T4YJDHZpX5Oth5NV29
// 0cRxubpod2U+HoS+5t+y9Cvg8FK1Ib/HzFdRR2Invdj9aR99eXCjFcPg3+nRwN2W
// hgr6oK0Ao10zKdFoMMNqXjnp8g1qk7KGkLzrVw+mxZ2Rqz3Kv8odCFQ2aNYgOVKl
// iyr2wohIS4dvkGDAIKCe1pgHrK7D10SeB+YM6G7QvuiXmG0rucQPio1amUgqZZmt
// 2F8M7AYdnVpqHTh70W8WNNZbdEMLMV/qpQRfysGpj9HDZmxBn+mTmxRjSR5wyfhH
// RqKIZc5l2roG/Z89pubncZIBM6RbvRWHNbfp/jn3pouGM02huet2ZTiZjzlemQcG
// x3NvmVxmshiWyTfngceO2FDA0j/LXQnbYdp3qIChmkd7d8TgWCV1hDNPTwIDAQAB
// oz8wPTAdBgNVHQ4EFgQUDl4oatfMJP67rGUX6iMOvZWt0DwwDwYDVR0TBAgwBgEB
// /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJcUv9cltZLQL5/T
// HHvPRV14ndIa1nv+rmXU7fwV3KKZIdPjkTCkFfdMW4USV4ixKDhZdPeMy9Cui0Fx
// pD+OnCS15GkvjzqCZhw10ONN2EDarWdN2aEy3crTMQcP5WJ4nLTxrwUUZTuOuPsw
// 1sS4BkbT/QGKyVGDCQclPSLNk8Y/2NSgf+yUOzbOeBSPiJzPJuyFirRmSqOqnrfd
// PWKAHFk3XjZhPzTm9CSL+ACkyGKUFMdKdIssXRXAG6HlRC008pWtGNFEvmzxXhbQ
// boylP2z/s1C70BRNmuR7jkcMKLJ+Aj4F92NP6qv2lhOX2UkRA7FqluXzbA14VfY2
// t06hN8v2dYJfGe+cTvq0L6cmMSQuCtzFvXI7MQmpNIyD7+4Zw1vL3148gpZehra3
// 4MlYHYms5+LVLZrjQfro6oePJD6Kwn4y1MRUjGXsL3h0CLfeIhNTR5V1b6nmyJYm
// 5fW+H1kB1mzvOjSASzWpncY0SZX5IAqM5dXBETNw+0VTn7UjnQ==
// -----END CERTIFICATE-----`,
//     },
// };

// const client = new pg.Client(config);
// client.connect(function (err: any) {
//     if (err)
//         throw err;
//     client.query("SELECT VERSION()", [], function (err: any, result: { rows: { version: any; }[]; }) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err: any) {
//             if (err)
//                 throw err;
//         });
//     });
// });
import express from 'express';

export const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/echo', (req, res) => res.json({ test: "I'm alive" }));

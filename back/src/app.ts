import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  // TODO: Replace by log function
  console.log(`Express is listening at http://localhost:${port}`);
});

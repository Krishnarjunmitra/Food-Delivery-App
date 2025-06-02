import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database connection
connectDB();

// api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);



app.get('/', (req, res)=>{
  res.send('API Working');
});

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});

import db from "./utils/connection.js"
import "./models/DoctorModels.js"
import "./models/PatientModels.js"
import "./models/AppointmentModels.js"
import "./models/DepartementModels.js"
import "./models/TreatmentModels.js"
import "./models/index.js"
import express from "express"
import bodyParser from "body-parser"
import router from "./routes/route.js"

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
// Sinkronisasi database
db.sync({ alter: true })
  .then(() => {
    console.log('Database berhasil disinkronisasi');
  })
  .catch((error) => {
    console.error('Gagal menyinkronkan database:', error);
  });

// Rute
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan pada server!');
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
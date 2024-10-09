import { Sequelize } from "sequelize";
import db from "../utils/connection.js"
import Patient from "./PatientModels.js"
import Doctor from "./DoctorModels.js"
import Appointment from "./AppointmentModels.js"
import Treatment from "./TreatmentModels.js"
import Departement from "./DepartementModels.js"

// Definisikan relasi antar model
Patient.hasMany(Appointment, { as: "PatientAppointments" });
Patient.hasMany(Treatment, { as: "PatientTreatments" });

Doctor.hasMany(Appointment, { as: "DoctorAppointments" });
Doctor.hasMany(Treatment, { as: "DoctorTreatments" });
Doctor.belongsTo(Departement, { foreignKey: 'id_departemen', as: 'Departement' });

Appointment.belongsTo(Patient);
Appointment.belongsTo(Doctor);

Treatment.belongsTo(Patient);
Treatment.belongsTo(Doctor);

Departement.hasMany(Doctor, { foreignKey: 'id_departemen', as: 'Doctors' });

// Sinkronisasi model dengan database
const syncDatabase = async () => {
  try {
    await db.sync({ alter: true });
    console.log('Database berhasil disinkronisasi');
  } catch (error) {
    console.error('Gagal menyinkronkan database:', error);
  }
};

syncDatabase();

// Ganti port
const PORT = process.env.PORT || 3000;
db.authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
    return db.sync();
  })
  .then(() => {
    console.log('Model berhasil disinkronkan dengan database.');
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
  })
  .catch((error) => {
    console.error('Gagal terhubung ke database:', error);
  });
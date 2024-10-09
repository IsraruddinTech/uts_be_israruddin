import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Patient from "./PatientModels.js";

const Appointment = db.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tanggal_janji: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Scheduled',
    },
    id_pasien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id_pasien",
      },
    },
    id_dokter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "appointment",
    timestamps: true,
  }
);

// Relasi Appointment dengan Patient
Appointment.belongsTo(Patient, {
  foreignKey: "id_pasien",
  as: "Patient",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Patient.hasMany(Appointment, {
  foreignKey: "id_pasien",
  as: "Appointments",
});

// Fungsi untuk mengatur relasi dengan Doctor
// export const setupAppointmentDoctorAssociation = (Doctor) => {
//   Appointment.belongsTo(Doctor, {
//     foreignKey: "id_dokter",
//     as: "Doctor",
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   });

//   Doctor.hasMany(Appointment, {
//     foreignKey: "id_dokter",
//     as: "Appointments",
//   });
// };

export default Appointment;

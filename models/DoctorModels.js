import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Departement from "./DepartementModels.js";
import Appointment from "./AppointmentModels.js";
import Treatment from "./TreatmentModels.js";

const Doctor = db.define(
  "Doctor",
  {
    id_dokter: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spesialisasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_departemen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departement,
        key: "id_departemen",
      },
    },
  },
  {
    tableName: "doctor",
    timestamps: true,
  }
);

// Relasi Doctor dengan Departement
// Doctor.belongsTo(Departement, {
//   foreignKey: "id_departemen",
//   as: "Departement",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// Relasi Doctor dengan Appointment dan Treatment
// Doctor.hasMany(Appointment, {
//   foreignKey: "id_dokter",
//   as: "Appointments",
// });

// Doctor.hasMany(Treatment, {
//   foreignKey: "id_dokter",
//   as: "Treatments",
// });

export default Doctor;

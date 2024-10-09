import Patient from "../models/PatientModels.js";
import Appointment from "../models/AppointmentModels.js";
import Treatment from "../models/TreatmentModels.js";

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            // include: [
            //     { model: Appointment, as: "Appointments" },
            //     { model: Treatment, as: "Treatments" }
            // ]
        });
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error dalam getAllPatients:", error);
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil semua data pasien" });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id, {
            include: [
                {
                    model: Appointment,
                    as: "Appointments",
                },
                {
                    model: Treatment,
                    as: "Treatments",
                },
            ],
        });
        if (!patient) {
            return res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error("Error dalam getPatientById:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pasien", error: error.message });
    }
};

export const createPatient = async (req, res) => {
    try {
        const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon } = req.body;
        const patient = await Patient.create({ 
            nama, 
            tanggal_lahir, 
            jenis_kelamin, 
            alamat, 
            nomor_telepon 
        });
        res.status(201).json({ message: "Data pasien berhasil dibuat", data: patient });
    } catch (error) {
        console.error("Error dalam createPatient:", error);
        res.status(500).json({ error: error.message, message: "Gagal membuat data pasien baru" });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon } = req.body;
        const [updated] = await Patient.update(
            { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon }, 
            { where: { id } }
        );
        if (updated === 0) {
            return res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
        const updatedPatient = await Patient.findByPk(id);
        res.status(200).json({ message: "Data pasien berhasil diperbarui", data: updatedPatient });
    } catch (error) {
        console.error("Error dalam updatePatient:", error);
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data pasien" });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Patient.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
        res.status(200).json({ message: `Data pasien dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        console.error("Error dalam deletePatient:", error);
        res.status(500).json({ error: error.message, message: "Gagal menghapus data pasien" });
    }
};


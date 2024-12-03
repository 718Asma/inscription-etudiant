const Inscription = require('../models/inscription');
const Student = require('../models/student');
const University = require('../models/university');

exports.getAllInscriptions = async () => {
    try {
        const inscriptions = await Inscription.find()
            .populate('student', 'firstName lastName')
            .populate('university', 'name');

        const statePriority = {
            pending: 0,
            approved: 1,
            rejected: 1,
            archived: 2,
        };

        inscriptions.sort((a, b) => {
            const stateComparison = statePriority[a.state] - statePriority[b.state];
            if (stateComparison !== 0) {
                return stateComparison;
            }
            return new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
        });

        return inscriptions;
    } catch (error) {
        throw new Error(`Failed to retrieve inscriptions: ${error.message}`);
    }
};

exports.getInscription = async (id) => {
    try {
        const inscription = await Inscription.findById(id)
        .populate('student', 'firstName lastName')
        .populate('university', 'name');
        return inscription;
    } catch (error) {
        throw new Error(`Failed to retrieve inscription: ${error.message}`);
    }
};


exports.submitRequest = async (inscription) => {
    try {
        const studentExists = await Student.findById(inscription.student);
        if (!studentExists) {
            throw new Error(`Student with ID ${inscription.student} does not exist`);
        }

        const universityExists = await University.findById(inscription.university);
        if (!universityExists) {
            throw new Error(`University with ID ${inscription.university} does not exist`);
        }

        const newInscription = new Inscription(inscription);
        await newInscription.save();
        return newInscription;
    } catch (error) {
        throw new Error(`Failed to submit inscription: ${error.message}`);
    }
};

exports.validateRequest = async (id) => {
    try {
        const inscription = await Inscription.findById(id);
        if (!inscription) {
            throw new Error(`Inscription with ID ${id} does not exist`);
        }

        if (inscription.state === 'approved') {
            throw new Error('This inscription is already approved');
        } else if (inscription.state === 'rejected') {
            throw new Error('Cannot approve an inscription that has been rejected');
        }

        inscription.state = 'approved';
        await inscription.save();

        return inscription;
    } catch (error) {
        throw new Error(`Failed to validate inscription: ${error.message}`);
    }
};

exports.rejectRequest = async (id) => {
    try {
        const inscription = await Inscription.findById(id);
        if (!inscription) {
            throw new Error(`Inscription with ID ${id} does not exist`);
        }

        if (inscription.state === 'rejected') {
            throw new Error('This inscription is already rejected');
        } else if (inscription.state === 'approved') {
            throw new Error('Cannot reject an inscription that has been approved');
        }

        inscription.state = 'rejected';
        await inscription.save();

        return inscription;
    } catch (error) {
        throw new Error(`Failed to reject inscription: ${error.message}`);
    }
};

exports.archiveRequest = async (id) => {
    try {
        const inscription = await Inscription.findById(id);
        if (!inscription) {
            throw new Error(`Inscription with ID ${id} does not exist`);
        }

        if (inscription.state === 'archived') {
            throw new Error('This inscription is already archived');
        }

        inscription.state = 'archived';
        await inscription.save();

        return inscription;
    } catch (error) {
        throw new Error(`Failed to archive inscription: ${error.message}`);
    }
};

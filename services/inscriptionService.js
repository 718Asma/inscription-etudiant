const Inscription = require('../models/inscription');

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
        .populate('student', 'firstName lastName');
        return inscription;
    } catch (error) {
        throw new Error(`Failed to retrieve inscription: ${error.message}`);
    }
};

exports.submitRequest = async (inscription) => {
    try {
        const newInscription = new Inscription(inscription);
        await newInscription.save();
        return newInscription;
    } catch (error) {
        throw new Error(`Failed to submit inscription: ${error.message}`);
    }
};

exports.validateRequest = async (id) => {
    try {
        const inscription = await Inscription.findByIdAndUpdate(id, { state: 'approved' }, { new: true });
        return inscription;
    } catch (error) {
        throw new Error(`Failed to validate inscription: ${error.message}`);
    }
};

exports.rejectRequest = async (id) => {
    try {
        const inscription = await Inscription.findByIdAndUpdate(id, { state: 'rejected' }, { new: true });
        return inscription;
    } catch (error) {
        throw new Error(`Failed to reject inscription: ${error.message}`);
    }
};

exports.archiveRequest = async (id) => {
    try {
        const inscription = await Inscription.findByIdAndUpdate(id, { state: 'archived' }, { new: true });
        return inscription;
    } catch (error) {
        throw new Error(`Failed to archive inscription: ${error.message}`);
    }
};
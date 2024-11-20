exports.getAllInscriptions = (req, res) => {
    res.send("Liste des Inscriptions");
};

exports.submitRequest = (req, res) => {
    if (req.body.niveau) {
        res.send(`Inscription:\t${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.getInscription = (req, res) => {
    console.log(req.params.id);
    res.send(`Inscription ID: ${req.params.id}`);
};

exports.validateRequest = (req, res) => {
    console.log(req.params.id);
    res.send(`Validation Inscription ID: ${req.params.id}`);
}

exports.rejectRequest = (req, res) => {
    console.log(req.params.id);
    res.send(`Rejet Inscription ID: ${req.params.id}`);
}
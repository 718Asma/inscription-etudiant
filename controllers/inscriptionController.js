exports.submitRequest = (req, res) => {
    if (req.body.niveau) {
        res.send(`Inscription:\t${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.getRequestStatus = (req, res) => {
    console.log(req.params.id);
    res.send(`Inscription ID: ${req.params.id}`);
};
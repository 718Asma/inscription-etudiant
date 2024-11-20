exports.getAllProfiles = (req, res) => {
    // Fictional array of profiles to test with
    const profiles = [
        {
            studentId: "S1001",
            studentName: "John Doe",
            inscriptionDate: "2024-01-15",
            course: "Computer Science"
        },
        {
            studentId: "S1002",
            studentName: "Jane Smith",
            inscriptionDate: "2023-11-22",
            course: "Software Engineering"
        },
        {
            studentId: "S1003",
            studentName: "Alice Johnson",
            inscriptionDate: "2024-02-10",
            course: "Information Systems"
        },
        {
            studentId: "S1004",
            studentName: "Bob Brown",
            inscriptionDate: "2023-09-18",
            course: "Cybersecurity"
        }
    ];

    // Render the dashboard and pass the profiles data to the view
    res.render("pages/dashboard", { profiles: profiles });
};

exports.getProfile = (req, res) => {
    console.log(req.params.id);
    res.send(`User ID: ${req.params.id}`);
};

exports.updateProfile = (req, res) => {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
        res.send(`Modifier Profile ID: ${req.params.id}\n${JSON.stringify(req.body)}`);
    } else {
        res.status(400).json({ message: "Attributs Manquants." });
    }
};

exports.deleteProfile = (req, res) => {
    console.log(req.params.id);
    res.send(`Supprimer Profile ID: ${req.params.id}`);
};

const db = require('../config/database');

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database insertion failed.' });
        }
        res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
    });
};


exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        
        const haversineDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = (deg) => deg * (Math.PI / 180);
            const R = 6371; // Earth's radius in kilometers
        
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
        
            const a = Math.sin(dLat / 2) ** 2 +
                      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                      Math.sin(dLon / 2) ** 2;
        
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const schoolsWithDistance = results.map((school) => {
            const distance = haversineDistance(
                parseFloat(latitude), parseFloat(longitude),
                parseFloat(school.latitude), parseFloat(school.longitude)
            );
            const roundedDistance = Math.round(distance)
            return { ...school, distance: roundedDistance };
        });
        
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
};
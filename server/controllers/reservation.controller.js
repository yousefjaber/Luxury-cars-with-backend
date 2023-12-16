const Reservation = require('../models/reservation.model');

const postReservation = async (req,res) => {
    try {
        // Validate input data (carId, startDate, endDate)
        const { carId, startDate, endDate } = req.body;
    
        // Check if the selected dates are available for the given car
        const isDatesAvailable = await Reservation.findOne({
          carId,
          $or: [
            { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
            { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
          ],
        });
    
        if (isDatesAvailable) {
          return res.status(400).json({ error: 'Selected dates are not available for reservation' });
        }
    
        // Create a reservation record
        const newReservation = new Reservation({
          carId,
          startDate,
          endDate,
          userId: req.user.id, // Assuming you have user authentication in place
        });
    
        await newReservation.save();
    
        return res.status(201).json({ message: 'Reservation successful' });
      } catch (error) {
        console.error('Error making reservation:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };

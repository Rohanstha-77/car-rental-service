import bookingModel from "../models/booking";
import { carModel } from "../models/car";
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await bookingModel.find({
        car,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
    });
    return bookings.length === 0;
};
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;
        const cars = await carModel.find({ location, isAvailable: true });
        const availabilityCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, new Date(pickupDate), new Date(returnDate));
            return {
                ...car.toObject(),
                isAvailable,
            };
        });
        const availableCars = await Promise.all(availabilityCarPromises);
        res.json({ success: true, availableCars });
    }
    catch (error) {
        console.error("Error in checkAvailabilityOfCar:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export const createBooking = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { car, pickupDate, returnDate } = req.body;
        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            res.json({ sucess: false, message: "car is not avilable" });
            return;
        }
        const carData = await carModel.findById(car);
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned.getTime() - picked.getTime()) / (1000 * 60 * 60 * 24));
        if (!carData || typeof carData.pricePerDay !== 'number') {
            throw new Error("Invalid car data or missing pricePerDay");
        }
        const price = carData?.pricePerDay * noOfDays;
        await bookingModel.create({ car, owner: carData?.owner, user: userId, pickupDate, returnDate, price });
        res.json({ sucess: true, message: "Booking creted" });
    }
    catch (error) {
        console.log("error while creating booking", error);
        res.json({ sucess: false, message: error });
    }
};
//# sourceMappingURL=booking.controller.js.map
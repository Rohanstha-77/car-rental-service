import { Request, Response } from "express";
import { Types } from "mongoose";
import bookingModel from "../models/booking";
import { carModel } from "../models/car";
import { IUser } from "../types";


const checkAvailability = async (
    car: Types.ObjectId,
    pickupDate: Date,
    returnDate: Date
): Promise<boolean> => {
    const bookings = await bookingModel.find({
        car,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
    });

    return bookings.length === 0;
};

export const checkAvailabilityOfCar = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        const cars = await carModel.find({ location, isAvailable: true });

        const availabilityCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(
                car._id as Types.ObjectId,
                new Date(pickupDate),
                new Date(returnDate)
            );

            return {
                ...car.toObject(),
                isAvailable,
            };
        });

        const availableCars = await Promise.all(availabilityCarPromises);

        res.json({ success: true, availableCars });
    } catch (error) {
        console.error("Error in checkAvailabilityOfCar:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const { car, pickupDate, returnDate } = req.body

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)

        if (!isAvailable) {
            res.json({ sucess: false, message: "car is not avilable" })
            return
        }

        const carData = await carModel.findById(car)

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        const noOfDays = Math.ceil((returned.getTime() - picked.getTime()) / (1000 * 60 * 60 * 24))
        if (!carData || typeof carData.pricePerDay !== 'number') {
            throw new Error("Invalid car data or missing pricePerDay");
        }

        const price = carData?.pricePerDay * noOfDays

        await bookingModel.create({ car, owner: carData?.owner, user: userId, pickupDate, returnDate, price })

        res.json({ sucess: true, message: "Booking creted" })
    } catch (error) {
        console.log("error while creating booking", error)
        res.json({ sucess: false, message: error })
    }
}

export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const bookings = await bookingModel.find({ user: userId }).populate("Cars Detail").sort({ createdAt: -1 })

        res.json({ sucess: true, bookings })
    } catch (error) {
        console.log("error in getuserbooking", error)
        res.json({ sucess: false, message: error })
    }
}


export const getOwnerBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const role = req.user as IUser
        if (role?.role !== "owner") {
            res.json({ sucess: false, message: "unauthorized" })
            return
        }

        const booking = await bookingModel.find({ owner: req.user?._id }).populate("cars Details user").select("-user.password").sort({ createdAt: -1 })

        res.json({ sucess: true, booking })
    } catch (error) {
        console.log("error in getuserbooking", error)
        res.json({ sucess: false, message: error })
    }
}


export const changeBookingStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const { bookingId, status } = req.body

        const booking = await bookingModel.findById(bookingId)

        if (!booking) {
            res.status(404).json({ success: false, message: "Booking not found" });
            return;
        }

        if (booking?.owner.toString() !== userId) {
            res.json({ sucess: false, message: "unauthorized" })
            return
        }

        booking.status = status
        await booking?.save()

        res.json({ sucess: true, booking })
    } catch (error) {
        console.log("error in getuserbooking", error)
        res.json({ sucess: false, message: error })
    }
}


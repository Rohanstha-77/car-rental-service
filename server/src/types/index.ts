import { Types,Document } from "mongoose"

export interface user extends Document {
    username: string,
    email: string,
    password: string,
    role: string,
    image: string
}

export interface CarTypes extends Document {
    owner: Types.ObjectId,
    brand: string,
    Model: string,
    image: string,
    year: Number,
    category: string,
    seating_capacity: Number,
    fuel_type: string,
    transmission: string,
    pricePerDay: Number,
    location: string,
    description: string,
    isAvailable: Boolean,
    isDeleted: Boolean
}
export interface IUser {
  _id: string;
  role: string;
}

export interface Booking extends Document{
    car: Types.ObjectId,
    user: Types.ObjectId,
    owner: Types.ObjectId,
    pickupDate: Date,
    returnDate: Date,
    status: string,
    price: Number
}
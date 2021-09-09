import CatModel from '../models/cats.js'
import axios from 'axios';

async function createCat(args) {
    try {
        const { name, file, address, coordinates, breed, category, city } = args.cat
        const imgurRes = await axios({
            method: "POST",
            url: "https://api.imgur.com/3/image",
            headers: { 'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}` },
            data: {
                image: file,
            }
        })
        const cat = new CatModel({
            name,
            city,
            breed,
            category,
            url: imgurRes.data.data.link,
            coordinates: { longitude: coordinates.longitude, latitude: coordinates.latitude },
            createdAt: Date.now()
        })
        const date = new Date();
        const { name, file, address } = args.cat
        const cat = new CatModel({ name, url: file, coordinates: { longitude: address, latitude: address }, createdAt: date })

        const newCat = await cat.save()
        return newCat
    } catch (error) {
        throw error;
    }
}

async function getCats(args) {
<<<<<<< HEAD
    try {
        const catsList = await CatModel.find().sort({ field: 'desc', createdAt: -1 })
        if (args) {
            catsList.limit(args)
=======
    try{
        if (args.limit) {
            const catsList = await CatModel.find().sort({field: 'desc', createdAt: -1}).limit(args.limit)
>>>>>>> 95785f6fb8693b2d63858d3863d9d675f88f3797
            return catsList;
        } else {
            const catsList = await CatModel.find().sort({field: 'desc', createdAt: -1})
            return catsList
        }
    } catch (error) {
        throw error;
    }
}

async function addToFavorites(args) {
    try{
        const { id } = args.fav
        const beforeUpdateCat = await CatModel.findOne({_id: id})

        const favoriteUpdate = !beforeUpdateCat.isFavorite
        const body = { isFavorite: favoriteUpdate };
        
        return CatModel.findOneAndUpdate({_id: id}, body);
    } catch (error) {
        throw error;
    }
}



export { createCat, getCats, addToFavorites };